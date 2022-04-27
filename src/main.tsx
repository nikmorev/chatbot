import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'
import { Chatbot } from './index'
import config from './config'

initChatbot()

function initChatbot() {
    if (config.wrapInWebComponent) initInsideShadowDom(Chatbot, config)
    else initInsideRealDOM(Chatbot, config, document.getElementById('root')!)
}

function initInsideRealDOM(Component: React.FC<any>, props: any, mountElement: HTMLElement) {
    // document.getElementById('root')!
    ReactDOM.createRoot(mountElement).render(
        <React.StrictMode>
            {/*<Chatbot {...config}/>*/}
            <Component {...props}/>
        </React.StrictMode>
    )
}

function initInsideShadowDom(Component: React.FunctionComponent<any>, props: any, elementName: string = 'chatbot-by-morev') {

    class ChatbotByMorev extends HTMLElement {
        connectedCallback() {

            const host = document.createElement('div')
            host.setAttribute('id', 'chatbot-by-morev')

            this.attachShadow({ mode: 'open' }).appendChild(host)

            const styleSlot = document.createElement('section')
            host.appendChild(styleSlot)

            const mountPoint = document.createElement('div')
            styleSlot.appendChild(mountPoint)

            ReactDOM.createRoot(mountPoint).render(
                <React.StrictMode>
                    <StyleSheetManager target={styleSlot}>
                        <Component {...props}/>
                    </StyleSheetManager>
                </React.StrictMode>
            )
        }
    }

    customElements.define(elementName, ChatbotByMorev)
    document.body.insertAdjacentHTML('beforeend', `<${elementName}/>`)
}


