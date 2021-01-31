
import styled from 'styled-components/macro';


const ApiTitle = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)


const Div = styled.div`
    color: var(--yellow);
    font-size: 1.6rem;
    letter-spacing: .06em;
`

export default ApiTitle