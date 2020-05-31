import React from 'react';
import styled from 'styled-components/macro';

import Paragraph from './PageElements/Paragraph'

const PageContent = ({ data }) => (
    <Div>
        {data.map((item, i) => {
            switch (item.type) {
                case 'paragraph':
                    return <Paragraph key={i} text={item.content} />
                
                default: return null;
            }
        })}
    </Div>
)

const Div = styled.div`
    padding: 40px 12%;
`

export default PageContent