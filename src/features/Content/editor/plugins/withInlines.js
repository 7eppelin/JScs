

// default isInline returns false every time

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