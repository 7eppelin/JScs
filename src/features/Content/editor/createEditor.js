
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

import { withVoids } from './plugins/withVoids'
import { withInlines } from './plugins/withInlines'
import { withNormalizing } from './plugins/withNormalizing'
import { withDelete } from './plugins/withDelete'

import { compose } from '@reduxjs/toolkit'


const createMyEditor = compose(
    withDelete,
    withVoids,
    withInlines,
    withNormalizing, 
    withHistory, 
    withReact, 
    createEditor
)


export { createMyEditor as createEditor }
