import React from 'react'


import Title from './EditableElements/Title'
import Links from './EditableElements/Links'
import H2 from './EditableElements/H2'
import H3 from './EditableElements/H3'
import Paragraph from './EditableElements/Paragraph'
import Ul from './EditableElements/Ul'
import Li from './EditableElements/Li'
import Link from './EditableElements/Link'
import InlineCode from './EditableElements/InlineCode'
import Code from './EditableElements/Code'



const renderElement = props => {
    switch (props.element.type) {
        case 'title':
            return <Title {...props} />

        case 'links':
            return <Links {...props} />
        
        case 'h2':
            return <H2 {...props} />
        
        case 'h3':
            return <H3 {...props} />
        
        case 'paragraph':
            return <Paragraph {...props} />
        
        case 'ul':
            return <Ul {...props} />

        case 'li':
            return <Li {...props} />

        case 'link':
            return <Link {...props} />

        case 'code-block':
            return <Code {...props} />

        case 'code-inline':
            return <InlineCode {...props} />

        default:
            return <p {...props.attributes}>{props.children}</p>
    }
}

export default renderElement