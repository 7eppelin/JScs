import React from 'react';
import styled from 'styled-components/macro';

import Nav from 'features/Nav/Nav';
import Content from 'features/Content/Content';


// height = 100% - header height - footer height
const StyledMain = styled.main`
    height: calc(100% - 80px - 45px);
    display: flex;
    padding: 20px 0;
`;


const Main = () => (
    <StyledMain>
        <Nav />
        <Content />
    </StyledMain>
)

export default Main;