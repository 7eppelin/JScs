

const state = {

    title: "The State",

    body: [{

        type: "intro",
        icon: "database",
        text: [
            "The state of the app is managed using ",
            {type: "strong", text: "React hooks"},
            " and ",
            {type: "link", text: "Redux-Toolkit", href: "https://redux-toolkit.js.org/"}
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {

        type: 'paragraph',
        text: [
            "The idea behind ",
            {type: 'link', text: "this approach" , href: "https://redux.js.org/faq/organizing-state#do-i-have-to-put-all-my-state-into-redux-should-i-ever-use-reacts-setstate"}, 
            " is to use ",
            {type: "strong", text: "Redux store"},
            " for the pieces of state that are used by different components, ",
            "often located in different parts of the UI. ",
            " And the rest of the state is managed locally using ",
            {type: "strong", text: "React's useState()"},
            " hook. ",
        ]
    }, {
        type: 'paragraph',
        text: [
            "In this particular app, ",
            {type: "strong", text: "Redux' store"},
            " is used to manage the data fetched from the ",
            {type: "strong", text: "database"}, 
            ", and the logged in user info. "
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: 'heading',
        text: "The toolkit"
    }, {
        type: 'paragraph',
        text: [
            "I had little experience with ",
            {type: "strong", text: "Redux"},
            ", and wanted to go further, so I decided to give ",
            {type: "strong", text: "Redux-Toolkit"},
            " a try. Here are some of the benefits the ", 
            {type: "strong", text: "toolkit"},
            " offers:"
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: 'list',
        items: [
            "Reduced amount of boilerplate code. ", 

            [
            "Besides the ",
            {type: "strong", text: "Redux"},
            " itself, some commonly used libraries, such as ",
            {type: "link", text: "redux-thunk", href: "https://github.com/reduxjs/redux-thunk"},
            " and ",
            {type: "link", text: "reselect", href: "https://github.com/reduxjs/reselect"},
            " are included by default."

            ], [

            "The ",
            {type: "link", text: "immer", href: "https://github.com/immerjs/immer"},
            " library, that lets you to apply immubable updates to the state ",
            "by writing simple mutable code, is used internally."
            ]
        ]
    }]
}

export default state