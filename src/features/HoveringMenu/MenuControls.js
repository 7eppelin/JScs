import React, { useCallback, useMemo } from 'react'
import { useSlate } from 'slate-react'

import { isMarkActive, setMark, setLink, unsetLink } from 'features/Content/editor'
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
        if (val) {
            setLink(editor, val, selection)
        } else {
            unsetLink(editor, selection)
        }
    }, [editor, inputRef, selection])

    // when the input is focused, selection is lost
    // that leads to every isMarkActive() call returning false
    const isBold = useMemo(
        () => isMarkActive(editor, 'bold'), 
        [editor, editor.children, editor.selection]
    )
    const isItalic = useMemo(
        () => isMarkActive(editor, 'italic'),
        [editor, editor.children, editor.selection]
    )
    const isCode = useMemo(
        () => isMarkActive(editor, 'code'),
        [editor, editor.children, editor.selection]
    )

    // TODO
    // figure out how to render buttons in a map 
    // using features/Content/editor/constants
    // the problem is that the 'href' and 'tooltip' buttons
    // don't set marks, but toggle the input instead

    return (
        <>
            <Button tooltip='toggle Bold. Ctrl + B'
                handleMouseDown={() => {
                    setMark(editor, 'bold', !isBold, selection.current)
                }}
                isActive={isBold} >
                    <b>B</b>
            </Button>

            <Button tooltip='toggle Italic. Ctrl + i'
                handleMouseDown={() => {
                    setMark(editor, 'italic', !isItalic, selection.current)
                }}
                isActive={isItalic}>
                    <i>I</i>
            </Button>

            <Button tooltip='toggle Code. Ctrl + `'
                handleMouseDown={() => {
                    setMark(editor, 'code', !isCode, selection.current)
                }}
                isActive={isCode} >
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