
import React from 'react';
import { motion } from 'framer-motion'

// motion variants
const transition = { duration: 0 }

const letter = {
    show: { opacity: 1, transition },
    hide: { opacity: 0, transition }
}


// CONTEXT:
// The status message can have 'special' words/characters
// the 'highlighted' ones (orange) and the 'red' ones
// to make a text range 'highlighted' 
// wrap it in curly braces like this: {{text}}
// to make it 'red' wrap it in '!!' like this: !!text!!

// takes a string and turns it
// into an array of letters each wrapped in a motion element
// normal letters are wrapped in a <motion.span>, 
// 'highlighted' in a <motion.b>, 
// 'red' in a <motion.i>


export default str => {

    if (!str) return null

    // make an array of characters
    const chars = Array.from(str)

    // flags
    let isHighlighted = false;
    let isRed = false;

    return chars.map((char, i) => {

        // set isHighlighted to true when encounter '{{'
        // and remove the braces
        if (char === '{' && chars[i + 1] === '{') {
            isHighlighted = true
            return null
        }
        if (char === '{' && chars[i - 1] === '{') return null

        // set isHighlighted to false when encounter '}}'
        // and remove the braces
        if (char === '}' && chars[i + 1] === '}') {
            isHighlighted = false
            return null
        }
        if (char === '}' && chars[i - 1] === '}') return null


        // when encounter '!!' while isRed is false
        // set isRed to true and remove the '!!'
        if (char === '!' && chars[i + 1] === '!' && !isRed) {
            isRed = true;
            return null
        }
        if (char === '!' && chars[i - 1] === '!' && isRed) {
            return null
        }

        // when encounter '!!' while isRed is true
        // set isRed to false and remove the '!!'
        if (char === '!' && chars[i + 1] === '!' && isRed) {
            isRed = false
            return null
        }
        if (char === '!' && chars[i - 1] === '!' && !isRed) {
            return null
        }


        if (isRed) return (
            <motion.i key={i}
                variants={letter}>
                    {char}
            </motion.i> 
        )


        if (isHighlighted) return (
            <motion.b key={i}
                variants={letter}>
                    {char}
            </motion.b>
        )

        return (
            <motion.span key={i}
                variants={letter}>
                    {char}
            </motion.span>
        )
    })
}