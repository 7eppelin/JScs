
import styled from 'styled-components/macro';


const ApiTitle = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)


const Div = styled.div`
    color: var(--yellow);
    font-size: 1.65rem;
    letter-spacing: .1em;
`

export default ApiTitle