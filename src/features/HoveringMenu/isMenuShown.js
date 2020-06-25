
import { isInside } from 'features/Content/editor';
import { ReactEditor } from 'slate-react';
import { Range } from 'slate';


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

export default isMenuShown