

const ui = {

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
            "There are currently no class components in the app."
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

export default ui