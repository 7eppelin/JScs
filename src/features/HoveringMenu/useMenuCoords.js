import { useState, useEffect } from 'react'
import { Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'
import { isInside } from 'features/Content/editor'


const useMenuCoords = (menu, isInputShown, selection) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const editor = useSlate();

    useEffect(() => {
        // if selection is collapsed, or the user's selection
        // includes a code block or the title
        // the menu is about to hide, don't do anything
        const inside = isInside(editor, 'code-block', 'title')
        const collapsed = Range.isCollapsed(selection)
        if (inside || collapsed) return

        const range = ReactEditor.toDOMRange(editor, selection)
        const rect = range.getBoundingClientRect()

        // the line below doesn't work, because this hook
        // is getting invoked before the input had a chance to open
        // let h = el.offsetHeight

        const input = isInputShown ? 39 : 0;
        const elHeight = 41 + input;

        const elWidth = menu.current.offsetWidth

        const y = rect.top - elHeight - 20;
        const x = rect.left - elWidth / 2 + rect.width / 2;

        setCoords({ x, y })

    }, [isInputShown, selection])

    return coords
}

export default useMenuCoords