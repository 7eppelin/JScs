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
    state => state.data.subsections.byID,
    (_, sectionName) => sectionName,
    (subs, sectionName) => {
        const subsArr = Object.values(subs)
        return subsArr.filter(sub => sub.sectionName === sectionName)
    }
)


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


const SubsectionMenu = () => {
    let { sectionName } = useParams();
    sectionName = sectionName || 'JavaScript';
    const dispatch = useDispatch();

    const subsections = useSelector(state => selectSubsections(state, sectionName))

    useEffect(() => {
        // if subsections were fetched before, return
        if (subsections.length) return;
        dispatch(getSubsections(sectionName));
    }, [sectionName])

    if (!subsections.length) return (
        <StyledMenu>
            <Spinner />
        </StyledMenu>
    )

    return (
        <StyledMenu>
            <Scrollbar>
                <ul className='subs'>
                    {subsections.map(sub => (
                        <FeatureMenu key={sub.id} sub={sub} />
                    ))}
                </ul>
            </Scrollbar>
        </StyledMenu>
    )
}

export default SubsectionMenu;