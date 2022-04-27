import React, { useState, useRef, useEffect, ChangeEvent, FormEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { SendIcon, ArrowPeak } from './Icons'
import { StepOption } from '../types'
import { normalizedRem } from '../helpers'


export function Select(props: SelectProps): JSX.Element {
    const {
        submit,
        disabled,
        options,
        revealInput,
        inputRevealed,
        ...rest
    } = props

    const [value, setValue] = useState<string>('')

    const selectRef = useRef<HTMLSelectElement>(null)

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value
        const selectedOption = options.find(option => option.value === newValue)

        if (!selectedOption) return console.error(`Option not found ${newValue}`)
        if (selectedOption.showInput) revealInput?.(true)
        else if (inputRevealed) revealInput?.(false)
        setValue(newValue)
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const selectedOption = options.find(option => option.value === value)
        if (!selectedOption) return console.error(`Option not found ${value}`)
        submit(value, selectedOption.label)
    }

    useEffect(() => {
        setValue(selectRef.current!.value)
    }, [])

    return (
        <Wrapper onSubmit={onSubmit}>
            <RootWrapper>
                <SelectRoot
                    disabled={disabled}
                    value={value}
                    onChange={change}
                    ref={selectRef}
                    {...rest}
                >
                    {options.map(opt => (
                        <option value={opt.value} key={opt.value}>{opt.label}</option>
                    ))}
                </SelectRoot>
                <ArrowPeak/>
            </RootWrapper>
            <Submit
                hidden={inputRevealed}
                type={'submit'}
                disabled={disabled}
            >
                <span className="IH">Submit</span>
                <SendIcon/>
            </Submit>
        </Wrapper>
    )
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    submit: (value: string, label: string) => void,
    options: StepOption[],
    revealInput?: (reveal: boolean) => void
    inputRevealed?: boolean
}

const Wrapper = styled.form`  
    all: revert !important;
    display: block !important;
    display: flex !important;
    align-items: center !important;
`

const RootWrapper = styled.div`
    all: revert !important;
    position: relative !important;
    flex-grow: 1 !important;
    
    & svg {
        all: revert !important;
        position: absolute !important;
        top: 50% !important;
        right: .75em !important;
        transform: translateY(-50%) rotate(180deg) !important;
        max-width: 10px !important;
        pointer-events: none !important;
    }
    
    & svg path {
        fill: var(--theme-color, var(--base-color)) !important;
    }
`

const SelectRoot = styled.select`
    all: revert !important;
    border-radius: 16px !important;
    border: 1px solid transparent !important;
    width: 100% !important;
    margin: 0 !important;
    padding: .75em 2em .75em 1em !important;
    text-overflow: ellipsis !important;
    font-size: ${normalizedRem(1)} !important;
    outline: none !important;
    background-color: #fff !important;
    appearance: none !important;
    
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
    margin-left: ${normalizedRem(1)} !important;
    background-color: transparent !important;
    cursor: pointer !important;
    transition: transform .3s !important;
    outline: none !important;
    
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