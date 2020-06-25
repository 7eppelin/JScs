import React from 'react'

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
}) => (
    <>
        <Button tooltip='toggle Bold. Ctrl + B'
            handleMouseDown={() => toggleMark(editor, 'bold', selection)}
            isActive={isMarkActive(editor, 'bold', selection)} >
                <b>B</b>
        </Button>

        <Button tooltip='toggle Italic. Ctrl + i'
            handleMouseDown={() => toggleMark(editor, 'italic', selection)}
            isActive={isMarkActive(editor, 'italic', selection)}>
                <i>I</i>
        </Button>

        <Button tooltip='toggle Code. Ctrl + `'
            handleMouseDown={() => toggleCode(editor, selection)}
            isActive={isInside(editor, ['code-inline'])} >
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

export default MenuControls;