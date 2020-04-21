import React from 'react';
import styled from 'styled-components/macro';


const StyledFooter = styled.footer`
    background-color: var(--gray5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45px;
    text-align: center;
    padding-top: 10px;
    box-shadow: 0 0 12px -1px var(--black);
`;


const Footer = () => (
    <StyledFooter>Footer</StyledFooter>
)

export default Footer;