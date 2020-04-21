import React from 'react';
import styled from 'styled-components/macro';

import EditorToolbar from './EditorToolbar';
import EditorControls from './EditorControls';


const StyledFooter = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--gray6);
`;

const FooterContents = styled.div`
    padding: 20px;
    padding-left: 40px;

    .edited {
        margin-top: 18px;
        color: var(--gray3);
        font-size: 1.2rem;
    }
`;

const EditorFooter = ({ 
    isToolbarOpen,
    toggleToolbar,
    saveChanges, 
    edited 
}) => (
        <StyledFooter>
            <EditorToolbar isOpen={isToolbarOpen} />

            <FooterContents>

                <EditorControls isToolbarOpen={isToolbarOpen}
                    toggleToolbar={toggleToolbar}
                    saveChanges={saveChanges} />

                <div className='edited'>
                    Edited: {new Date(edited).toLocaleDateString()}
                </div>
            </FooterContents>
        </StyledFooter>
)

export default EditorFooter;