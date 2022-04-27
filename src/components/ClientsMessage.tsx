import React from 'react'
import styled , { keyframes } from 'styled-components'
import { ReadChecks } from './Icons'
import { getMessageTime, normalizedRem } from '../helpers'


export function ClientsMessage(props: ClientsMessageProps): JSX.Element {

    return (
        <Wrapper>
            <MessageWrapper>
                <MessageRoot>
                    <MessageText>{props.message}</MessageText>
                </MessageRoot>
                <MessageDateWrapper>
                    <ReadChecks/>
                    {' '}
                    <Time>{getMessageTime()}</Time>
                </MessageDateWrapper>
            </MessageWrapper>
        </Wrapper>
    )
}


interface ClientsMessageProps {
    message: string
}

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

const Wrapper = styled.div`
    all: revert !important;
    display: grid !important;
    grid-gap: ${normalizedRem(1)} !important;
    animation: ${bubble} ease-in-out .3s !important;
    transform-origin: bottom right !important;
`

const MessageWrapper = styled.div`
    all: revert !important;
    text-align: right !important;
`

const MessageRoot = styled.div`
    all: revert !important;
    max-width: 100% !important;
    border-radius: 16px 16px 0 16px !important;
    background: #F4F6FB !important;
    color: #000;
    padding: ${normalizedRem(.75)} ${normalizedRem(1)} !important;
    width: fit-content !important;
    margin-left: auto !important;
`

const MessageDateWrapper = styled.p`
    all: revert !important;
    color: #848EA0 !important;
    font-size: ${normalizedRem(.75)} !important;
    margin: 0 !important;
    text-align: right !important;
    margin-top: ${normalizedRem(.5)} !important;
    display: inline-block !important;
    
    & svg path {
        fill: var(--theme-color, var(--base-color)) !important;
    }
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