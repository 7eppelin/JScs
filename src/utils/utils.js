


const objectToArray = obj => (
    Array.isArray(obj) ? [...obj] : Object.values(obj)
)


export const findItemByName = (container, name) => {
    const arr = objectToArray(container)
    return arr.find(item => item.name === name)
}


export const findIdByName = (container, name) => (
    findItemByName(container, name)?.id
)


// finds the subsection by the name and sectionName fields
// finds the feature by the name, subsectionName and sectionName fields
export const findItemWithParent = (container, name, secName, subsecName) => {

    const arr = objectToArray(container)

    // if subsecName is provided, we are looking for a feature
    if (subsecName) {
        return arr.find(item => (
            item.name === name 
            && item.sectionName === secName
            && item.subsectionName === subsecName
        ))
    }

    // otherwise, we are looking for a subsection
    if (secName) {
        return arr.find(item => (
            item.name === name 
            && item.sectionName === secName
        ))
    }
}



// takes an array, current and target indexex of an item, 
// moves the item from current to target index
// returns a new array
export const arrayMove = (arr, current, target) => {
    if (target < 0 || target > arr.length - 1) return arr;

    const newArr = [...arr];

    // delete the elem from the ids array
    const el = newArr.splice(current, 1)[0];
    // and insert it in the target position
    newArr.splice(target, 0, el);
    
    return newArr
}



// takes a scrollbar elem, value to scroll by, 
// and dragOrigin to update the dragged elem's position while scrolling
export const scroll = (scrollbar, y, dragOrigin) => {
    scrollbar.scrollBy(0, y);

    // adjust elem's position when scrolling
    const scroll = scrollbar.scrollTop;
    const scrollH = scrollbar.scrollHeight;
    const clientH = scrollbar.clientHeight;

    if (scroll > 0 && scroll < scrollH - clientH) {
        dragOrigin.set(dragOrigin.get() + y)
    }
}



// create a new content object
export const createContentItem = (id, name, url) => {
    // initial content's data in the slate.js' format
    const data = [{
            type: 'title',
            children: [{ text: name }]
        }, {
            type: 'links',
            links: [],
            children: [{ text: '' }]
        }, {
            type: 'paragraph',
            children: [{ text: 'Description is missing... '}]
        }, {
            type: 'paragraph',
            children: [{ text: 'This page is editable. Try it out!' }]
        }
    ]

    return {
        id,
        name,
        url,
        edited: Date.now(),
        data
    }
}