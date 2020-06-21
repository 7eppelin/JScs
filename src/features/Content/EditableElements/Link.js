import React from 'react';

import InlineLink from 'components/InlineLink'


const LinkElement = ({ element, attributes, children }) => (
    <span {...attributes}>
        <InlineLink href={element.href}>
            {children}
        </InlineLink>
    </span>
)

export default LinkElement