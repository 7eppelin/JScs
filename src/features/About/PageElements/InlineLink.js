import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'

const InlineLink = ({ text, href }) => (
    <Tooltip tip={href} offset={10}>
        <Link href={href} alt={href} target='_blank'>
            {text}
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
    }

    svg {
        margin: -3px 2px 0;
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

const StyledIcon = styled(Icon)`
    svg {
        margin: 2px;
        margin-top: -1px;
    }

    path: {
        fill: var(--orange1) !important
    }
`

export default InlineLink