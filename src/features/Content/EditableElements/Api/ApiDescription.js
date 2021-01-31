
import styled from 'styled-components/macro';

const ApiDescription = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)

const Div = styled.div`
    font-size: 1.4rem;
    margin: 8px 12px 0;
`

export default ApiDescription