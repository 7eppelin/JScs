import { createEditor, Editor, Node, Text, Transforms } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Prism from 'prismjs';



const withVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = element => {
        return element.type === 'links' ? true : isVoid(element);
    }
    return editor;
}

const createMyEditor = () => (
    withVoids(
        withHistory(
            withReact(createEditor())
        )
    )
);



//      extending the original Editor's commands

const MyEditor = {
    ...Editor,

    isMarkActive: (editor, mark) => {
        const [ match ] = Editor.nodes(editor, {
            match: n => n[mark],
            universal: true
        })
        return !!match
    },

    toggleMark: (editor, mark) => {
        const isActive = MyEditor.isMarkActive(editor, mark);
        Transforms.setNodes(
            editor,
            { [mark]: isActive ? false : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    linkify: (editor, href, selection) => {
        Transforms.setNodes(
            editor, { href }, { 
                at: selection,
                match: n => Text.isText(n), 
                split: true 
            }
        )
    },

    tooltipify: (editor, tooltip, selection) => {
        Transforms.setNodes(editor, { tooltip }, { 
            at: selection,
            match: n => Text.isText(n),
            split: true 
        })
    },

    insertBlockElem: (editor, elemType) => {  
        Transforms.insertNodes(editor, {
            type: elemType,
            children: [{ text: `[${elemType}] edit me!` }]
        })
    },

    insertCodeBlock: (editor, text) => {
        Transforms.insertNodes(editor, {
            type: 'code-block',
            children: [{ text }]
        })
    },

    handleEnter: (editor, event) => {
        if (MyEditor.isInsideCode(editor)) {
            editor.insertText('\n');
            event.preventDefault();
        }
    },

    isInsideCode: editor => {
        const path = [...editor.selection.anchor.path];
        const parentPath = path.slice(0, path.length - 1);
        const parent = Node.get(editor, parentPath);
        return parent.type === 'code-block';
    },

    setLinks: (editor, links) => {
        Transforms.setNodes(
            editor, 
            { links }, 
            { at: [1] }
        )
    }
}



//      integrating prismjs with slate

const decorate = ([ node, path ]) => {
    if (node.type !== 'code-block') return [];

    const code = Node.string(node)
    const ranges = [];
    const tokens = Prism.tokenize(code, Prism.languages.javascript);
    let start = 0;

    for (const token of tokens) {
        const length = getTokenLength(token);
        const end = start + length;

        if (typeof token !== 'string') {
            ranges.push({
                token: token.type,
                anchor: { path, offset: start },
                focus: { path, offset: end }
            })
        }

        start = end;
    }
    return ranges;
}

const getTokenLength = token => {
    if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getTokenLength(t), 0)
      }
}

const isInsideCode = (node, path) => {
    for (const el of Node.ancestors(node, path)) {
        if (el.type === 'code-block') return true;
    }
    return false;
}


export { 
    createMyEditor as createEditor,
    MyEditor as Editor,
    decorate
};