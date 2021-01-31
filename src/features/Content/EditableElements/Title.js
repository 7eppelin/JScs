
import styled from 'styled-components/macro';


const TitleElement = ({ attributes, children }) => (
    <StyledTitle {...attributes}>
        {children}
    </StyledTitle>
)


const StyledTitle = styled.h1`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: var(--yellow);
    padding: 50px 0 35px 15%;
    background-color: var(--gray4);
    font-size: 3rem;
    text-shadow: 3px 3px 0 var(--black2);
`;

export default TitleElement;