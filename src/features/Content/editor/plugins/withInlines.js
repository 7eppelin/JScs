

// default isInline returns false every time
// we simply specify which elements should be considered as inlines

export const withInlines = editor => {
    const { isInline } = editor;

    const inlines = [
        'link', 
        'code-inline', 
    ]

    editor.isInline = el => (
        inlines.includes(el.type) ? true : isInline(el)
    )

    return editor;
}