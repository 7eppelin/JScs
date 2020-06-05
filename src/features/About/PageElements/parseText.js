import React from 'react'

import InlineLink from './InlineLink'

// the text arg can either be a string or an array

// text = [
//     "an element can be a string which is returned untouched",
//     { 
//          type: "strong", 
//          text: "Or an object" 
//     }, { 
//          type: "link", 
//          text: "text", 
//          href: "url"
//     }
// ]


const parseText = text => {

    if (typeof text === 'string') return text

    return text.map(item => {

        if (typeof item === 'string') return item;
        
        switch (item.type) {
            case 'strong':
                return (
                    <strong key={item.text}>
                        {item.text}
                    </strong>
                )

            case 'link': 
                return <InlineLink key={item.text} 
                            text={item.text} 
                            href={item.href} />
            
            default:
                return item.text
        }
    })
}

export default parseText