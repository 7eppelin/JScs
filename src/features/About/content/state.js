

const state = {

    title: "The state",

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
            " is to use the ",
            {type: "strong", text: "Redux' store"},
            " for the parts of the state that are used by different components, ",
            "often located in different parts of the UI. ",
            " And the rest of the state is managed locally using the ",
            {type: "strong", text: "React's useState()"},
            ". ",
        ]
    }, {
        type: 'paragraph',
        text: [
            "In this particular app, ",
            {type: "strong", text: "Redux' store"},
            " is used to manage the data fetched from the ",
            {type: "strong", text: "database"}, 
            ", the logged in user info, ",
            "and the status of the form in the header."
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
            " , and wanted to go further, so i decided to try ",
            {type: "strong", text: "Redux-Toolkit"},
            ":"
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: 'list',
        items: [[
            "Reduces the amount of boilerplate code ",
            {type: "strong", text: "Redux"},
            " normally requires"
            ], [

            "Besides the ",
            {type: "strong", text: "Redux"},
            " itself, has some commonly used libraries, such as ",
            {type: "link", text: "redux-thunk", href: "https://github.com/reduxjs/redux-thunk"},
            " and ",
            {type: "link", text: "reselect", href: "https://github.com/reduxjs/reselect"},
            " included by default."

            ], [

            "Uses the ",
            {type: "link", text: "immer", href: "https://github.com/immerjs/immer"},
            " library internally, that lets you to apply immubable updates to the state ",
            "by writing simple mutable code."
            ]
        ]
    }]
}

export default state