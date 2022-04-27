import React, { useState, useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { ChatTriggerIcon , CrossIcon } from './components/Icons'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Step } from './components/Step'
import {
    normalizeMessages,
    parseStepValue,
    shouldRenderChat,
    shouldSkipAutoOpening,
    hideForSessionAfterClose,
    skipAutoOpeningAfterClose,
    basicFontSizeInRem,
    normalizedRem,
    getConfigToUse
} from './helpers'
import { RenderStepStructure, StepType, SubmitHandler } from './types'
import config, { demo as demoConfig } from './config'
import defaultScenario from './scenario'

export function Chatbot(): JSX.Element | null {

    const {
        demo,
        privacyPolicyURL,
        formActionURLs,
        custom,
        component,
        projectId,
        requestId,
        referal,
        publicUrl
    } = getConfigToUse(config, demoConfig)

    // const submitUrl = formActionURLs?.short
    const avatarSrc = custom?.elements?.avatar?.src || `${publicUrl}/assets/img/widgets/chatbot-default-${projectId}.jpg`
    const assistantName = custom?.elements?.name?.text || `Kate`
    const assistantPosition = custom?.elements?.description?.text || `Studybay personal assistant`
    const delay = custom?.timings?.delay?.value
    const hideAfterClose = custom?.timings?.hideAfterClose?.enabled
    const skipAfterClose = custom?.timings?.skipAfterClose?.enabled
    const xOffset = custom?.elements?.container?.axis?.x ?? 97

    const themeColor = custom?.elements?.container?.backgroundColor || 'red'

    const scenario = useMemo(() => {
        let data = custom?.scenario
        if (!data) {
            console.error('No scenario found!')
            return defaultScenario // for dev purpose
        }

        if (typeof data === 'string' ) return JSON.parse(data)
        return data
    }, [custom?.scenario])

    // states
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isChatInitialized, setIsChatInitialized] = useState(false)
    const [steps, setSteps] = useState<RenderStepStructure[]>([])
    const [selectedValues, setSelectedValues] = useState<{[key: string]: string | number}>({})
    const [stepsFullfiled, setStepsFullfiled] = useState(false)
    const [forcedToClose, setForcedToClose] = useState(false)
    const [sendingForm, setSendingForm] = useState(false)

    // refs
    const chatRef = useRef<HTMLDivElement>(null)
    const stepRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // calbacks
    const initChatIfNecessary = () => {
        if (!isChatInitialized) setIsChatInitialized(true)
        if (timerRef.current) clearTimeout(timerRef.current)
    }

    const closeChatbot = () => {
        setIsChatOpen(false)
        if (steps.slice(-1)[0].step === -1) {
            setForcedToClose(true)
            skipAutoOpeningAfterClose(true)
        }
    }
    const openChatbot = () => setIsChatOpen(true)

    const clickTrigger = () => {
        if (isChatOpen) {
            // closing chat
            closeChatbot()
            hideForSessionAfterClose(hideAfterClose)
            skipAutoOpeningAfterClose(skipAfterClose)
        } else {
            openChatbot()
            console.log('Stat: count_open')
        }

        initChatIfNecessary()
        chatRef.current?.focus()
    }

    const setMessageShown = (stepNumber: number, messageNumber: number) => {
        const updatedSteps = [...steps]
        const updatedStep = { ...updatedSteps[stepNumber], isShown: true }
        updatedStep.messages = [... updatedStep.messages].map(( message , index ) => ({
            ... message,
            isShown: index <= messageNumber
        }))
        updatedSteps[stepNumber] = updatedStep

        setSteps(updatedSteps)
    }

    const submit = (currentStepIndex: number, stepType: StepType, isLast?: boolean): SubmitHandler => (params) => {
        const { name, value, label, nextStep: nextStepNumber } = params

        // save selected value to params for fetch request,
        if (name && value) {
            setSelectedValues(values => ({
                ...values,
                [name]: parseStepValue(value, stepType, projectId as number)
            }))
        }

        if (isLast) return setStepsFullfiled(true)

        // print selected value (label) as clients message (selectedValue)
        // finish current step, add new step from scenario
        const updatedSteps = [...steps]

        updatedSteps[currentStepIndex] = {
            ... updatedSteps[currentStepIndex] ,
            selectedValue: label
        }

        const nextStep = scenario.steps.find((step: any) => step.step === nextStepNumber)
        if (nextStep) {
            updatedSteps.push({
                ...nextStep,
                messages: normalizeMessages(nextStep.messages),
                selectedValue: undefined,
                isShown: false
            })
        }

        setSteps(updatedSteps)

        // handle ab tests
        if (nextStepNumber === 1) console.log('Stat: count_begin_click')
        if (nextStepNumber === 2) console.log('Stat: count_title_filled')
        if (nextStepNumber === 7) console.log('Stat: count_email_filled')
    }

    const scrollToTop = () => {
        // const scrollHeight = chatRef.current.scrollHeight
        // chatRef.current.scroll({ top: scrollHeight, behavior: 'smooth'})
        if (demo) {
            console.log('scroll')
            const stepElement = stepRef.current!
            chatRef.current?.scrollTo({left: 0, top: stepElement?.offsetTop + stepElement?.offsetHeight / 2, behavior: 'smooth'})
            return
        }
        stepRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

    const getLastStepMessages = () => {
        const lastStep = steps.slice(-1)[0]
        const messages = lastStep?.messages || []
        return messages.filter(message => message.isShown).length
    }

    const initSteps = () => {
        setSteps([{
            ...scenario.steps[0],
            messages: normalizeMessages(scenario.steps[0].messages),
            isShown: false,
            selectedValue: undefined
        }])
    }

    const resetAll = () => {
        setSendingForm(false)
        setIsChatOpen(false)
        setIsChatInitialized(false)
        setStepsFullfiled(false)
        initSteps()
    }

    // effects
    useEffect(initSteps, [])

    useEffect(() => {
        if (!isChatInitialized || !steps.length) return
        scrollToTop()
        const lastStepNumber = steps.length - 1
        const lastStep = steps[lastStepNumber]
        const messageNotShown = lastStep.messages.findIndex(message => !message.isShown)
        if (messageNotShown < 0) return

        setTimeout(() => setMessageShown(lastStepNumber, messageNotShown), 1500)
    }, [steps, isChatInitialized])

    useEffect(() => {
        if (!stepsFullfiled || sendingForm || demo) return

        console.log('Selected:', selectedValues)
        setSendingForm(true)

        const formData = new FormData()
        Object.keys(selectedValues).forEach(key => formData.append(key, selectedValues[key] as string))

        // fetch(submitUrl, {
        //     method: 'post',
        //     body: formData,
        //     //headers: { "Content-Type": "multipart/form-data" }
        // }).catch(err => {
        //     setSendingForm(false)
        //     console.error(err)
        // })
        console.log('send form')

        resetAll()
    }, [stepsFullfiled])

    useEffect(() => {
        if (isChatInitialized) return
        if (!delay || shouldSkipAutoOpening()) return

        timerRef.current = setTimeout(() => {
            setIsChatOpen(true)
            setIsChatInitialized(true)
        }, delay * 1000)
    }, [delay])

    const lastMessages = getLastStepMessages()

    if (!shouldRenderChat() || sendingForm || forcedToClose || (!scenario)) return null

    return (
        <Container
            className={'edu-chatbot'}
            themeColor={themeColor}
            xOffset={xOffset}
            visible={isChatOpen}
            fontSize={basicFontSizeInRem}
        >
            {isChatInitialized && (
                <ChatContainer
                    id='studybay-chatbot'
                    aria-live="polite"
                    ref={chatRef}
                    visible={isChatOpen}
                    tabIndex={-1}
                    openLeft={xOffset >= 50}
                >
                    <Header
                        assistantName={assistantName}
                        assistantPosition={assistantPosition}
                        avatarSrc={avatarSrc}
                        close={closeChatbot}
                    />
                    <Main>
                        {steps?.length > 0 && steps.map((step, index) => (
                            <div
                                ref={index === steps.length - 1 ? stepRef : undefined}
                                key={`${index}.${step.step}`}
                            >
                                <Step
                                    submit={submit(index, step.stepType, step.isLast)}
                                    selectedValue={step.selectedValue}
                                    scrollIntoView={scrollToTop}
                                    {...step}
                                />
                            </div>
                        ))}

                    </Main>
                    <Footer privacyLink={privacyPolicyURL}/>
                </ChatContainer>
            )}
            <Trigger
                aria-expanded={isChatOpen}
                aria-controls='studybay-chatbot'
                onClick={clickTrigger}
                stickRight={xOffset >= 50}
            >
                <ChatTriggerIcon/>
                {
                    isChatOpen ?
                        <CrossIcon/> :
                        <Avatar width={64} height={64} src={avatarSrc} alt=''/>
                }
                {lastMessages > 0 && !isChatOpen && (
                    <Unread>
                        <span className="IH">Unread messages</span>
                        {lastMessages}
                    </Unread>
                )}

                <span className='IH'>{isChatOpen ? 'close' : 'open'} chat</span>
            </Trigger>
        </Container>
    )
}

