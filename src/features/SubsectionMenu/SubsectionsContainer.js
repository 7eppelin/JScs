import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getSubsections } from '../../dataSlice';

import SubsectionMenu from './SubsectionMenu'
import Spinner from 'components/Spinner'


// returns an array of subsections
const selectSubsections = createSelector(
    state => state.data.subsections,
    (state, secName) => secName,

    (subs, secName) => {
        const subsArr = Object.values(subs)
            .filter(sub => sub.sectionName === secName)
        
        return subsArr
    }
)

// returns section.children - an array of subsections' ids
const selectIDs = createSelector(
    state => state.data.sections.byID,
    (state, secName) => secName,

    (sections, secName) => {
        const secsArr = Object.values(sections)
        // if sections hasn't finished fetching yet, skip
        if (!secName || !secsArr.length) return []

        const sec = secsArr.filter(sec => sec.name === secName)[0]
        if (!sec) return []
        return sec.children
    }
)


const SubsectionsContainer = () => {
    let { sectionName } = useParams();
    const dispatch = useDispatch();

    const isAdmin = useSelector(state => state.user?.isAdmin)

    // array of subsections
    const subsecs = useSelector(state => selectSubsections(state, sectionName))

    // array of subsec's ids in the right order
    const ids = useSelector(state => selectIDs(state, sectionName))

    // fetch subsections and features whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs.length) return;
        dispatch(getSubsections(sectionName));
    }, [sectionName])


    return (
        <StyledMenu>
            {!sectionName || !subsecs.length ? 
                <Spinner /> 
                : 
                <SubsectionMenu 
                    isAdmin={isAdmin}
                    items={subsecs} 
                    ids={ids} />
            }
        </StyledMenu>
    )
}


const StyledMenu = styled.section`
    height: 100%;
    background: var(--gray6);
    flex-basis: 250px;
    text-align: center;
    padding: 7px;
`;


export default SubsectionsContainer;