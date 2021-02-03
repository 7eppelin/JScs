

const tools = {
    title: "Tools",
    body: [{
        type: "intro",
        icon: 'tools',
        text: [
            "Here is the full list of the tools ",
            "I used in this app"
        ]
    }, {
        type: "list",
        items: [[
            {type: 'link', text: "Create-React-App", href: "https://create-react-app.dev/"},
            " - the development enviroment setup and optimizations for production."
            ], [

            {type: 'link', text: "Firebase", href: "https://firebase.google.com/"},
            " - database and authentification."
            ], [

            {type: 'link', text: "React", href: "https://reactjs.org/"},
            " - user interface"
            ], [

            {type: 'link', text: "Redux-Toolkit", href: "https://redux-toolkit.js.org/"},
            " - state management"
            ], [

            {type: 'link', text: "Redux-Thunk", href: "https://github.com/reduxjs/redux-thunk"},
            " and ",
            {type: 'link', text: "Reselect", href: "https://github.com/reduxjs/reselect"},
            " as parts of ",
            {type: "strong", text: "Redux-Toolkit"},
            "."
            ], [

            {type: 'link', text: "React-Redux", href: "https://react-redux.js.org/"},
            " - hooks to access the ",
            {type: "strong", text: "Redux store"},
            " and dispatch actions."
            ], [

            {type: 'link', text: "React-Router", href: "https://reacttraining.com/react-router/"},
            " - routing."
            ], [

            {type: 'link', text: "Framer-Motion", href: "https://www.framer.com/motion/"},
            " - animations."
            ], [

            {type: 'link', text: "Slate", href: "https://docs.slatejs.org/"},
            " - rich text editor framework."
            ], [

            "All ",
            {type: "strong", text: "SVG icons"},
            " are from ",
            {type: 'link', text: "Material Desing Icons", href: "https://materialdesignicons.com/"},
            ], [

            {type: 'link', text: "Styled-Components", href: "https://styled-components.com/"},
            " - css-in-js."
            ], [

            {type: 'link', text: "PrismJS", href: "https://prismjs.com/"},
            " - code syntax highlighting."
            ], [

            {type: 'link', text: "TippyJS-React", href: "https://github.com/atomiks/tippyjs"},
            " - tooltips."
            ]
        ]
    }]
}

export default tools