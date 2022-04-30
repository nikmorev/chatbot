# Chatbot by morev n.
## Description
This is chatbot that runs accordingly to the defined script in json format.
Chatbot runs step by step. Each step consist of two possible messages: from 
chabot (assistant) and from user. Each message from assistant can consist of text and 
interactive element (input, select or buttons). Entered text or text from selected option/button
is printed as a message from the user.
<br><br>
## What chatbot consists of
Chatbot is written on react + styled-components.<br>
Chatbot can be dynamicaly programmed with any scanario by backend or on the client.


## How to run this chatbot in development mode.
1. Go to *src/scenario*, copy *example.dev.json* to *dev.json* and add there
the scenario (look at the structure of scenario here below in "Pattern of chatbot scenario").
2. Go to *src/config*, copy *demo.example.tsx* to *demo.tsx* and edit fields as you need.
3. Run `npm run dev`.

##Pattern of chatbot scenario

```typescript
{
    // Last possible step
    "lastStep": number
    // Array of steps
    "steps": {
        // Number of step
        "step": number,
        // Array of messages from chatbot (assistant) to show
        // each message is on it's own line
        "messages": string[],
        // not used yet
        "resultPattern"?: string,
        // not used yet
        "considerPlural"?: boolean,
        // type of step (step can have multiple interactive elements, 
        // values of different elements can be processed differently,
        // so it's usefull to set the step type depending on type of main
        // interactive element)
        // deadlineRelative - means value should be hours (from now to the wannabe date),
        "stepType": 'buttons' | 'select' | 'input' | 'submit' | 'message' | 'deadlineRelative',
        // Array of buttons appear under bot's last message in a step
        "buttons"?: {
            // if name is not empty string, it will get to form data request
            "name": string,
            // label will be printed as button's text and as message from user once button is clicked
            "label": string,
            // if name is not empty string, it will get to form data request with this value
            "value"?: string
            // next step to show once button is clicked
            "nextStep": number
        }[],
        // Input for user to type some data
        "input"?: {
            // if name is not empty string, it will get to form data request
            "name": string,
            // same type as for html tag input
            "type": string,
            // same attribute as for html tag input
            "placeholder"?: string,
            // same attribute as for html tag input
            "required"?: boolean,
            // not used yet
            "defaultValue"?: string | number,
            // same attribute as for html tag input
            "min"?: number,
            // same attribute as for html tag input
            "max"?: number,
            // same attribute as for html tag input
            "minLength"?: number,
            // same attribute as for html tag input
            "maxLength"?: number,
            // same attribute as for html tag input
            "pattern"?: string,
            // as title attribute for html tag input
            "invalidMessage"?: string,
            // next step to show once input is submited
            "nextStep": number
        },
        // Select for user to type some data
        "select"?: {
            // if name is not empty string, it will get to form data request
            "name": string,
            // options for select
            "options": {
                // if name is not empty string, it will get to form data request with this value
                "value": number | string,
                // what user sees as label of option and as user's message once select gets submited
                "label": string,
                // if we should show some input under select if current option is selected
                "showInput"?: boolean
            }[],
            // not used yet
            "placeholder"?: string,
            // not used yet
            "selected"?: string | number,
            // same attribute as for html tag input
            "required"?: boolean,
            // next step to show once select is submited
            "nextStep": number
        },
        // to point if step is last (maybe will be removed later, but please set it now)
        "isLast"?: boolean
        // not used yet
        "keepAfter"?: boolean,
        // if content should be centered (now it's related only to buttons)
        "shouldCenter"?: boolean
    }[]
}
```