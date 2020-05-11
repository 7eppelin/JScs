

// takes an array, current and target indexex of an item, 
// moves the item from current to target index
// returns a new array
export const arrayMove = (arr, current, target) => {
    if (target < 0 || target > arr.length - 1) return;

    const newArr = [...arr];

    // delete the elem from the ids array
    const el = newArr.splice(current, 1)[0];
    // and insert it in the target position
    newArr.splice(target, 0, el);
    
    return newArr
}