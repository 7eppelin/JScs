import React, { useMemo } from 'react'

import { 
    isMarkActive, 
    isInside,
    toggleMark,
    toggleCode 
} from 'features/Content/editor'

import Button from './Button'
import LinkForm from './LinkForm'
import Icon from 'components/Icon'


const MenuControls = ({ 
    editor,
    isInputShown,
    setInputShown,
    selection
}) => {

    const isBold = isMarkActive(editor, 'bold', selection)
    const isItalic = isMarkActive(editor, 'italic', selection)

    // once the user focuses on the input, selection is lost
    // which leads to every isInside call returning false
    // we have either to memoize it's result
    // or modify it to accept the selection arg
    const isInsideCode = useMemo(
        () => isInside(editor, 'code-inline'), 
        [editor, selection]
    )

    return (
        <>
            <Button tooltip='toggle Bold. Ctrl + B'
                handleMouseDown={() => toggleMark(editor, 'bold', selection)}
                isActive={isBold} >
                    <b>B</b>
            </Button>

            <Button tooltip='toggle Italic. Ctrl + i'
                handleMouseDown={() => toggleMark(editor, 'italic', selection)}
                isActive={isItalic}>
                    <i>I</i>
            </Button>

            <Button tooltip='toggle Code. Ctrl + `'
                handleMouseDown={() => toggleCode(editor, selection)}
                isActive={isInsideCode} >
                    <Icon icon='code-tags' />
            </Button>

            <Button tooltip='transform into a link'
                isActive={isInputShown}
                handleMouseDown={() => setInputShown(!isInputShown)}>
                    <Icon icon='link2' />
            </Button>

            <LinkForm selection={selection} 
                isShown={isInputShown} />
        </>
    )
}

export default MenuControls;