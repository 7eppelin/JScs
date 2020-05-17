import React, { useCallback, useMemo } from 'react'
import { useSlate } from 'slate-react'

import { Editor } from 'features/Content/editor';
import Button from './Button';
import Input from './Input';


const MenuControls = ({ 
    inputType,
    setInputType,
    inputRef,
    selection
}) => {
    const editor = useSlate()

    const placeholder = 
        inputType === 'link' ? 'link URL...' :
        inputType === 'tooltip' ? 'tooltip text...' : '' 

    const linkify = useCallback(() => {
        const val = inputRef.current.value;
        Editor.linkify(editor, val, selection.current);
    })

    const tooltipify = useCallback(() => {
        const val = inputRef.current.value;
        Editor.tooltipify(editor, val, selection.current);
    })

    // when the input is focused, selection is lost
    // that leads to every isMarkActive() call returning false
    const isBold = useMemo(
        () => Editor.isMarkActive(editor, 'bold'), 
        [editor.children, selection.current]
    )
    const isItalic = useMemo(
        () => Editor.isMarkActive(editor, 'italic'),
        [editor.children, selection.current]
    )
    const isCode = useMemo(
        () => Editor.isMarkActive(editor, 'code'),
        [editor.children, selection.current]
    )

    return (
        <>
            <Button tooltip='toggle Bold. Ctrl + B'
                isActive={isBold}
                handleMouseDown={() => {
                    Editor.setSelection(editor, selection.current)
                    Editor.toggleMark(editor, 'bold')
                }} >
                    <b>B</b>
            </Button>

            <Button tooltip='toggle Italic. Ctrl + i'
                isActive={isItalic}
                handleMouseDown={() => {
                    Editor.setSelection(editor, selection.current)
                    Editor.toggleMark(editor, 'italic')
                }}>
                    <i>I</i>
            </Button>

            <Button tooltip='toggle Code. Ctrl + `'
                isActive={isCode}
                handleMouseDown={() => {
                    Editor.setSelection(editor, selection.current)
                    Editor.toggleMark(editor, 'code')
                }} >
                    {`</>`}
            </Button>

            <Button tooltip='transform into a link'
                isActive={inputType === 'link'}
                handleMouseDown={() => {
                    inputType === 'link' ? 
                        setInputType(null) : setInputType('link')
                }}>
                    <i className="fas fa-link" />
            </Button>

            <Button tooltip='add a tooltip'
                isActive={inputType === 'tooltip'}
                handleMouseDown={() => {
                    inputType === 'tooltip' ? 
                        setInputType(null) : setInputType('tooltip');
                }}>
                    <i className="far fa-comment-alt" />
            </Button>

            <Input 
                submit={inputType === 'link' ? linkify : tooltipify}
                inputRef={inputRef} 
                isShown={inputType !== null}
                placeholder={placeholder} />
        </>
    )
}

export default MenuControls;