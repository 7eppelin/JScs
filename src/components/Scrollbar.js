import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

// const Thumb = styled.div`
//     width: 2px !important;
//     background-color: var(--brown);
// `;

const Scrollbar = ({ children }) => (
    <Scrollbars
        autoHide
        autoHideDuration={200}
    >
        {children}
    </Scrollbars>
)

export default Scrollbar;