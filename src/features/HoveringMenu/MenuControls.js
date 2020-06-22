import React, { useCallback } from 'react'
import { useSlate } from 'slate-react'

import { 
    isMarkActive, 
    isInside,
    toggleMark,
    toggleLink,
    toggleCode 
} from 'features/Content/editor'

import Button from './Button'
import Input from './Input'
import Icon from 'components/Icon'


const MenuControls = ({ 
    isInputShown,
    setInputShown,
    inputRef,
    selection
}) => {
    const editor = useSlate()

    // on input submit
    const submit = useCallback(() => {
        const val = inputRef.current.value;
        toggleLink(editor, val, selection)
    }, [editor, inputRef, selection])

    // TODO
    // figure out how to render buttons in a map 
    // using features/Content/editor/constants
    // the problem is that the 'href' and 'tooltip' buttons
    // don't set marks, but toggle the input instead

    return (
        <>
            <Button tooltip='toggle Bold. Ctrl + B'
                handleMouseDown={() => toggleMark(editor, 'bold')}
                isActive={isMarkActive(editor, 'bold')} >
                    <b>B</b>
            </Button>

            <Button tooltip='toggle Italic. Ctrl + i'
                handleMouseDown={() => toggleMark(editor, 'italic')}
                isActive={isMarkActive(editor, 'italic')}>
                    <i>I</i>
            </Button>

            <Button tooltip='toggle Code. Ctrl + `'
                handleMouseDown={() => toggleCode(editor)}
                isActive={isInside(editor, 'code-inline')} >
                    <Icon icon='code-tags' />
            </Button>

            <Button tooltip='transform into a link'
                isActive={isInputShown}
                handleMouseDown={() => setInputShown(!isInputShown)}>
                    <Icon icon='link2' />
            </Button>

            <Input 
                submit={submit}
                inputRef={inputRef} 
                isShown={isInputShown} />
        </>
    )
}

export default MenuControls;