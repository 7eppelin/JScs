
import styled from 'styled-components/macro';


const StyledH3 = styled.h3`
    color: var(--white1);
    text-shadow: 2px 2px 1px var(--black2);
    font-size: 1.8rem;
    padding: 30px 0 16px;
`;

const H3Element = ({ attributes, children }) => (
    <StyledH3 {...attributes}>
        {children}
    </StyledH3>
)

export default H3Element;