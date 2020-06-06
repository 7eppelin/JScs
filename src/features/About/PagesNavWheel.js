import React, { useState, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'

import Icon from 'components/Icon'


const PagesNavWheel = React.forwardRef((props, ref) => {

    const [count, setCount] = useState(0)

    const wheelRef = useRef()

    // see ./AnimatedPage & ./useHandleWheel
    useImperativeHandle(ref, () => ({
        spin: count => setCount(count) 
    }))

    return (
        <Div ref={wheelRef}
            initial={false}
            animate={{ 
                opacity: 0 + count / 10,
                scale: count / 12 + 1, 
                rotate: count * 30 }}>

            <Icon icon='cog' />
        </Div>
    )
})


const Div = styled(motion.div)`
    position: absolute;
    top: -45px;
    right: 1px;
    font-size: 1.3rem;

    svg { vertical-align: middle }
    path { fill: var(--white) }
`

export default PagesNavWheel