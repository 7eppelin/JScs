import React from 'react';
import styled from 'styled-components/macro';

import content from './content.js'
import Page from './Page'

const Pages = () => {
    return (
        <Div>
            {content.map(item => (
                <Page 
                    key={item.title}
                    content={item} />
            ))}
        </Div>
    )
}

const Div = styled.div``

export default Pages