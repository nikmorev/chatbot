import { Steps } from './types'


const scenario: Steps = {
    "lastStep": 8,
    "steps": [
        {
            "step": 0,
            "messages": [
                "I can help you with any writing assignment!",
                "It's free and you don't have to do anything!"
            ],
            "stepType": "buttons",
            "buttons": [
                {"name": "", "label": "Yes", "value": "Yes", "nextStep": 1},
                {"name": "", "label": "No", "value": "No", "nextStep": -1}
            ]
        },
        {
            "step": 1,
            "messages": [
                "Great! please, describe your task briefly.",
            ],
            "stepType": "input",
            "input": {
                "name": "title",
                "type": "text",
                "placeholder": "Your answer",
                "required": true,
                "nextStep": 2,
                "minLength": 5,
                "maxLength": 150
            }
        },
        {
            "step": 2,
            "messages": [
                "Is it course work?"
            ],
            "stepType": "buttons",
            "buttons": [
                {"name": "type_id", "label": "Yes", "value": "10", "nextStep": 4},
                {"name": "", "label": "No", "value": "No", "nextStep": 3}
            ]
        },
        {
            "step": 3,
            "messages": [
                "Please choose the type of your assignment",
            ],
            "stepType": "buttons",
            "buttons": [
                {"name": "type_id", "label": "Essay", "value": "1", "nextStep": 4},
                {"name": "type_id", "label": "Speech", "value": "2", "nextStep": 4},
                {"name": "type_id", "label": "Research Paper", "value": "3", "nextStep": 4},
                {"name": "type_id", "label": "Case Study", "value": "4", "nextStep": 4},
                {"name": "type_id", "label": "PowerPoint", "value": "5", "nextStep": 4},
                {"name": "type_id", "label": "Term Paper", "value": "6", "nextStep": 4},
                {"name": "type_id", "label": "Math Assignment", "value": "7", "nextStep": 4},
                {"name": "type_id", "label": "Other", "value": "8", "nextStep": 4}
            ]
        },
        {
            "step": 4,
            "messages": [
                "How many pages do you need?",
            ],
            "stepType": "select",
            "select": {
                "name": "pages",
                "nextStep": 5,
                "required": true,
                "options": [
                    {"label": "1 (30 lines)", "value": "1"},
                    {"label": "2 (60 lines)", "value": "2"},
                    {"label": "3 (90 lines)", "value": "3"},
                    {"label": "4 (120 lines)", "value": "4"},
                    {"label": "5 (150 lines)", "value": "5"},
                    {"label": "6 (180 lines)", "value": "6"},
                    {"label": "7 (210 lines)", "value": "7"},
                    {"label": "More", "value": "-1", "showInput": true}
                ]
            },
            "input": {
                "name": "pages",
                "type": "number",
                "placeholder": "Number of pages",
                "defaultValue": 10,
                "required": true,
                "nextStep": 5,
                "min": 1,
                "max": 500,
                "pattern": "\\d+",
            }
        },
        {
            "step": 5,
            "messages": [
                "When you need your project to be done",
            ],
            "stepType": "deadlineRelative",
            "buttons": [
                {"name": "deadline", "label": "Tomorrow", "value": "24", "nextStep": 6},
                {"name": "deadline", "label": "In 2 days", "value": "48", "nextStep": 6},
                {"name": "deadline", "label": "In 3-5 days", "value": "96", "nextStep": 6},
                {"name": "deadline", "label": "More then 5 days", "value": "336", "nextStep": 6},
            ]
        },
        {
            "step": 6,
            "messages": [
                "Cool! Enter your email address.",
            ],
            "stepType": "input",
            "input": {
                "name": "email",
                "type": "email",
                "placeholder": "Your email",
                "required": true,
                "nextStep": 7,
                "pattern": "\\S+@\\S+\\.\\S+"
            }
        },
        {
            "step": 7,
            "messages": [
                "Great!",
                "Please, follow the link bellow and check if everything is ok."
            ],
            "stepType": "submit",
            "buttons": [
                {"name": "", "label": "Proceed 🔥", "value": "Proceed 🔥", "nextStep": 8},
            ],
            "shouldCenter": true,
            "keepAfter": true,
            "isLast": true
        },
        {
            "step": -1,
            "messages": ["It's OK. So just close the chat."],
            "stepType": "message"
        }
    ]
}

export default scenario