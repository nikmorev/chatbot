import { demo as devConfig } from './demo'
import { Steps } from '../types'

const prodConfig = {
    wrapInWebComponent: '[[ wrapInWebComponent ]]',
    demo: '[[ demo ]]',
    privacyPolicyURL: '[[ privacyPolicyURL ]]',
    answersMutationSettings: '[[ answersMutationSettings ]]',
    settings: '[[ settings ]]',
    referal: '[[ referal ]]',
    publicUrl: '[[ publicUrl ]]',
    scenario: '[[ scenario ]]'
}

export interface IConfig {
    wrapInWebComponent: boolean ,
    demo: boolean,
    privacyPolicyURL: string,
    answersMutationSettings: IAnswersMutationSettings,
    settings: ISettings,
    referal: string,
    publicUrl: string,
    locale?: string,
    scenario?: Steps
}

interface ISettings {
    consultant?: {
        name: string,
        avatar?: string,
        position?: string
    },
    positioning: {
        x: number,
        y: number
    },
    autoOpenDelay?: number,
    autoAppearingDelay?: number,
    hideAfterClose: boolean,
    themeColor: string
}

export interface IAnswersMutationSettings {
    url: string,
    headers?: {[key: string]: string}[],
    isAjax?: boolean,
    inNewTab?: boolean,
    isGql: boolean,
    gqlScheme: string,
}

export function getConfigToUse<T>(realConfig: T, demoConfig: T): T {
    const realConfigValues = Object.values(realConfig)
    for (const value of realConfigValues) {
        if (/\[\[.+\]\]/.test(value)) {
            console.warn(`USING CHAT BOT IN DEMO MODE`)
            return demoConfig
        }
    }

    return realConfig
}

export default getConfigToUse(prodConfig as unknown as IConfig, devConfig)
