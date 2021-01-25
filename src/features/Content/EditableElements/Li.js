
import styled from 'styled-components/macro';


const StyledLi = styled.li`
    list-style: inside;
    padding: 4px 0;
`

const Li = ({ attributes, children }) => (
    <StyledLi {...attributes}>
        {children}
    </StyledLi>
)

export default Li