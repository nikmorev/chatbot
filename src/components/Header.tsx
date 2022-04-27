import React from 'react'
import styled from 'styled-components'
import { ArrowPeak } from './Icons'
import { normalizedRem } from '../helpers'


export function Header(props: HeaderProps): JSX.Element {

    const {
        assistantName,
        assistantPosition,
        avatarSrc
    } = props

    return (
        <Wrapper>
            <AvatarWrapper>
                <Avatar
                    width={48}
                    height={48}
                    aria-hidden={true}
                    src={avatarSrc}
                    alt=''
                />
            </AvatarWrapper>
            <AssistantInfo>
                <Name>{assistantName}</Name>
                <Position>{assistantPosition}</Position>
            </AssistantInfo>
            <CloseButton onClick={props.close}>
                <ArrowPeak/>
                <span className="IH">close chat</span>
            </CloseButton>
        </Wrapper>
    )
}


interface HeaderProps {
    close: () => void
    assistantName: string,
    assistantPosition: string,
    avatarSrc: string
}

const Wrapper = styled.div`
    all: revert !important;
    position: sticky !important;
    z-index: 1 !important;
    top: 0 !important;
    background-color: var(--theme-color, var(--base-color)) !important;
    border-radius: var(--base-radius) var(--base-radius) 0 0 !important;
    padding: ${normalizedRem(1)} ${normalizedRem(1.5)} !important;
    color: #fff !important;
    display: flex !important;
   
    @media (max-width: ${normalizedRem(35)}) {
        border-radius: 0 !important;
        padding: ${normalizedRem(1)} !important;
    }
`

const AvatarWrapper = styled.div`
    all: revert !important;
    position: relative !important;
    max-width: ${normalizedRem(3)} !important;
    max-height: ${normalizedRem(3)} !important;
    width: 100% !important;
    height: 100% !important;
    border-radius: 50% !important;
    background-color: #fff !important;
    margin-right: ${normalizedRem(1)} !important;
    
    &::before {
        position: absolute !important;
        top: 2px !important;
        right: 2px !important;
        content: "" !important;
        display: block !important;
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        background-color: #fff !important;
        border: 2px solid var(--theme-color, var(--base-color)) !important;
        z-index: 1 !important;
    }
`

const Avatar = styled.img`
    all: revert !important;
    object-fit: cover !important;
    max-width: ${normalizedRem(3)} !important;
    max-height: ${normalizedRem(3)} !important;
    width: 100% !important;
    height: ${normalizedRem(3)} !important;
    border-radius: 50% !important;
`

const AssistantInfo = styled.p`
    all: revert !important;
    margin: 0 !important;
    display: grid !important;
    color: #fff !important;
    line-height: 1.25 !important;
`

const Name = styled.span`
    all: revert;
    font-weight: bold;
    font-size: ${normalizedRem(1.25)};
    line-height: 1.25;
`

const Position = styled.span`
    all: revert;
    font-size: ${normalizedRem(.875)};
    line-height: 1.25;
`

const CloseButton = styled.button`
    all: revert !important;
    border-radius: 6px !important;
    border: none !important;
    padding: 2px !important;
    width: 20px !important;
    height: 20px !important;
    margin: 0 !important;
    position: absolute !important;
    top: ${normalizedRem(1)} !important;
    right: ${normalizedRem(1)} !important;
    background-color: transparent !important;
    cursor: pointer !important;
    line-height: 0 !important;
    outline: none !important;
    cursor: pointer !important;
    
    &:focus {
        background: linear-gradient(90deg, rgba(0 0 0 / 10%), rgba(0 0 0 / 10%)), var(--theme-color, var(--base-color)) !important;
    }
    & svg {
        all: revert !important;
        width: 100% !important;
        height: 100% !important;
    }
    & svg path {
        fill: #fff !important;
    }
    
    @media (min-width: ${normalizedRem(35)}) {
        display: none !important;
    }
`