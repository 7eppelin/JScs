import { useState, useEffect } from 'react'
import { Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'


const useMenuCoords = (menu, isInputShown, selection) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const editor = useSlate();

    useEffect(() => {
        if (Range.isCollapsed(selection)) return;

        const range = ReactEditor.toDOMRange(editor, selection)
        const rect = range.getBoundingClientRect()

        // the line below doesn't work, because this hook
        // is getting invoked before the input had a chance to open
        // let h = el.offsetHeight

        const input = isInputShown ? 39 : 0;
        const elHeight = 41 + input;

        const elWidth = menu.current.offsetWidth

        const y = rect.top - elHeight - 16;
        const x = rect.left - elWidth / 2 + rect.width / 2;

        setCoords({ x, y })

    }, [isInputShown, selection])

    return coords
}

export default useMenuCoords