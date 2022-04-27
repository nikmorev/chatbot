import React, { useState, useEffect, FormEvent } from 'react'
import styled, { keyframes } from 'styled-components'
import { Input } from './Input'
import { Button } from './Button'
import { Select } from './Select'
import { AssistantTyping } from './AssistantTyping'
import { getMessageTime, normalizedRem } from '../helpers'
import { SubmitHandler, StepInput, StepSelect, StepButton, RenderMessage } from '../types'


export function AssistantsMessage(props: AssistantsMessageProps): JSX.Element {

    const {
        messages,
        input,
        buttons,
        select,
        allowedInteractivity,
        disabled,
        shouldCenter,
        scrollIntoView,
        submit
    } = props

    const [alsoShowInput, setAlsoShowInput] = useState(false)

    // callbacks
    const onFormSubmit = (e: FormEvent) => e.preventDefault()
    const submitInput = (name: string, nextStep: number) => (value: string) => {
        submit?.({name, value, label: value, nextStep})
    }

    const submitSelect = (name: string, nextStep: number) => (value: string, label: string) => {
        submit?.({name, label, value, nextStep})
    }

    const submitButton = (name: string, nextStep: number) => (value: string, label: string) => {
        submit?.({name, label, value, nextStep})
    }

    const shouldShowSelect = (messageIndex: number) => (
        allowedInteractivity &&
        select &&
        (messageIndex === messages.length - 1)
    )

    const shouldShowInput = (messageIndex: number) => (
        allowedInteractivity &&
        ((input && !select) || (input && select && alsoShowInput)) &&
        (messageIndex === messages.length - 1)
    )

    useEffect(() => {
        if (alsoShowInput) scrollIntoView?.()
    }, [alsoShowInput])

    const isAssistantTyping = messages.length > 0 && messages.some(message => !message.isShown)

    return (
        <Wrapper>
            {messages.filter(message => message.isShown).map((message, index) => (
                <MessageWrapper key={message.text}>
                    <MessageRoot>
                        <MessageText key={message.text}>{message.text}</MessageText>
                        {shouldShowSelect(index) && (
                            <Select
                                submit={submitSelect(select!.name, select!.nextStep)}
                                disabled={disabled}
                                revealInput={setAlsoShowInput}
                                inputRevealed={alsoShowInput}
                                options={select!.options}
                                {...select}
                            />
                        )}
                        {shouldShowInput(index) && (
                            <Input
                                submit={submitInput(input!.name, input!.nextStep)}
                                disabled={disabled}
                                {...input}
                            />
                        )}
                    </MessageRoot>
                    <MessageDateWrapper>
                        <Time>{getMessageTime()}</Time>
                    </MessageDateWrapper>
                </MessageWrapper>
            ))}
            {!isAssistantTyping && allowedInteractivity && buttons?.length! > 0 && (
                <Buttons onSubmit={onFormSubmit} center={shouldCenter}>
                    {buttons?.map(button => (
                        <Button
                            key={button.label}
                            type={'submit'}
                            onClick={submitButton(button.name, button.nextStep).bind(null, button.value!, button.label)}
                            disabled={disabled}
                            {...button}
                        >
                            {button.label}
                        </Button>
                    ))}
                </Buttons>
            )}
            {isAssistantTyping && (<>
                <span className="IH">{`Assistant is typing...`}</span>
                <AssistantTyping/>
            </>)}
        </Wrapper>
    )
}


interface AssistantsMessageProps {//extends StepStructure {
    submit?: SubmitHandler,
    input?: StepInput,
    buttons?: StepButton[],
    select?: StepSelect,
    messages: RenderMessage[]
    shouldCenter?: boolean,

    scrollIntoView?: () => void
    allowedInteractivity: boolean,
    disabled?: boolean,
}

const Wrapper = styled.div`
    all: revert !important;
    display: grid !important;
    grid-gap: ${normalizedRem(1)} !important;
`

const bubble = keyframes`
    0% {
        transform: scale(0);
    }
    
    90% {
        transform: scale(1.1);
    }
    
    100% {
        transform: scale(1);
    }
`

const MessageWrapper = styled.div`
    all: revert !important;
    text-align: left !important;
    animation: ${bubble} ease-in-out .3s !important;
    transform-origin: bottom left !important;
`

const MessageRoot = styled.div`
    all: revert !important;
    max-width: 100% !important;
    border-radius: 16px 16px 16px 0 !important;
    background: linear-gradient(90deg, rgba(255 255 255 / 87%), rgba(255 255 255 / 87%)), var(--theme-color,var(--base-color)) !important;

    color: #000;
    padding: ${normalizedRem(.75)} ${normalizedRem(1)} !important;
    width: fit-content !important;
    margin-left: 0 !important;
`

const MessageDateWrapper = styled.p`
    all: revert !important;
    color: #848EA0 !important;
    font-size: ${normalizedRem(.75)} !important;
    margin: 0 !important;
    text-align: left !important;
    margin-top: ${normalizedRem(.5)} !important;
    display: inline-block !important;
`

const Time = styled.time`
    all: revert !important;
`

const MessageText = styled.p`
    all: revert !important;
    margin: 0 !important;
    & ~ * {
        margin-top: ${normalizedRem(1)} !important;
    }
`

const Buttons = styled.form<{center?: boolean}>`
    all: revert !important;
    padding: 0 !important;
    display: flex !important;
    flex-wrap: wrap !important;
    margin: -.5em !important;
    height: fit-content !important;
    
    justify-content: ${({center}) => center ? 'center' : 'initial'} !important;
    
    & > * {
        margin: .5em !important;
    }
`