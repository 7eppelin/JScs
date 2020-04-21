
import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

import svg from 'assets/react-firebase.svg';


const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
`;


const StyledImg = styled.img`
    margin: 0 auto;
    position: relative;
    display: block;
    top: 40%;
    animation: ${rotate} 1.8s ease-in-out infinite;
`;

const Spinner = ({ size = 120 }) => (
    <StyledImg src={svg} 
            alt="spinner"
            width={`${size}px`}
            height={`${size}px`} 
    />
)


export default Spinner;