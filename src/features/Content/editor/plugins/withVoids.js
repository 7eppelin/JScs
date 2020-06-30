

// voids are the elements that slate treats as black boxes
// allowing us to have not editable elements within the editor
// (images, videos, forms, inputs etc)
// default isVoid simply returns false every time
// extend it to treat the links panel as a void elem

export const withVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = el => (
        el.type === 'links' ? true : isVoid(el)
    )
    
    return editor;
}