

const editor = {

    title: "Editor",
    body: [{
        type: "intro",
        icon: 'edit-doc',
        text: [
            {type: 'link', text: "Slate", href: "https://docs.slatejs.org/"},
            " is a completely customizable framework for building rich text editors."
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "paragraph",
        text: [
            "Each item in the menu has a corresponding ",
            {type: "strong", text: "content"},
            " document. The document initially appears in ",
            {type: "strong", text: "read-only mode"},
            ", but it is rendered inside the ",
            {type: "strong", text: "editor"},
            " that is built with ",
            {type: "strong", text: "Slate"},
            ", so as you click the \"edit\" button, it becomes fully ",
            {type: "strong", text: "editable"},
            ":"
        ]
    }, {
        type: 'list',
        items: [
            "You can insert, delete and edit paragraphs, headings, lists and blocks of code.",

            ["You can format text using the hovering menu that appears ",
            "as you select some text."],

            "You can add, delete and edit links on the static panel.",

            ["You can insert elements and format text using the menus, ",
            "or simply use the keyboard shortcuts."],
        ]
///////////////////////////////////////////////////////////////////////////////
    }, {
        type: "paragraph",
        text: [
            "Despite being fully ",
            {type: "strong", text: "editable"},
            ", the editor has some reasonable constraints:"
        ]
    }, {
        type: "list",
        items: [
            ["Although the ",
            {type: "strong", text: "title"},
            " of each document is editable, you can not delete it, ",
            "apply text formatting to it or insert a second title by yourself."],

            ["You can not insert a new ",
            {type: "strong", text: "element"},
            " between the ",
            {type: "strong", text: "title"},
            " of a document, and the ",
            {type: "strong", text: "links bar"},
            "."],

            ["You can not apply text formatting in a ",
            {type: "strong", text: "code-block element"},
            "."],

            ["You are welcome to play with the ",
            {type: "strong", text: "editor"}, 
            ", but none of your changes are going to be saved to the ",
            {type: "strong", text: "database"},
            "."]
        ]
    }]
///////////////////////////////////////////////////////////////////////////////
};

export default editor