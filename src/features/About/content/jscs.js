

const jscs = {
    "title": "A JavaScript Cheat Sheet",

    "body": [{
        type: 'intro',
        icon: 'greeting',
        text: [
            "Hey! I'm Pyotr and this is my personal project - ", 
            {type: "strong", text: "JScs! "},
            "The source code of the app is available on ",
            {type: "link", text: "GitHub", href: "https://github.com/7eppelin/JScs/"},
        ]
    }, {
        type: "heading",
        text: "The App"
    }, {
        type: 'paragraph',
        text: [
            "I'm a beginner front-end developer. ",
            "I figured that I need a portfolio project, ",
            "and came up with the idea of creating ",
            {text: "a JavaScript cheat sheet. ", type: "strong"},
            "I pursued three goals:"]
    }, {
        type: 'list',
        items: [
            "To have a fairly decent portfolio project.",

            ["To keep practicing with the technologies that ",
            "I had already started to learn, and learn some new ones. ",
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

            "To create an app that I will actually use."
        ]
    }, {
        type: 'paragraph',
        text: [
            "The idea was to create ", 
            {text: "a cheat sheet app", type: "strong"},
            ", where the user (probably, just myself) could quickly recall ",
            "the API that he already knows, but has forgotten some detals. ",
            "All JS and JS-related libraries and frameworks' APIs in one place.",
        ]
    }, {
        type: 'paragraph',
        text: [
            "Another idea was to make it possible for the admin ",
            "to manage all the app's materials right from the UI ",
            "without the need of messing with the database directly. "
        ]
    }]
}


export default jscs