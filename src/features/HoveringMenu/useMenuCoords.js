import { useState, useEffect, useLayoutEffect } from 'react'
import { Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'


const useMenuCoords = (elem, isInputShown, selection) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const editor = useSlate();

    useLayoutEffect(() => {
        if (Range.isCollapsed(selection)) return;
        if (!elem.current) return;

        const range = ReactEditor.toDOMRange(editor, selection)
        const rect = range.getBoundingClientRect()
        const input = isInputShown ? 39 : 0;

        const el = elem.current.getBoundingClientRect();
        console.log(el.width, el.height);

        const elHeight = 41 + input;
        const elWidth = 227;

        const y = rect.top - el.height - 16;
        const x = rect.left - el.width / 2 + rect.width / 2;

        setCoords({ x, y })

    }, [elem, isInputShown, selection])

    return coords
}

export default useMenuCoords