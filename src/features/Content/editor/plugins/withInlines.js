

// default isInline returns false every time

export const withInlines = editor => {
    const { isInline } = editor;

    const inlines = ['link', 'code-inline', 'api-args', 'api-comma', 'api-arg']

    editor.isInline = el => (
        inlines.includes(el.type) ? true : isInline(el)
    )

    return editor;
}