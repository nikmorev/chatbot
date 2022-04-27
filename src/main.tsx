import React from 'react'
import ReactDOM from 'react-dom/client'
import { Chatbot } from './index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Chatbot />
  </React.StrictMode>
)


// const Example = () => {
//     const onClick = () => console.log('clicked react shadow button!')
//
//     return <button type={'button'} onClick={onClick}>In Shadow Dom</button>
// }

// class XSearch extends HTMLElement {
//     connectedCallback() {
//         const mountPoint = document.createElement('span');
//         this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
//         const root = ReactDOM.createRoot(mountPoint);
//         root.render(<Example/>);
//     }
// }
// customElements.define('x-search', XSearch);