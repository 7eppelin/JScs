import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { reorderSubsections } from 'dataSlice';
import { arrayMove, updateSubsectionsOrderInDB } from 'utils'

import FeatureMenu from './FeatureMenu';



const SubsectionMenu = ({ items, ids, isAdmin }) => {
    const dispatch = useDispatch();
    const scrollbar = useRef();

    // swap subsections when dragging
    const moveSubsection = (current, target) => {
        const sectionID = items[0].sectionID;
        const newOrder = arrayMove(ids, current, target);
        if (ids === newOrder) return;
        dispatch(reorderSubsections({ sectionID, newOrder }));
    }

    // update DB onDragEnd (subsections)
    const updateOrderInDB = () => {
        if (isAdmin) updateSubsectionsOrderInDB(items[0].sectionID, ids)
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
        <Ul className='scrollbar'
            ref={scrollbar}>

            {sortedItems.map((item, i) => (
                <FeatureMenu i={i}
                    heights={heights}
                    key={item.id} 
                    subsection={item}
                    moveSubsection={moveSubsection}
                    scrollbar={scrollbar}
                    updateOrderInDB={updateOrderInDB} />
            ))}
        </Ul>
    )
}


const Ul = styled.ul`
`;

export default SubsectionMenu;