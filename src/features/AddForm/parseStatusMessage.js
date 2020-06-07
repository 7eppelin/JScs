
import React from 'react';
import { motion } from 'framer-motion'


const letter = {
    show: { opacity: 1 },
    hide: { opacity: 0 }
}

// CONTEXT:
// a status message can have 'special' words/characters
// (going to be displayed orange)
// to make a word 'special' wrap it in curly braces like this: {{word}}


// this func accepts a status message (string)
// and turns it into an array of letters each wrapped in a motion component
// normal letters are wrapped in a <motion.span>, 'special' in a <motion.b>

export default str => {
    // make an arr of characters
    const chars = Array.from(str)

    // flag
    let isSpecial = false;

    return chars.map((char, i) => {

        // set the flag to true when encounter '{{'
        // and remove the braces
        if (char === '{' && chars[i + 1] === '{') {
            isSpecial = true
            return null
        }
        if (char === '{' && chars[i - 1] === '{') return null

        // set the flag to false when encounter '}}'
        // and remove the braces
        if (char === '}' && chars[i + 1] === '}') {
            isSpecial = false
            return null
        }
        if (char === '}' && chars[i - 1] === '}') return null


        // if flag, return a 'special' element
        if (isSpecial) return (
            <motion.b key={i}
                transition={{ duration: 0.05 }}
                variants={letter}>
                    {char}
            </motion.b>
        )

        // otherwise return a 'normal' one
        return (
            <motion.span key={i}
                transition={{ duration: 0.05 }}
                variants={letter}>
                    {char}
            </motion.span>
        )
    })
}