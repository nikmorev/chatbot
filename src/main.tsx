import React from 'react'
import { Chatbot } from './index'
import config from './config'
import { initialization } from './initialization'
import { initInsideRealDOM, initInsideShadowDom } from './renderHelpers'


initialization(() => {
    if (config.wrapInWebComponent) initInsideShadowDom(Chatbot, config, 'chatbot-by-morev')
    else initInsideRealDOM(Chatbot, config, document.getElementById('root')!)
}).then()