const Container = styled.article<{themeColor?: string, xOffset: number, visible: boolean, fontSize?: number}>` 

    all: revert !important;
    
    font-size: ${normalizedRem(1)} !important;
    line-height: normal!important;
    
    --theme-color: ${({themeColor}) => themeColor ?? '#00C471'};
    --base-color: #00C471;
    --base-radius: 16px;
    
    position: fixed !important;
    right: ${({xOffset}) => xOffset >= 50 ? `${100 - xOffset}%` : 'initial'} !important;
    left: ${({xOffset}) => xOffset < 50 ? `${xOffset}%` : 'initial'} !important;
    width: 100% !important;
    height: 100% !important;
    max-height: min(${normalizedRem(32)}, ${window.innerHeight}px - ${normalizedRem(8)}) !important;
    max-width: ${normalizedRem(20)} !important;
    bottom: 2em !important;
    
    @media (max-width: ${normalizedRem(35)}) {
        max-height: 100% !important;
        max-width: 100% !important;
        
        ${({visible}) => visible && css`
            right: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
        `}
        
    }
    
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        backface-visibility: hidden;
    }
    
    font-variant-ligatures: common-ligatures !important;
    text-rendering: optimizeLegibility !important;
    
    --font-family:
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          sans-serif,
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol";
    
    font-family: var(--font-family) !important;
    
    img {
        display: block;
        height: auto;
    }
    
    button,
    input,
    textarea {
        font-family: inherit;
    }
    
    input,
    textarea {
        font-size: inherit;
    }
    
    img,
    canvas,
    iframe,
    video,
    svg,
    select,
    textarea {
        max-width: 100%;
    }
    
    [hidden] {
        display: none  !important;
    }
    
    .IH {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
`

