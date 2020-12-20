import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { reorderSections } from 'dataSlice';
import { updateItemsOrderInDB } from 'utils';

import AnimatedSectionMenu from './AnimatedSectionMenu'
import SectionLink from './SectionLink';


const SectionMenu = ({ 
    isAdmin, 
    prevSection,
    sections, 
}) => {
    const dispatch = useDispatch()
    const scrollbar = useRef()

    // invoked onDragEnd
    const updateDB = useCallback(() => {
        if (!isAdmin) return
        const ids = sections.map(sec => sec.id)
        updateItemsOrderInDB('sections', ids)
    }, [isAdmin, sections])

    return (
        <AnimatedSectionMenu
            showSpinner={!sections.length && !prevSection}
            scrollbarRef={scrollbar} >

            {sections.map((sec, i) => (
                <SectionLink key={sec.id} 
                    label={sec.name}
                    scrollbar={scrollbar}
                    updateDB={updateDB}
                    handleDrag={moved => {    
                        // if a section was moved down and is not the last section
                        if (moved > 30 && i + 1 < sections.length) {
                            dispatch(reorderSections({
                                current: i,
                                target: i + 1
                            }));
                        }
                        // if a section was moved up and is not the first section
                        if (moved < -30 && i !== 0) {
                            dispatch(reorderSections({
                                current: i,
                                target: i - 1
                            }));
                        }
                    }} />
            ))}
        </AnimatedSectionMenu>
    )
}

export default SectionMenu;