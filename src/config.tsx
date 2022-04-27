export { demo } from './demoConfig'

export default {
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