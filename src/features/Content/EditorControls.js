import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip';

const StyledControls = styled.div`

    .toggle-btn {
        font-size: 2.6rem;
        width: 40px;
        height: 40px;
        color: var(--gray1);
        border-radius: 5px;
        background: transparent;
        margin-right: 40px;
        transition: .2s;
    }

    .toggle-btn:hover {
        transform: scale(1.15);
    }

    .toggle-btn i {
        transform: rotate(0deg);
        transition: .2s ease-in-out;
    }

    .toggle-btn i.active {
        transform: rotate(180deg) translateY(-2px);
    }

    .control-btn {
        text-align: center;
        font-size: 2.5rem;
        color: var(--orange1);
        background-color: transparent;
        margin-right: 30px;
    }

    .control-btn:hover i {
        color: var(--orange3);
    }

    .control-btn:active {
        transform: scale(.96);
    }

    button, i { transition: .15s }
    button:focus { outline: none }
`;


const EditorControls = ({ 
    isToolbarOpen,
    toggleToolbar, 
    saveChanges, 
}) => (
    <StyledControls>
        <button className='toggle-btn'
            onClick={toggleToolbar}>
            <i className={`fas fa-angle-up ${isToolbarOpen ? 'active' : ''}`} />
        </button>

        <Tooltip tip="Save changes">
            <button className='control-btn' 
                onClick={saveChanges}>
                <i className="far fa-save" />
            </button>
        </Tooltip>

    </StyledControls>
)

export default EditorControls;