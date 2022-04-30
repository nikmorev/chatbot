import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'

export function initInsideRealDOM(Component: React.FC<any>, props: any, mountElement: HTMLElement) {
    ReactDOM.createRoot(mountElement).render(
        <React.StrictMode>
            <Component {...props}/>
        </React.StrictMode>
    )
}

export function initInsideShadowDom(Component: React.FunctionComponent<any>, props: any, elementName: string) {

    class ReactInWebComponent extends HTMLElement {
        connectedCallback() {

            const host = document.createElement('div')
            host.setAttribute('id', elementName)

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

    customElements.define(elementName, ReactInWebComponent)
    document.body.insertAdjacentHTML('beforeend', `<${elementName}/>`)
}