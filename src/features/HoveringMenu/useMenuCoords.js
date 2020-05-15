import { useState, useRef, useEffect } from 'react'


const useMenuCoords = (isMenuShown, isInputShown) => {
    const [coords, setCoords] = useState({})

    useEffect(() => {
        if (!isMenuShown) return;

        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        const input = isInputShown ? 39 : 0;

        const elHeight = 41 + input;
        const elWidth = 227;

        const y = rect.top - elHeight - 16;
        const x = rect.left - elWidth / 2 + rect.width / 2;

        setCoords({ x, y })

    }, [isMenuShown, isInputShown])

    return coords
}

export default useMenuCoords