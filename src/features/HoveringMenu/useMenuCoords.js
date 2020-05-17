import { useState, useEffect } from 'react'
import { Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'


const useMenuCoords = (isInputShown, selection) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const editor = useSlate();

    useEffect(() => {
        if (Range.isCollapsed(selection)) return;

        const range = ReactEditor.toDOMRange(editor, selection)
        const rect = range.getBoundingClientRect()
        const input = isInputShown ? 39 : 0;

        const elHeight = 41 + input;
        const elWidth = 227;

        const y = rect.top - elHeight - 16;
        const x = rect.left - elWidth / 2 + rect.width / 2;

        setCoords({ x, y })

    }, [isInputShown, selection])

    return coords
}

export default useMenuCoords