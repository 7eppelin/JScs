import React, { useCallback } from 'react';
import { useSlate } from 'slate-react';

import { Editor } from 'features/Content/editor';
import HoveringButton from './HoveringButton';
import HoveringMenuInput from '../HoveringMenu/HoveringMenuInput';


const HoveringMenuControls = ({ 
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

            <HoveringButton 
                isActive={Editor.isMarkActive(editor, 'bold')}
                tooltip='toggle Bold. Ctrl + B'
                onClick={() => Editor.toggleMark(editor, 'bold')} >
                    <b>B</b>
            </HoveringButton>

            <HoveringButton 
                isActive={Editor.isMarkActive(editor, 'italic')}
                tooltip='toggle Italic. Ctrl + i'
                onClick={() => Editor.toggleMark(editor, 'italic')}>
                    <i>I</i>
            </HoveringButton>

            <HoveringButton 
                isActive={Editor.isMarkActive(editor, 'code')}
                tooltip='toggle Code. Ctrl + `'
                onClick={() => Editor.toggleMark(editor, 'code')} >
                    {`</>`}
            </HoveringButton>

            <HoveringButton
                isActive={inputType === 'link'}
                tooltip='transform into a link'
                onClick={() => {
                    inputType === 'link' ? setInputType(null) : setInputType('link')
                }}>
                    <i className="fas fa-link"></i>
            </HoveringButton>

            <HoveringButton 
                isActive={inputType === 'tooltip'}
                tooltip='add a tooltip'
                onClick={() => {
                    inputType === 'tooltip' ? setInputType(null) : setInputType('tooltip');
                }}>
                    <i className="far fa-comment-alt"></i>
            </HoveringButton>

            <HoveringMenuInput 
                submit={onInputSubmit}
                inputRef={inputRef} 
                inputType={inputType}
                placeholder={inputPlaceholder} />
        </div>
    )
}

export default HoveringMenuControls;