import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSlate } from 'slate-react'

import isMenuShown from './isMenuShown'

const Menu = React.lazy(() => import('./Menu'));


const HoveringMenu = () => {
    const editor = useSlate()

    return (
        <AnimatePresence>
            {isMenuShown(editor) && (
                <Suspense fallback=' '>
                    <Menu />
                </Suspense>
            )}
        </AnimatePresence>
    )
}


export default HoveringMenu;