import React from 'react';


import TitleElement from './EditableElements/TitleElement';
import LinksElement from './EditableElements/LinksElement';
import H2Element from './EditableElements/H2Element';
import H3Element from './EditableElements/H3Element';
import ParagraphElement from './EditableElements/ParagraphElement';
import UlElement from './EditableElements/UlElement';
import CodeElement from './EditableElements/CodeElement';



const renderElement = props => {
    switch (props.element.type) {
        case 'title':
            return <TitleElement {...props} />

        case 'links':
            return <LinksElement {...props} />;
        
        case 'h2':
            return <H2Element {...props} />
        
        case 'h3':
            return <H3Element {...props} />
        
        case 'paragraph':
            return <ParagraphElement {...props} />
        
        case 'ul':
            return <UlElement {...props} />

        case 'code-block':
            return <CodeElement {...props} />

        default:
            return <p {...props.attributes}>{props.children}</p>
    }
}

export default renderElement;