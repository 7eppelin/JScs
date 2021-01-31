
import styled from 'styled-components/macro';


const Api = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)


const Div = styled.div`
    margin: 25px 0 10px;
`

export default Api