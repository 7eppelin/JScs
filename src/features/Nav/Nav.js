import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSections } from 'dataSlice';
import { usePrevious } from 'utils'

import AnimatedNav from './AnimatedNav'
import Spinner from 'components/Spinner'
import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsecsMenu from 'features/SubsecsMenu/SubsecsMenu';


const Nav = ({ activeSection, delayAnimation }) => {
    const isAdmin = useSelector(state => state.user?.isAdmin)
    const dispatch = useDispatch()

    // fetch sections once
    useEffect(() => {
        dispatch(fetchSections())
    }, [dispatch])        

    const sections = useSelector(state => state.data.sections)
    const prevSection = usePrevious(activeSection)

    return (
        <AnimatedNav activeSection={activeSection}>
            {/* 
                only render spinner in the nav when:
                1. this is the initial render of the app
                2. the content section is being rendered
                3. sections haven't been fetched yet
            */}
            {!sections.length && (activeSection || prevSection) ? 
                <Spinner />
                :
                <>
                    <SectionMenu 
                        isAdmin={isAdmin}
                        prevSection={prevSection}
                        sections={sections} />

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