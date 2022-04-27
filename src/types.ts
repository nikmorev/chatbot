export interface Steps {
    "lastStep": number
    "steps": StepStructure[]
}

export interface StepStructure {
    "step": number,
    "messages": string[],
    "resultPattern"?: string,
    "considerPlural"?: boolean,
    "stepType": StepType,
    "buttons"?: StepButton[],
    "input"?: StepInput,
    "select"?: StepSelect,
    "isLast"?: boolean

    "keepAfter"?: boolean,
    "shouldCenter"?: boolean
}

export type StepType =
    'buttons' |
    'select' |
    'input' |
    'submit' |
    'message' |
    'deadlineRelative' |
    'deadlineRelativeTs'

export interface StepButton {
    "name": string,
    "label": string,
    "value"?: string
    "nextStep": number,
}

export interface StepInput {
    "name": string,
    "type": string,
    "placeholder"?: string,
    "required"?: boolean,
    "defaultValue"?: string | number,
    "min"?: number,
    "max"?: number,
    "minLength"?: number,
    "maxLength"?: number,
    "pattern"?: string,
    "invalidMessage"?: string,
    "nextStep": number
}

export interface StepOption {
    "value": number | string,
    "label": string,
    "showInput"?: boolean
}

export interface StepSelect {
    "name": string,
    "options": StepOption[],
    "placeholder"?: string,
    "selected"?: string | number,
    "required"?: boolean,
    "nextStep": number
}

export interface SubmitHandlerParams {
    name: string,
    label: string,
    value: string,
    nextStep: number,
    stepType?: StepType
}

export type SubmitHandler = (params: SubmitHandlerParams) => void

export type RenderMessage = { isShown: boolean, text: string}

export interface RenderStepStructure extends Omit<StepStructure , 'messages'> {
    messages: RenderMessage[],
    isShown: boolean,
    selectedValue: string | undefined
}