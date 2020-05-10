import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getSubsections } from '../../dataSlice';

import Spinner from 'components/Spinner';
import Scrollbar from 'components/Scrollbar';
import FeatureMenu from './FeatureMenu';



const selectIDs = createSelector(
    state => state.data.sections.byID,
    (state, secName) => secName,

    (sections, secName) => {
        if (!secName) return []
        const secsArr = Object.values(sections)
        // if sections hasn't finished fetching yet, skip
        if (!secsArr.length) return [];

        const sec = secsArr.filter(sec => sec.name === secName)[0]
        return sec.children
    }
)

const selectAndSortSubsecs = createSelector(
    state => state.data.subsections,
    (state, secName) => selectIDs(state, secName),

    (subs, ids) => {
        // if either secs or subsecs
        // hasn't finished fetching yet, skip
        if (!ids.length || !Object.keys(subs).length) return [];

        return ids.map(id => subs[id])
    }
)


const SubsectionMenu = () => {
    let { sectionName } = useParams();
    const dispatch = useDispatch();

    // array of subsections in the right order
    const subsecs = useSelector(state => selectAndSortSubsecs(state, sectionName))

    // fetch subsections and features whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs.length) return;
        dispatch(getSubsections(sectionName));
    }, [sectionName])

    // wait for the fetching to complete
    if (!sectionName || !subsecs.length) return (
        <StyledMenu>
            <Spinner />
        </StyledMenu>
    )

    return (
        <StyledMenu>
            <Scrollbar>
                <ul className='subs'>
                    {subsecs.map(sub => (
                        <FeatureMenu key={sub.id} sub={sub} />
                    ))}
                </ul>
            </Scrollbar>
        </StyledMenu>
    )
}


const StyledMenu = styled.section`
    height: 100%;
    background: var(--gray6);
    flex-basis: 250px;
    text-align: center;
    padding: 4px;

    .subs {
        padding-right: 12px;
    }
`;

export default SubsectionMenu;