

const backend = {

    "title": "The Backend",

    "body": [{
        type: "intro",
        icon: "firebase",
        text: [
            "The ",
            {type: "strong", text: "backend"}, 
            " in the app is managed by ",
            {type: 'link', text: "Firebase", href: 'https://firebase.google.com/'}
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "paragraph",
        text: [
            "I'm yet to know how to do stuff on the ",
            {type: "strong", text: "server-side"},
            ". I've been adviced to try ",
            {type: "strong", text: "Firebase"},
            "."
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: 'heading',
        text: 'Firebase'
    }, {
        type: "paragraph",
        text: [
            {type: "strong", text: "Firebase"},
            " is a Backend-as-a-Service platform.",
            " All it's services, such as ",
            {type: "strong", text: "realtime database"},
            ", ",
            {type: "strong", text: "authentification"},
            ", ",
            {type: "strong", text: "analytics"},
            " and many more, are hosted, maintained and operated by ",
            {type: "strong", text: "Google"},
            ". ",
            {type: "strong", text: "Firebase"},
            " provides a number of client ",
            {type: "strong", text: "SDK"},
            "s to interact with these services directly. "
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "heading",
        text: "The App"
    }, {
        type: "paragraph",
        text: [
            "The admin can interact with the ",
            {type: "strong", text: "database"},
            " directly from the app's interface:"
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "list",
        items: [[
            "Create and delete items from the ",
            {type: "strong", text: "database"},
            " using the form in the header."
            ], [
            "Change the order in which items appear in the menu ",
            " by dragging and dropping them.",
            ], [
            "Edit the contents ",
            " and save the changes in the ",
            {type: "strong", text: "database"},
            "."
            ]
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "paragraph",
        text: [
            "You are welcome to play with these features, ",
            "they are left for viewing by a regular user ",
            " specifically for demonstration purposes. ",
            "None of your interactions are going to be saved ",
            " in the database."
        ]
    }]
}

export default backend