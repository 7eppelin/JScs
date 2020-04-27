import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

// the lib is no longer being maintained
// probably should find some other solution
// however, so far it works just fine.
// https://github.com/malte-wessel/react-custom-scrollbars

const Scrollbar = ({ children }) => (
    <Scrollbars
        autoHide
        autoHideTimeout={2000}
        autoHideDuration={400}
    >
        {children}
    </Scrollbars>
)

export default Scrollbar;