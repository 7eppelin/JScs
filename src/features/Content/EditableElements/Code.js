
import styled from 'styled-components/macro';


const Pre = styled.pre`
    border-radius: 3px;
    padding: 20px;
    font-size: 1.4rem;
`;

const CodeElement = ({ attributes, children }) => (
    <Pre 
        className='language-js scrollbar' 
        {...attributes}>

        <code>
            {children}
        </code>
    </Pre>
)

export default CodeElement;