import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'
import { Chatbot } from './index'
import config from './config'


function initInsideRealDOM(Component: React.FC, props: any, mountElement: HTMLElement) {
    // document.getElementById('root')!
    ReactDOM.createRoot(mountElement).render(
        <React.StrictMode>
            {/*<Chatbot {...config}/>*/}
            <Component {...props}/>
        </React.StrictMode>
    )
}

function initInsideShadowDom(Component: React.FunctionComponent<any>, props: any, elementName: string = 'chatbot-by-morev') {
    const host = document.createElement('div')
    host.setAttribute('id', 'chatbot-by-morev')
    document.body.prepend(host)

    class ChatbotByMorev extends HTMLElement {
        connectedCallback() {

            const shadow = host.attachShadow({ mode: 'open' })

            const styleSlot = document.createElement('section')
            shadow.appendChild(styleSlot)

            const mountPoint = document.createElement('div')
            styleSlot.appendChild(mountPoint)

            ReactDOM.createRoot(mountPoint).render(
                <React.StrictMode>
                    <StyleSheetManager target={styleSlot}>
                        <Component {...props}/>
                    </StyleSheetManager>
                </React.StrictMode>
            )
            // const root = ReactDOM.createRoot(mountPoint);
            // root.render(<Example/>);
        }
    }

    customElements.define(elementName, ChatbotByMorev)

    document.body.insertAdjacentHTML('beforeend', `<${elementName}/>`)
}

initInsideShadowDom(Chatbot, config)

