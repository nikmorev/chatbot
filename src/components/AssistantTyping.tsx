import React from 'react'
import styled, { keyframes } from 'styled-components'
import { normalizedRem } from '../helpers'


export function AssistantTyping(): JSX.Element {
    return (
        <Message>
            <Root>
                <Dot
                    color="green"
                    delay={0}
                />
                <Dot
                    color="green"
                    delay={150}
                />
                <Dot
                    color="green"
                    delay={300}
                />
            </Root>
        </Message>
    )
};

const Message = styled.div`
    all: revert !important;
    position: relative !important;
    max-width: ${normalizedRem(10)} !important;
`

export const float = keyframes`
    0% {
        transform: translateY(-2px);
    }
    
    100% {
        transform: translateY(4px);
    }
`;

export const bounceLeftIn = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(-3000px,0,0);
    }
    60% {
        opacity: 1;
        transform: translate3d(25px,0,0);
    }
    75% {
        transform: translate3d(-10px,0,0);
    }
    90% {
        transform: translate3d(5px,0,0);
    }
    100% {
        transform: translateZ(0);
    }
`;


export const Root = styled.div`
    all: revert !important;
    display: inline-flex !important;
    justify-content: flex-start !important;
    align-items: center !important;
    font-size: 12px !important;
    position: relative !important;
    height: 18px !important;
    width: 40px !important;
    animation: ${bounceLeftIn} ease-in-out 0.2s !important;
`;

export const Dot = styled.div<{delay: number}>`
    all: revert !important;
  background-color: var(--theme-color, var(--base-color)) !important;
  border-radius: 50% !important;
  min-width: 8px !important;
  max-width: 8px !important;
  min-height:  8px !important;
  max-height:  8px !important;
  margin-right: 8px !important;
  animation: 
    ${float}
    300ms
    ease-in-out
    infinite 
    alternate
    ${({delay}) => delay}ms  !important;
`;


export const bounceInUp = keyframes`
0% {
    opacity: 0;
    transform: translate3d(0,3000px,0);
}

60% {
    opacity: 1;
    transform: translate3d(0,-20px,0);
}
75% {
    transform: translate3d(0,10px,0);
}
90% {
    transform: translate3d(0,-5px,0);
}
100% {
    transform: translateZ(0);
}
`;


export const dots = keyframes`
    0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    40% {
      color: lightgrey;
      text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    60% {
      text-shadow:
        .25em 0 0 lightgrey,
        .5em 0 0 rgba(0,0,0,0);}
    80%, 100% {
        text-shadow:
        .25em 0 0 lightgrey,
        .5em 0 0 lightgrey;
    `;

export const upWide = keyframes`
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  
  30% {
    opacity: 0.3;
    transform: scaleX(0);
  }
  
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
`;

export const scaleBounce = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  
  40% {
    opacity: 1;
  }
  
  60% {
      transform: scale(1.1);
  }
  
  100% {
    transform: scale(1);
  }
`;

export const showFixedBottom = keyframes`
  0% {
    bottom: -30%;
  }
  
  100% {
    bottom: 0;
  }
`;
