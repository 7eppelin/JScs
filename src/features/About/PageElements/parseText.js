import React from 'react'

import InlineLink from './InlineLink'
import Tooltip from 'components/Tooltip'



// the text arg can either be a string or an array

// text = [
//     "an element can be a string which is returned untouched",
//     { 
//          type: "strong", 
//          text: "Or an object" 
//     }, { 
//          type: "tooltip", 
//          text: "text to display a tooltip over", 
//          tip: "tooltip text"
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
            
            case 'tooltip':
                return (
                    <Tooltip tip={item.tip} offset={10}>
                        <span className='tip'>
                            {item.text}
                        </span>
                    </Tooltip>
                )
            
            default:
                return item.text
        }
    })
}

export default parseText