import { demo as devConfig } from './demoConfig'

const prodConfig = {
    wrapInWebComponent: '[[ wrapInWebComponent ]]',
    demo: '[[ demo ]]',
    privacyPolicyURL: '[[ privacyPolicyURL ]]',
    formActionURLs: '[[ formActionURLs ]]',
    custom: '[[ custom ]]',
    component: '[[ component ]]',
    projectId: '[[ projectId ]]',
    requestId: '[[ requestId ]]',
    referal: '[[ referal ]]',
    publicUrl: '[[ publicUrl ]]',
    scenario: '[[ scenario ]]'
} as IConfig

export interface IConfig {
    wrapInWebComponent: boolean | string,
    demo: boolean | string,
    privacyPolicyURL: string,
    formActionURLs: string,
    custom: any,
    component: string,
    projectId: number | string,
    requestId: number | string,
    referal: string,
    publicUrl: string
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

export default getConfigToUse(prodConfig, devConfig)
