import React from 'react';
import { useSelector } from 'react-redux'

import { usePrevious } from 'utils'
import useSections from './useSections'

import AnimatedNav from './AnimatedNav'
import Spinner from 'components/Spinner'
import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsecsMenu from 'features/SubsecsMenu/SubsecsMenu';


const Nav = ({ activeSection, delayAnimation }) => {
    const isAdmin = useSelector(state => state.user?.isAdmin)

    // arr of sections and a func to reorder onDrag
    const [ sections, reorderSections ] = useSections()

    const prevSection = usePrevious(activeSection)

    return (
        <AnimatedNav activeSection={activeSection}>
            {/* 
                only render spinner in the nav when:
                1. this is the initial render of the app
                2. sections haven't been fetched yet
                3. the content section is being rendered
            */}
            {!sections.length && (activeSection || prevSection) ? 
                <Spinner />
                :
                <>
                    <SectionMenu 
                        isAdmin={isAdmin}
                        prevSection={prevSection}
                        sections={sections} 
                        reorderSections={reorderSections} />

                    <SubsecsMenu 
                        isAdmin={isAdmin}
                        sectionName={activeSection}
                        delayAnimation={delayAnimation} />
                </>
            }
        </AnimatedNav>
    )
}

export default Nav;