const ChatContainer = styled.div<{visible: boolean, openLeft: boolean}>`
    all: revert !important;
    position: absolute !important;
    z-index: 100 !important;
    bottom: ${normalizedRem(5.5)} !important;
    ${({openLeft}) => openLeft
        ? css`right: ${normalizedRem(4)} !important;`
        : css`left: ${normalizedRem(4)} !important;`
    }
    
    width: 100% !important;
    height: 100% !important;
    max-height: ${normalizedRem(40)} !important;
    max-width: ${normalizedRem(20)} !important;
    opacity: 0 !important;
    border-radius: var(--base-radius) !important;
    overflow: auto !important;
    scrollbar-width: 0 !important;
    pointer-events: none !important;
    background-color: white !important;
  
    display: flex !important;
    flex-direction: column !important;
    
    scrollbar-width: none !important;
    
    &::-webkit-scrollbar {
        display: none !important;
    }
    
    &::-webkit-scrollbar {
        display: none !important;
    }
   
    transition: opacity .5s !important;
    box-shadow: 0 0 8px 2px rgb(0 0 0 / 8%) !important;
    
    ${({visible}) => visible && css`
        opacity: 1 !important;
        pointer-events: initial !important;
        transition: opacity .3s !important;
    `}
    
    @media (max-width: ${normalizedRem(35)}) {
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        max-width: 100% !important;
        max-height: 100% !important;
        box-shadow: none !important;
        border-radius: 0 !important;
    }
`

const Trigger = styled.button<{stickRight: boolean}>`
    all: revert !important;
    position: absolute !important;
    bottom: 0 !important;
    ${({stickRight}) => stickRight 
        ? css`right: 0 !important;` 
        : css`left: 0 !important;`
};
    width: ${normalizedRem(4)} !important;
    height: ${normalizedRem(4)} !important;
    border-radius: 50% !important;
    border: none !important;
    background-color: var(--theme-color, var(--base-color)) !important;
    margin: 0 !important;
    z-index: 99 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 0 4px 4px rgba(0 0 0 / 5%) !important;
    cursor: pointer !important;
    outline: none !important;
    transition: background-color .3s !important;
    
    &:hover {
        background: linear-gradient(90deg, rgba(0 0 0 / 15%), rgba(0 0 0 / 15%)), var(--theme-color,var(--base-color)) !important;
        transition: background-color 0s !important;
    }
    
    &:focus-visible {
        box-shadow: 0 0 4px 4px rgba(0, 196, 113, .3) !important;
    }
    
    & > svg:first-child {
        all: revert !important;
        width: 100% !important;
        position: absolute !important;
        top: 0 !important;
        transform: rotate(180deg) !important;
        transition: transform .2s !important;
    }
    
    &[aria-expanded="true"] > svg:first-child {
        bottom: initial !important;
        bottom: 0 !important;
        left: 0 !important;
        top: initial !important;
        transform: rotate(0deg) !important;
    }
`

const Avatar = styled.img`
    all: revert !important;
    object-fit: cover !important;
    max-width: ${normalizedRem(4)} !important;
    max-height: calc(${normalizedRem(4)} - 8px) !important;
    width: 100% !important;
    height: calc(${normalizedRem(4)} - 8px) !important;
    border-radius: 50% !important;
`

const Unread = styled.span`
    all: revert !important;
    position: absolute !important;
    top: ${normalizedRem(.25)} !important;
    right: ${normalizedRem(.25)} !important;
    z-index: 10 !important;
    background-color: var(--theme-color, var(--base-color)) !important;
    width: ${normalizedRem(1)} !important;
    height: ${normalizedRem(1)} !important;
    text-align: center !important;
    font-size: ${normalizedRem(.7)} !important;
    line-height: ${normalizedRem(1)} !important;
    padding: 0 !important;
    color: #fff !important;
    border-radius: 50% !important;
`

const Main = styled.div`
    all: revert !important;
    padding: ${normalizedRem(1.25)} ${normalizedRem(1.25)} 0 !important;
    font-size: ${normalizedRem(.875)} !important;
    display: flex !important;
    flex-direction: column !important;
    flex-grow: 1 !important;
    
    & > * {
        margin-bottom: ${normalizedRem(1.5)} !important;
    }
`

