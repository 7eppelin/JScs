import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'

import { fetchContentItem, updateContentItem } from 'dataSlice';
import selectContent from './selectContent';

import AnimatedContentEditor from './AnimatedContentEditor'
import ContentEditor from './ContentEditor';


// fetches the content item on url change
// sets the document's title on url change
// renders the ContentEditor inside the AnimatedContentEditor

const ContentEditorWrapper = ({ delayAnimation }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const path = location.pathname

    const content = useSelector(state => selectContent(state, path));

    // fetch content item on url change
    useEffect(() => {
        if (content) return;
        dispatch(fetchContentItem(path))
    }, [path, content, dispatch])

    // set the document title on url change
    useEffect(() => {
        if (!content?.name) return
        document.title = `JScs | ${content.name}`
    }, [content]);

    return (
        <AnimatedContentEditor 
            id={content?.id} 
            delayAnimation={delayAnimation}>
            
            {content && (
                <ContentEditor
                    content={content}
                    updateContent={newValue => dispatch(updateContentItem(newValue))} />
            )}
        </AnimatedContentEditor>
    )
}


export default ContentEditorWrapper