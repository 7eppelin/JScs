import React from 'react';
import styled from 'styled-components/macro'

import Icon from 'components/Icon'

const LinkControls = ({ editLink, deleteLink }) => (
    <Div>
        <button onClick={editLink}>
            <Icon icon='pen'
                size='1.25em' />
        </button>

        <button className='close' 
            onClick={deleteLink}>
            <Icon icon='close'
                size='1.25em' />
        </button>
    </Div>
)

const Div = styled.div`
    display: inline-block;
    margin-left: 5px;
    opacity: 0;
    transition: .45s;

    button:focus { outline: none }
    button:first-child { margin-right: 4px }

    path {
        transition: .4s;
        fill: var(--white2);
    }

    button:hover path {
        fill: var(--white1);
    }
`


export default LinkControls