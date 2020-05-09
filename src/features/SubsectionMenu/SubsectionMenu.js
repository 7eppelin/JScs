import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { getSubsections } from '../../dataSlice';

import Spinner from 'components/Spinner';
import Scrollbar from 'components/Scrollbar';
import FeatureMenu from './FeatureMenu';


const selectSubsections = createSelector(
    state => state.data.subsections,
    (_, secName) => secName,
    (subs, secName) => {
        if (!secName) return [];
        const subsArr = Object.values(subs)
        return subsArr.filter(sub => sub.sectionName === secName)
    }
)

const selectIDs = createSelector(
    state => state.data.sections.byID,
    (_, secName) => secName,
    (sections, secName) => {
        if (!secName) return [];
        const secsArr = Object.values(sections);
        const sec = secsArr.filter(sec => sec.name === secName)[0];
        return sec.children;
    }
    
)


const SubsectionMenu = () => {
    let { sectionName } = useParams();
    const dispatch = useDispatch();

    // array of subsections
    const subsecs = useSelector(state => selectSubsections(state, sectionName))

    // array of subsections' ids to render the subsecs in the correct order
    const ids = useSelector(state => selectIDs(state, sectionName))

    useEffect(() => {
        // if subsections were fetched before, return
        if (!sectionName || subsecs.length) return;
        dispatch(getSubsections(sectionName));
    }, [sectionName])

    if (!sectionName || !subsecs.length) return (
        <StyledMenu>
            <Spinner />
        </StyledMenu>
    )

    return (
        <StyledMenu>
            <Scrollbar>
                <ul className='subs'>
                    {ids.map(id => (
                        <FeatureMenu key={id} sub={subsecs[id]} />
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