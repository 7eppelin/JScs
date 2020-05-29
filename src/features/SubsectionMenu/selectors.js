
import { createSelector } from 'reselect';


// returns an array of subsections
export const selectSubsections = createSelector(
    state => state.data.subsections,
    (_, secName) => secName,

    (subs, secName) => {
        const subsArr = Object.values(subs)
        return subsArr.filter(sub => sub.sectionName === secName)
    }
)

// returns section.children - an array of subsections' ids
export const selectIDs = createSelector(
    state => state.data.sections.byID,
    (_, secName) => secName,

    (sections, secName) => {
        const secsArr = Object.values(sections)
        // if sections hasn't finished fetching yet, skip
        if (!secName || !secsArr.length) return []

        const sec = secsArr.filter(sec => sec.name === secName)[0]
        if (!sec) return []
        return sec.children
    }
)


export const selectAndSortSubsecs = createSelector(
    (state, secName) => selectSubsections(state, secName),
    (state, secName) => selectIDs(state, secName),

    (subsecs, ids) => {
        if (!subsecs.length || !ids.length) return null;
        return ids.map(id => (
            subsecs.find(sub => sub.id === id)
        ))
    }
)