import { useState, useEffect } from 'react'
import { Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'
import { isInside } from 'features/Content/editor'


const useMenuCoords = (menu, isInputShown, selection) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const editor = useSlate();

    useEffect(() => {
        // if selection is collapsed, or the user's selection
        // includes a code block or the title, or
        // the menu is about to hide, don't do anything
        const inside = isInside(editor, 'code-block', 'title')
        const collapsed = Range.isCollapsed(selection)
        if (inside || collapsed || !menu.current) return

        // selected text coords
        const range = ReactEditor.toDOMRange(editor, selection)
        const rect = range.getBoundingClientRect()

        // editor's scrollbar coords
        const containerElem = menu.current.offsetParent
        const cont = containerElem.getBoundingClientRect()
        const contScroll = containerElem.scrollTop

        // i wish i could simply use menu's offsetHeight, but this hook
        // is getting invoked before the input had a chance to open
        const menuHeight = 41 + (isInputShown ? 39 : 0);
        const y = rect.top - cont.top + contScroll - menuHeight - 16;

        const menuWidth = menu.current.offsetWidth
        const menuLeft = rect.left - menuWidth / 2 + rect.width / 2

        let x =  menuLeft - cont.left;
        if (x < 8) x = 8;

        setCoords({ x, y })

    }, [isInputShown, selection])

    return coords
}

export default useMenuCoords