
import styled from 'styled-components/macro';


const StyledP = styled.p`
    padding: 12px 0;
    line-height: 1.7;
    margin: 0;
`;

const ParagraphElement = ({ attributes, children }) => (
    <StyledP {...attributes}>
        {children}
    </StyledP>
)

export default ParagraphElement;