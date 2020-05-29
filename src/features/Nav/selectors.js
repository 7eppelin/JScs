
import { createSelector } from 'reselect';


export const selectAndSortSections = createSelector(
    state => state.data.sections.byID,
    state => state.data.sections.ids,

    (byID, ids) => {
        if (!ids.length || !Object.keys(byID).length) return null
        return ids.map(id => byID[id])
    }
)