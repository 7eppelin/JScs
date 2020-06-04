

const page1 = {
    "title": "A JavaScript cheat sheet",

    "body": [{
        type: 'intro',
        icon: 'greeting',
        text: [
            "Hey! I`m Pyotr and this is my personal project - ", 
            {type: "strong", text: "JScs! "},
            "The source code of the app is available on ",
            {type: "link", text: "GitHub", href: "https://github.com/7eppelin/JScs/"},
        ]
    }, {
        type: "heading",
        text: "The app"
    }, {
        type: 'paragraph',
        text: [
            "I'm not-even-a-junior-yet front-end developer, ",
            "and I figured that I need a portfolio project, ",
            "and came up with the idea of creating ",
            {text: "a JavaScript cheat sheet. ", type: "strong"},
            "I pursued three goals:"]
    }, {
        type: 'list',
        items: [
            "To have a fairly decent portfolio project;",

            ["To keep practicing with the technologies that ",
            "i had already started to learn, and learn some new ones. ",
            "I had little experience with ",
            {text: "HTML", type: "strong"}, 
            ", ",
            {text: "CSS", type: "strong"},
            ", ",
            {text: "JS", type: "strong"},
            ", ",
            {text: "React", type: "strong"}, 
            " and ",
            {text: "Redux", type: "strong"},
            " at that time."
            ],

            "To create an app that I will actually use;"
        ]
    }, {
        type: 'paragraph',
        text: [
            "The idea was to create ", 
            {text: "a cheat sheet app", type: "strong"},
            ", where the user (probably, just myself) could quickly recall ",
            "the API that he already knows, but has forgotten some detals. ",
            "All JS and JS-related frameworks' APIs in one place."
        ]
    }] 
}



///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


const page2 = {

    title: "The UI",

    body: [{
        type: "intro",
        icon: "react",
        text: [
            "The main technology with which this application is written is ",
            {type: "link", text: "React", href: "https://reactjs.org/"},
            "."
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {

        type: "paragraph",
        text: [
            "Back in the day when i decided to create this app, ",
            "I had little experience with ",
            {type: "strong", text: "React"}, 
            " and ",
            {type: "strong", text: "Redux"},
            " - just a small ",
            {type: 'link', text: 'todo app', href: "https://veryoriginaltodoapp.github.io/"},
            ". ",
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {

        type: "heading",
        text: "React"
    }, {

        type: "paragraph",
        text: [
            " Back then, I had mainly been writing ",
            {type: "strong", text: "class components"},
            " on ",
            {type: "strong", text: "React"},
            ". Just like everyone, i suppose. ",
            "But not so long ago, React ",
            {type: "strong", text: "hooks"},
            " were released, and I decided to challenge myself: ",
            "I wanted to try to write the entire app without writing ",
            "a single class component. ",
            "And there are currently no class components in the app."
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {

        type: "heading",
        text: "Animations"
    }, {

        type: 'paragraph',
        text: [
            "There are plenly of animation libraries for ",
            {type: "strong", text: "React"},
            ". I've red a number of discussions on Reddit and articles on Medium, ",
            "and decided to try ",
            {type: 'link', text: "framer-motion", href: "https://www.framer.com/motion/"},
            ". "
        ]
    }]
}



///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


const page3 = {

    title: "The state",

    body: [{

        type: 'paragraph',
        text: [
            "I decide to manage the state  ",
            "I already had some experience with ",
            {type: "strong", text: "Redux"},
            ", and wanted to learn something new, so I decided to try ",
            {type: "link", text: "Redux-Toolkit", href: "https://redux-toolkit.js.org/"},
            ". Except for the Redux itself, ",
            {type: "strong", text: "redux-thunk"},
            " and ",
            {type: "strong", text: "reselect"},
            " are also included there.",
            " It uses the ",
            {type: "link", text: "immer", href: "https://github.com/immerjs/immer"},
            " library internally, which lets us write immutable updates with mutative code. "
        ]
    }]
}


///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


const page4 = {

    "title": "The data",

    "body": [{
        type: "intro",
        icon: "firebase",
        text: [{
            type: 'link',
            href: 'https://firebase.google.com/',
            text: "Firebase"
        }, " is a Backend-as-a-Service platform on Google Cloud Platform"]
    }, {
        type: "paragraph",
        text: "datatatata"
    }]
}


export default [ 
    //page1, 
    page2, 
    page3,
    page4
]