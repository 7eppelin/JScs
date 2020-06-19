
import { 
    removeSection, 
    removeSubsec, 
    removeFeature,
} from 'dataSlice'



// when a regular user tries to delete an item via the AddForm
// this function is being dispatched

// deletes sections/subsections/features only from the redux store

export default (names, ids) => dispatch => {  

    const [ secName, subsecName, featureName ] = names
    const [ sectionID, subsecID, featureID ] = ids

    if (featureName) {
        return dispatch(
            deleteDemoFeature(names, ids)
        )
    
    } else if (subsecName) {
        return dispatch(
            deleteDemoSubsection(names, subsecID)
        )

    } else {
        return dispatch(
            deleteDemoSection(secName, sectionID)
        )
    }
}



const deleteDemoSection = (name, id)=> dispatch => {
    dispatch(removeSection({ name, id }))

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} section has been deleted from {{state}}.
    `
}



const deleteDemoSubsection = (names, id) => dispatch => {
    const [ secName, name ] = names
    dispatch(removeSubsec({ id, secName }))

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} subsection has been deleted 
        from {{${secName}}}/ from {{state}}.
    `
}



const deleteDemoFeature = (names, ids) => dispatch => {
    const [ , subsecID, id ] = ids
    dispatch(removeFeature({ id, subsecID }))

    const [ secName, subsecName, name ] = names
    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} feature has been deleted from
        {{${secName}}}/{{${subsecName}}}/ from {{state}}.
    `
}