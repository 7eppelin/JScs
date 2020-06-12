
import { createSelector } from 'reselect';
import { findSection } from 'utils'


// returns an array of subsections
export const selectSubsecs = createSelector(
    state => state.data.subsecs,
    (_, secName) => secName,

    (subsecs, secName) => {
        const arr = Object.values(subsecs)
        const subsArr = arr.filter(sub => sub.sectionName === secName)
        if (!subsArr.length) return null

        const subs = {}
        subsArr.forEach(sub => subs[sub.id] = sub)
        return subs
    }
)

// returns section.children - an array of subsections' ids
export const selectIDs = createSelector(
    state => state.data.sections.byID,
    (_, secName) => secName,

    (sections, secName) => {
        if (!secName) return null

        const section = findSection(secName, sections)
        if (!section) return null
        
        const ids = section.children

        return ids.length ? ids : null
    }
)


export const selectAndSortSubsecs = createSelector(
    (state, secName) => selectSubsecs(state, secName),
    (state, secName) => selectIDs(state, secName),

    (subsecs, ids) => {
        if (!subsecs || !ids) return null
        return ids.map(id => (
            subsecs.find(sub => sub.id === id)
        ))
    }
)