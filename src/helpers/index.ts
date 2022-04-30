import { StepType } from '../types'
import { IAnswersMutationSettings } from '../config'

export const getMessageTime = (): string => (new Date()).toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
} as Intl.DateTimeFormatOptions)

export const normalizeMessage = (message: string) => ({ isShown: false, text: message})
export const normalizeMessages = (messages: string[]) => messages.map(message => ({ isShown: false, text: message}))

export function parseStepValue(value: string | number, stepType: StepType): string | number {
    // deadline comes in hours starting from now
    if (stepType === 'deadlineRelative' || stepType === 'deadlineRelativeTs') {
        const deadlineInMs = (new Date((+Date.now()) + (value as number) * (60 * 60 * 1000))).getTime()

        return parseDate(deadlineInMs , 'us')
    }

    return value
}

export function parseDate(timestampInMs: number, locale?: 'us' | 'br' | 'ru'): string {
    const deadlineObject = new Date(timestampInMs)
    const decoratePeriod = (value: number, type: 'year' | 'month' | 'day') => {
        if (type === 'day') return value < 10 ? `0${value}` : `${value}`
        if (type === 'month') return (value + 1) < 10 ? `0${value + 1}` : `${value + 1}`
        return `${value}`
    }
    
    const day = decoratePeriod(deadlineObject.getDate(), 'day')
    const month = decoratePeriod(deadlineObject.getMonth(), 'month')
    const year = decoratePeriod(deadlineObject.getFullYear(), 'year')
    
    if (locale === 'us') return `${month}-${day}-${year}`
    return `${day}-${month}-${year}`
}

export const storeName = 'eduWidget:chat'

const checkSessionStorage = (): boolean => {
    try {
        window.sessionStorage
    } catch (err) {
        console.warn(err)
        return false
    }

    return true
}
export const getSessionStore = () => {
    if (!checkSessionStorage()) return null
    return JSON.parse(sessionStorage.getItem(storeName)!)
}

export const shouldRenderChat = (demo?: any) => {
    const sessionStore = !demo && getSessionStore()
    return !sessionStore?.hide
}

export const shouldSkipAutoOpening = (demo?: any) => {
    return !demo && getSessionStore()?.skipAutoOpening
}

export const hideForSessionAfterClose = (hideAfterClose?: boolean) => {

    if (!hideAfterClose) return
    if (!checkSessionStorage()) return null

    const sessionStore = getSessionStore()

    sessionStorage?.setItem(
        storeName,
        JSON.stringify({
            ...sessionStore,
            hide: true,
        })
    )
}

export const skipAutoOpeningAfterClose = (skipAfterClose?: boolean) => {

    if (!skipAfterClose) return
    if (!checkSessionStorage()) return null

    const sessionStore = getSessionStore()

    sessionStorage?.setItem(
        storeName,
        JSON.stringify({
            ...sessionStore,
            skipAutoOpening: true,
        })
    )
}

export function getDefaultFontSize() {
    const html = document.querySelector('html')

    const fontSizeMatch = window
        .getComputedStyle(html!)
        .getPropertyValue('font-size')
        .match(/\d+/)

    if (!fontSizeMatch || fontSizeMatch.length < 1) return null

    const result = Number(fontSizeMatch[0])
    return !isNaN(result) ? result : null
}

export const basicFontSizeInRem = +((16 / getDefaultFontSize()!) || 1).toFixed(2)

export function normalizedRem(coeff=1): string {
    return `${(basicFontSizeInRem * coeff).toFixed(3)}rem`
}

export async function mutateResults(data: {[key: string]: any }, submitParams: IAnswersMutationSettings) {
    const {
        isAjax,
        inNewTab,
        isGql,
        gqlScheme,
        url,
        headers
    } = submitParams

    if (isGql) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mutation: gqlScheme,
                variables: data
            })
        }).catch(console.error)
    }

    if (isAjax) {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key] as string))

        return fetch(url, {
            method: 'post',
            body: formData,
            headers: headers as unknown as HeadersInit
        }).catch(console.error)
    }

    const form = document.createElement('form')
    Object.keys(data).forEach(key => {
        const input = document.createElement('input')
        input.name = key
        input.value = data[key]
        form.append(input)
    })
    const submit = document.createElement('button')
    form.append(submit)
    form.action = url
    form.method = 'post'
    if (inNewTab) form.target = '_blank'

    form.hidden = true
    document.body.append(form)
    submit.click()
}