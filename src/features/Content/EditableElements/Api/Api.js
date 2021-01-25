
import styled from 'styled-components/macro';


const Api = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)


const Div = styled.div`
    margin-top: 25px;
`

export default Api