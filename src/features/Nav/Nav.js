import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'
import { Route, useRouteMatch } from 'react-router-dom';

import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsectionsContainer from 'features/SubsectionMenu/SubsectionsContainer';


const Nav = () => {
    const { params, url } = useRouteMatch('/:secName?/:subsecName?/:featureName?')

    const animate = url === '/' ? 'about' : 'content'
    console.log(animate)

    return (
        <StyledNav variants={variants}
            initial={false}
            animate={animate}>

            <SectionMenu />
            <Route path='/:sectionName?/:subsecName?/:featureName?'>
                <SubsectionsContainer />
            </Route>

        </StyledNav>
    )
}


const StyledNav = styled(motion.nav)`
    position: absolute;
    box-shadow: 0 0 30px -5px black;
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