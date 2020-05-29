import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom';

import useSections from './useSections'

import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsectionMenu from 'features/SubsectionMenu/SubsectionMenu';


const Nav = () => {
    const { params, url } = useRouteMatch('/:secName?/:subsecName?/:featureName?')
    const isAdmin = useSelector(state => state.user?.isAdmin)

    // arr of sections and a function to reorder onDrag
    const [ sections, reorderSections ] = useSections()

    const animate = url === '/' ? 'about' : 'content'

    return (
        <StyledNav variants={variants}
            initial={false}
            animate={animate}>

            <SectionMenu 
                isAdmin={isAdmin}
                sections={sections} 
                reorderSections={reorderSections} />

            <SubsectionMenu 
                isAdmin={isAdmin}
                sectionName={params.secName} />

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
        scaleY: 0.95,
        transition
    }
}

export default Nav;