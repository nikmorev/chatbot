import React , { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { normalizedRem } from '../helpers'


export function Button(props: ButtonProps): JSX.Element {

    const { children, ...rest } = props

    return (
        <Root {...rest}>
            {children}
        </Root>
    )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}


const Root = styled.button`
    all: revert !important;
    padding: ${normalizedRem(.5)} ${normalizedRem(.75)} !important;
    border-radius: ${normalizedRem(1)} !important;
    font-size: ${normalizedRem(.875)} !important;
    font-weight: bold !important;
    line-height: 1 !important;
    margin: 0 !important;
    border: 1px solid var(--theme-color, var(--base-color)) !important;
    background-color: var(--theme-color, var(--base-color)) !important;
    color: #fff !important;
    cursor: pointer !important;
    transition: background .3s !important;
    
    &:hover,
    &:focus {
        color: var(--theme-color, var(--base-color)) !important;
        background-color: #fff !important;
        transition: background 0s !important;
    }
`
