

const editor = {

    title: "The editor",
    body: [{
        type: "intro",
        icon: 'edit-doc',
        text: [
            "Every item's ",
            {type: "strong", text: "content"},
            " is fully ",
            {type: "strong", text: "editable"},
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "heading",
        text: "Slate"
    }, {
        type: "paragraph",
        text: [
            {type: 'link', text: "Slate", href: "https://docs.slatejs.org/"},
            " is a completely customizable framework for building rich text editors"
        ]
    }]
};

export default editor