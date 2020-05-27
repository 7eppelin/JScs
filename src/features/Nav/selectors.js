
import { createSelector } from 'reselect';


export const selectAndSortSections = createSelector(
    state => state.data.sections.byID,
    state => state.data.sections.ids,

    (byID, ids) => ids.map(id => byID[id])
)