

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


export {
    updateSectionsOrderInDB,
    updateSubsectionsOrderInDB,
    updateFeaturesOrderInDB,
} from './db'