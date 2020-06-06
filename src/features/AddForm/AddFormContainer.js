import React, { useState } from 'react';
import styled from 'styled-components/macro';

import AddFormToggler from './AddFormToggler.js';
import AnimateAddForm from './AnimateAddForm.js';


const AddFormContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Container>
            <AddFormToggler toggle={setIsOpen} isToggled={isOpen} />
            <AnimateAddForm isOpen={isOpen} hide={() => setIsOpen(false)} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 45px;
`;

export default AddFormContainer;