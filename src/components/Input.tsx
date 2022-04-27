import React , { useRef, FormEvent, InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { SendIcon } from './Icons'
import { normalizedRem } from '../helpers'


export function Input(props: InputProps): JSX.Element {
    const {
        submit,
        disabled,
        ...rest
    } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        submit(inputRef.current!.value)
    }

    return (
        <Wrapper onSubmit={onSubmit}>
            <InputRoot
                ref={inputRef}
                disabled={disabled}
                {...rest}
            />
            <Submit
                type={'submit'}
                disabled={disabled}
            >
                <span className="IH">Submit</span>
                <SendIcon/>
            </Submit>
        </Wrapper>
    )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    submit: (value: string) => void
}

const Wrapper = styled.form`  
    all: revert !important;
    display: block !important;
    display: flex !important;
    align-items: center !important;
`

const InputRoot = styled.input`
    all: revert !important;
    flex-grow: 1 !important;
    border-radius: 16px !important;
    border: 1px solid transparent !important;
    margin: 0 !important;
    padding: .75em 1em !important;
    font-size: ${normalizedRem(1)};
    outline: none !important;
    background-color: #fff !important;
    
    ${({type}) => type === 'number' && css`
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
        }

         -moz-appearance: textfield !important;
    `}
    
    &:disabled {
        background-color: #fff !important;
        cursor: not-allowed !important;
    }
    
    &:focus {
        border-color: var(--theme-color, var(--base-color)) !important;
    }
`

const Submit = styled.button`
    all: revert !important;
    flex-shrink: 0 !important;
    line-height: 1 !important;
    border: none !important;
    padding: 0 !important;
    font-size: ${normalizedRem(1)} !important;
    margin-left: ${normalizedRem(1)} !important;
    background-color: transparent !important;
    cursor: pointer !important;
    transition: transform .3s !important;
    
    &:hover,
    &:focus-visible {
        transform: scale(1.1) !important;
        transition: transform 0s !important;
    }
    
    &:disabled {
        cursor: not-allowed !important;
        display: none !important;
    }
    
    & svg path {
        fill: var(--theme-color, var(--base-color)) !important;
    }
`