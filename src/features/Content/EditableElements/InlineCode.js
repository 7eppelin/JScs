import React from 'react';
import styled from 'styled-components/macro';


const InlineCode = ({ attributes, children }) => (
    <code className='language-js' {...attributes}>
        {children}
    </code>
)


export default InlineCode