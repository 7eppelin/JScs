import React, { useState } from 'react';
import styled from 'styled-components/macro';

import AddFormToggler from './AddFormToggler.js';
import AnimateAddForm from './AnimateAddForm.js';


const StyledContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 45px;
`;

const AddFormContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledContainer>
            <AddFormToggler toggle={setIsOpen} isToggled={isOpen} />
            <AnimateAddForm isOpen={isOpen} hide={() => setIsOpen(false)} />
        </StyledContainer>
    )
};

export default AddFormContainer;