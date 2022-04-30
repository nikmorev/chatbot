import React from 'react'
import { Chatbot } from './index'
import config from './config'
import { initialization } from './helpers/initialization'
import { initInsideRealDOM, initInsideShadowDom } from './helpers/render'


initialization(() => {
    if (config.wrapInWebComponent) initInsideShadowDom(Chatbot, config, 'chatbot-by-morev')
    else initInsideRealDOM(Chatbot, config, document.getElementById('root')!)
}).then()



