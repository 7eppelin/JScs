import React, { useRef, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { reorderSubsections } from 'dataSlice';
import { arrayMove } from 'utils'

import Scrollbar from 'components/Scrollbar';
import FeatureMenu from './FeatureMenu';



const SubsectionMenu = ({ items, ids }) => {
    const dispatch = useDispatch();

    // swap subsections when dragging
    const moveSubsection = (current, target) => {
        const sectionID = items[0].sectionID;
        const newOrder = arrayMove(ids, current, target);
        if (ids === newOrder) return;
        dispatch(reorderSubsections({ sectionID, newOrder }));
    }

    // sort items in the id's order
    const sortedItems = ids.map(id => {
        return items.find(i => i.id === id)
    })

    // feature menus' heights vary as the user toggles open/close
    // we need to collect all menu's current heights in an array
    // this way each FeatureMenu will know the height of the prev/next item
    // so it can know when to swap positions when dragging
    const heights = useRef([])
    
    return (
        <Scrollbar>
            <Ul className='subs'>
                {sortedItems.map((item, i) => (
                    <FeatureMenu i={i}
                        heights={heights}
                        key={item.id} 
                        subsection={item}
                        moveSubsection={moveSubsection} />
                ))}
            </Ul>
        </Scrollbar>
    )
}


const Ul = styled.ul`
`;

export default SubsectionMenu;