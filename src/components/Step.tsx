import React from 'react'
import { AssistantsMessage } from './AssistantsMessage'
import { ClientsMessage } from './ClientsMessage'
import { StepStructure, SubmitHandler } from "../types";


export function Step(props: StepProps): JSX.Element {

    const {
        selectedValue,
        submit,
        scrollIntoView,
        ...rest
    } = props

    return (<>
        <AssistantsMessage
            allowedInteractivity={!selectedValue}
            submit={submit}
            scrollIntoView={scrollIntoView}
            {...rest}
        />
        {selectedValue && (
            <ClientsMessage message={selectedValue}/>
        )}

    </>)
}


interface StepProps extends Omit<StepStructure , 'messages'> {
    selectedValue?: string,
    messages: {isShown: boolean, text: string}[],
    scrollIntoView?: () => void,
    submit: SubmitHandler,
}