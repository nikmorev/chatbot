import React from 'react'
import { Chatbot as App } from './app'
import config, { IConfig } from './config'
import { initialization } from './helpers/initialization'
import { initInsideRealDOM, initInsideShadowDom } from './helpers/render'


export function startChatbot(customConfig?: IConfig) {
    initialization(() => {
        if (config.wrapInWebComponent) initInsideShadowDom(App, customConfig ?? config, 'chatbot-by-morev')
        else initInsideRealDOM(App, customConfig ?? config, document.getElementById('root')!)
    }).then()
}
