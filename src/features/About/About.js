import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'


const About = () => {
    return (
        <Section>
            THIS IS THE FRONT PAGE OF THE APP
        </Section>
    )
}

const Section = styled(motion.section)`
    background: var(--gray6);
    flex-basis: 600;
    flex-grow: 1;
    margin: 0 30px;
    box-shadow: 0 0 30px -5px black;
    border-radius: 5px;
`

export default About