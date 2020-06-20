import React, { useRef, useCallback } from 'react';

import { updateItemsOrderInDB } from 'utils';

import AnimatedSectionMenu from './AnimatedSectionMenu'
import SectionLink from './SectionLink';


const SectionMenu = ({ 
    isAdmin, 
    prevSection,
    sections, 
    reorderSections 
}) => {
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
                    i={i}
                    scrollbar={scrollbar}
                    updateDB={updateDB}
                    moveItem={reorderSections} />
            ))}
        </AnimatedSectionMenu>
    )
}

export default SectionMenu;