import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { usePrevious } from 'utils'
import useSections from './useSections'

import Spinner from 'components/Spinner'
import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsectionMenu from 'features/SubsectionMenu/SubsectionMenu';


const Nav = ({ activeSection }) => {
    const isAdmin = useSelector(state => state.user?.isAdmin)

    // arr of sections and a function to reorder onDrag
    const [ sections, reorderSections ] = useSections()

    const prevSection = usePrevious(activeSection)

    const animate = activeSection ? 'content' : 'about'

    return (
        <StyledNav variants={variants}
            initial={false}
            animate={animate}>

            {/* 
                only render spinner in the nav when:
                1. sections haven't been fetched yet
                and
                2. this is the initial render of the app
                3. the content section is being rendered
            */}
            {!sections && (activeSection || prevSection) ? 
                <Spinner />
                :
                <>
                    <SectionMenu 
                        isAdmin={isAdmin}
                        prevSection={prevSection}
                        sections={sections} 
                        reorderSections={reorderSections} />

                    <SubsectionMenu 
                        isAdmin={isAdmin}
                        sectionName={activeSection} />
                </>
            }

        </StyledNav>
    )
}


const StyledNav = styled(motion.nav)`
    position: absolute;
    box-shadow: 0 0 30px -5px black;
    background: var(--gray6);
    width: 32vw;
    height: calc(100% - 50px);
    top: 25px;
    margin-right: 30px;
    display: flex;
`;

const transition = {
    left: {
        delay: 0.48,
        type: 'spring',
        stiffness: 110,
        damping: 14,
        mass: 0.9,
    }
}

const variants = {
    content: {
        left: '0vw',
        scaleY: 1,
        transition
    },
    about: {
        left: '86vw',
        scaleY: 0.9,
        transition
    }
}

export default Nav;