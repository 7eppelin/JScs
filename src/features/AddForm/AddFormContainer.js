import React, { useState } from 'react';
import styled from 'styled-components/macro';


import AddFormToggler from './AddFormToggler.js';
import AnimatedAddForm from './AnimatedAddForm.js';

const AddForm = React.lazy(() => import('./AddForm'))


const AddFormContainer = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Container>
            <AddFormToggler toggle={setOpen} isToggled={isOpen} />
            <AnimatedAddForm isOpen={isOpen}
                hide={() => setOpen(false)} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 45px;
`;

export default AddFormContainer;