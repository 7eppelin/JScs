
import { Transforms } from 'slate'

import { isInside, insertElem } from './../commands'


export const handleApi = (editor, event) => {
    event.preventDefault()
    const char = event.nativeEvent.code

    // insert 'api-args' elem on '('
    if (event.key === '(') {
        insertElem(editor, 'api-args', '()')
        // place the caret between the parentheses
        Transforms.move(editor, { reverse: true })
        return
    }

    // if the user's selection is currently inside an 'api-args' elem
    if (isInside(editor, 'api-args')) {
        // but is not inside an 'api-arg' elem
        // and the user presses any *printable* key 
        // (except comma - is a special case)
        // insert a new 'api-arg' elem
        if (!isInside(editor, 'api-arg')
            && event.key.length === 1
            && char !== 'Comma') {
                insertElem(editor, 'api-arg', event.key)
        }

        if (char === 'Comma') {
            insertElem(editor, 'api-comma', ',')

            const match = n => n.type === 'api-comma'
            Transforms.liftNodes(editor, { match })
            Transforms.unwrapNodes(editor, { match })
            Transforms.move(editor, {unit: 'offset'})
        }
    }
}