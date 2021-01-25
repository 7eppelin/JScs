
import styled from 'styled-components/macro';


const StyledUl = styled.ul`
    padding: 15px 0 10px;
    font-size: 1.4rem;
`;

const Ul = ({ attributes, children }) => (
    <StyledUl {...attributes}>
        {children}
    </StyledUl>
);

export default Ul;