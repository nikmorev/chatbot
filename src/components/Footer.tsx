import React from 'react'
import styled from 'styled-components'
import { normalizedRem } from '../helpers'


export function Footer(props: FooterProps): JSX.Element {
    return (
        <Wrapper>
            <By>{`by Morev`}</By>
            <Description>
                {`By clicking the button, you are accepting`}
                <Link href={props.privacyLink} target={'_blank'}>{`the Terms of Privacy Policy`}</Link>
            </Description>

        </Wrapper>
    )
}

const Wrapper = styled.footer`
    all: revert !important;
    position: sticky !important;
    bottom: 0 !important;
    padding: ${normalizedRem(.5)} ${normalizedRem(1.25)} ${normalizedRem(1.5)} !important; 
    font-size: ${normalizedRem(.75)} !important;
    background-color: #fff !important;
    z-index: 1 !important;
`

const By = styled.p`
    all: revert !important;
    margin: 0 !important;
    text-align: right !important;
    color: #C6CDDD !important;
    padding: .5em 0 !important;
    border-bottom: 1px solid #F4F6FB !important;
`

const Description = styled.p`
    all: revert !important;
    margin: ${normalizedRem(1)} 0 0 !important;
    display: grid !important;
    grid-gap: .5em !important;
    place-items: center !important;
    color: #848EA0 !important;
    text-align: center !important;
`

const Link = styled.a`
    all: revert !important;
    color: #000 !important;
    font-weight: bold !important;
    text-decoration: underline !important;
    text-decoration-color: var(--theme-color, var(--base-color)) !important;
    text-underline-offset: 2px !important;
    text-decoration-thickness: 2px !important;
`

interface FooterProps {
    privacyLink: string
}