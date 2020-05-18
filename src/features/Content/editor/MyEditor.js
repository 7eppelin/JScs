
import { Editor, Node, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'


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
        Transforms.setNodes(editor, 
            { [mark]: isActive ? false : true }, 
            { match: n => Text.isText(n), split: true }
        )
    },


    linkify: (editor, href, selection) => {
        if (href) {
            Transforms.setNodes(editor, { href }, { 
                at: selection,
                match: n => Text.isText(n), 
                split: true 
            })

        } else if (MyEditor.isMarkActive(editor, 'href')) {
            Transforms.unsetNodes(editor, 'href', { 
                at: selection,
                match: n => Text.isText(n), 
                split: true 
            })
        }
    },


    tooltipify: (editor, tooltip, selection) => {
        if (tooltip) {
            Transforms.setNodes(editor, { tooltip }, { 
                at: selection,
                match: n => Text.isText(n),
                split: true 
            })
        } else if (MyEditor.isMarkActive(editor, 'tooltip')) {
            Transforms.unsetNodes(editor, 'tooltip', { 
                at: selection,
                match: n => Text.isText(n), 
                split: true 
            })
        }
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


    setSelection: (editor, selection) => {
        ReactEditor.focus(editor)
        Transforms.select(editor, selection)
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
    },


    handleEnter: (editor, event) => {
        if (MyEditor.isInsideCode(editor)) {
            editor.insertText('\n');
            event.preventDefault();
        }
    },


    handleKeyDown: (event, editor) => {
        const char = event.nativeEvent.code

        if (char === 'Enter') {
            MyEditor.handleEnter(editor, event);
        }

        if (!event.ctrlKey) return;

        switch (char) {
            case 'KeyB': 
                event.preventDefault();
                MyEditor.toggleMark(editor, 'bold');
                break;
            
            case 'KeyI':
                event.preventDefault();
                MyEditor.toggleMark(editor, 'italic');
                break;

            case 'Backquote':
                event.preventDefault();
                MyEditor.toggleMark(editor, 'code');
                break;

            // block insertion
            case 'Digit2':
                event.preventDefault();
                MyEditor.insertBlockElem(editor, 'h2');
                break

            case 'Digit3':
                event.preventDefault();
                MyEditor.insertBlockElem(editor, 'h3');
                break;

            case 'KeyP':
                event.preventDefault();
                MyEditor.insertBlockElem(editor, 'paragraph');
                break;

            case 'KeyU':
                event.preventDefault();
                MyEditor.insertBlockElem(editor, 'ul');
                break;

            case 'KeyH':
                event.preventDefault();
                MyEditor.insertBlockElem(editor, 'code-block', 'Code here!');
                break;
        }  
    }
}

export { MyEditor as Editor }