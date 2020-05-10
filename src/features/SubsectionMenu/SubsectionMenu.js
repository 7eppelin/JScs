import React from 'react';
import styled from 'styled-components/macro';

import Scrollbar from 'components/Scrollbar';
import FeatureMenu from './FeatureMenu';



const SubsectionMenu = ({ subs }) => {

    return (
        <Scrollbar>
            <Ul className='subs'>
                {subs.map(sub => (
                    <FeatureMenu key={sub.id} sub={sub} />
                ))}
            </Ul>
        </Scrollbar>
    )
}


const Ul = styled.ul`
    padding-right: 12px;
`;

export default SubsectionMenu;