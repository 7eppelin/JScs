import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createSelector } from 'reselect';

import { getContentItem, updateContentItem } from 'dataSlice';

import AnimatedContent from './AnimatedContent'
import ContentEditor from './ContentEditor';


const selectContent = createSelector(
    state => state.data.content,
    (_, url) => url,

    (contentItems, url) => {
        const items = Object.values(contentItems);
        return items.find(item => item.url === url)
    }
)


const Content = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const url = location.pathname

    const content = useSelector(state => selectContent(state, url));

    // set document title on url change
    useEffect(() => {
        if (!content?.name) return
        document.title = `JScs | ${content.name}`
    }, [content]);

    // get content item on url change
    useEffect(() => {
        if (content) return;
        dispatch(getContentItem(url))
    }, [url, content, dispatch])

    return (
        <AnimatedContent isShown={url !== '/'}>
            <AnimatePresence exitBeforeEnter>
            {content && (
                <ContentEditor 
                    // in order to force the component to re-initialize state
                    // whenever a new content item is selected
                    // we force it to remount by assigning the key prop
                    key={content.id}
                    content={content}
                    updateContent={newValue => dispatch(updateContentItem(newValue))} />
            )}
            </AnimatePresence>
        </AnimatedContent>
    )
}

export default Content;