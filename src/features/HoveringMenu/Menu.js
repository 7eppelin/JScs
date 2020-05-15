import React, { useCallback } from 'react';
import { useSlate } from 'slate-react';

import { Editor } from 'features/Content/editor';
import Button from './Button';
import Input from './Input';


const Menu = ({ 
    inputRef, 
    inputType, 
    setInputType,
    selection
}) => {
    const editor = useSlate();
    const inputPlaceholder = inputType === 'link' ? 'link URL...' :
        inputType === 'tooltip' ? 'tooltip text...' : '' 

    const onInputSubmit = useCallback(() => {
        const val = inputRef.current.value;
        if (inputType === 'link') Editor.linkify(editor, val, selection);
        if (inputType === 'tooltip') Editor.tooltipify(editor, val, selection);
    }, [inputRef, inputType]);

    return (
        <div>

            <Button 
                isActive={Editor.isMarkActive(editor, 'bold')}
                tooltip='toggle Bold. Ctrl + B'
                handleClick={() => Editor.toggleMark(editor, 'bold')} >
                    <b>B</b>
            </Button>

            <Button 
                isActive={Editor.isMarkActive(editor, 'italic')}
                tooltip='toggle Italic. Ctrl + i'
                handleClick={() => Editor.toggleMark(editor, 'italic')}>
                    <i>I</i>
            </Button>

            <Button 
                isActive={Editor.isMarkActive(editor, 'code')}
                tooltip='toggle Code. Ctrl + `'
                handleClick={() => Editor.toggleMark(editor, 'code')} >
                    {`</>`}
            </Button>

            <Button
                isActive={inputType === 'link'}
                tooltip='transform into a link'
                handleClick={() => {
                    inputType === 'link' ? setInputType(null) : setInputType('link')
                }}>
                    <i className="fas fa-link" />
            </Button>

            <Button 
                isActive={inputType === 'tooltip'}
                tooltip='add a tooltip'
                handleClick={() => {
                    inputType === 'tooltip' ? setInputType(null) : setInputType('tooltip');
                }}>
                    <i className="far fa-comment-alt" />
            </Button>

            <Input 
                submit={onInputSubmit}
                inputRef={inputRef} 
                inputType={inputType}
                placeholder={inputPlaceholder} />
        </div>
    )
}

export default Menu;