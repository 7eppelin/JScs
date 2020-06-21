import React from 'react';

import InlineLink from 'components/InlineLink'


const LinkElement = ({ element, attributes, children }) => (
    <InlineLink href={element.href} {...attributes}>
        {children}
    </InlineLink>
)

export default LinkElement