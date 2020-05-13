import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { createSelector } from 'reselect';

import { getContentItem, updateContentItem } from '../../dataSlice/dataSlice';

import ContentEditor from './ContentEditor';


const StyledContent = styled.section`
    flex-basis: 600px;
    flex-grow: 1;
    background: var(--gray6);
    box-shadow: 0 0 12px 0px var(--black);
    height: 100%;
`;


const selectContent = createSelector(
    state => state.data.content,
    (_, url) => url,

    (contentItems, url) => {
        const items = Object.values(contentItems);
        return items.find(item => item.url === url)
    }
)


const Content = () => {
    const dispatch = useDispatch();
    const { url, params } = useRouteMatch('/:secName?/:subsecName?/:featureName?');
    const { secName, subsecName, featureName } = params;
    const name = featureName ? featureName :
                subsecName ? subsecName :
                secName ? secName : 'JavaScript';

    const content = useSelector(state => selectContent(state, url));

    useEffect(() => {
        document.title = `JScs | ${name}`
    }, [name]);

    useEffect(() => {
        if (content) return;
        dispatch(getContentItem(url))
    }, [url, content])

    return (
        <StyledContent>
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
        </StyledContent>
    )
}

export default Content;