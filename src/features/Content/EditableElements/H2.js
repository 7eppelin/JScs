
import styled from 'styled-components/macro';


const StyledH2 = styled.h2`
    color: var(--white1);
    text-shadow: 2px 2px 1px var(--black2);
    font-size: 2.2rem;
    padding: 32px 0 18px;
`;
const H2Element = ({ attributes, children }) => (
    <StyledH2 {...attributes}>
        {children}   
    </StyledH2>
)

export default H2Element;