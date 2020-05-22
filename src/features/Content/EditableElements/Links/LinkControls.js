import React from 'react';
import styled from 'styled-components/macro'

import Icon from 'components/Icon'

const LinkControls = ({ editLink, deleteLink }) => (
    <Div>
        <button onClick={editLink}>
            <Icon icon='pen'
                size='1.35em' />
        </button>

        <button className='close' 
            onClick={deleteLink}>
            <Icon icon='close'
                size='1.35em' />
        </button>
    </Div>
)

const Div = styled.div`
    position: absolute;
    right: 3px;
    top: 1px;
    opacity: 0;
    transform: scale(.75);
    transition: .45s;

    button:focus { outline: none }
    button:first-child { margin-right: 4px }

    path {
        fill: var(--gray2);
    }

    button:hover path {
        fill: var(--white);
    }
`


export default LinkControls