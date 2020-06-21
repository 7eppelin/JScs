import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'


const InlineLink = ({ href, children }) => (
    <Tooltip tip={href} offset={10}>
        <Link href={href} alt={href} target='_blank'>
            {children}
            <Icon icon='away' size='0.9em' />
        </Link>
    </Tooltip>
)


const Link = styled.a`
    && {
        color: var(--orange1);
        position: relative;
        display: inline-block;
        white-space: no-wrap;
        transition: .2s;
        margin: 0 .4em;
    }

    svg {
        margin-top: -2px;
        vertical-align: middle;
    }

    path {
        fill: var(--orange1)
    }

    &:after {
        content: '';
        position: absolute;
        height: 1px;
        background: var(--orange2);
        bottom: 2px;
        left: 18%;
        right: 22%;
        transition: .2s;
    }

    &:hover:after {
        bottom: 0px;
        left: 5%;
        right: 9%;
    }
`

export default InlineLink