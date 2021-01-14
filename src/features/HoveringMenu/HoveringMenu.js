import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { isInside } from 'features/Content/editor';
import { useSlate, ReactEditor } from 'slate-react';
import { Range } from 'slate';

const Menu = React.lazy(() => import('./Menu'));


const HoveringMenu = () => {
    const editor = useSlate()

    return (
        <AnimatePresence>
            {isMenuShown(editor) && (
                <Suspense fallback=''>
                    <Menu />
                </Suspense>
            )}
        </AnimatePresence>
    )
}


// the menu should be shown if a range of text is selected 
// (exceptions are the page's title and code blocks)

const isMenuShown = editor => {
    // don't let the menu hide when the user focuses on the input
    const activeEl = document.activeElement
    if (activeEl.classList.contains('hovering-input')) return true;

    const { selection } = editor
    if (!selection) return false

    const readOnly = ReactEditor.isReadOnly(editor)
    const collapsed = Range.isCollapsed(selection) 
    const inside = isInside(editor, 'code-block', 'title')

    if (collapsed || readOnly || inside) return false

    return true
}

export default HoveringMenu;