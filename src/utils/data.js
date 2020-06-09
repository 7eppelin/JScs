

import { 
    findSectionIDinDB,
    findSubsecIDinDB, 
    findFeatureIDinDB 
} from 'utils'



// names = [ 'sectionName', 'subsectionName', 'featureName' ]
// 'featureName' and 'subsectionName' are optional

// find all of the item's ids
// and return it as [ sectionID, subsecID, featureID ]

export const findIDsByNames = async (names, data) => {

    const [ secName, subsecName, featureName ] = names

    const sectionID = await findSectionID(
        secName, 
        data.sections.byID
    )

    const ids = [ sectionID ]

    if (subsecName) {
        const subsecID = await findSubsecID(names, data)
        ids.push(subsecID)
    }

    if (featureName) {
        const featureID = await findFeatureID(names, data)
        ids.push(featureID)
    }

    return ids
}



// searches for an item in the state 
// (the data arg = state.data)
// if doesn't finds, searches in the database
// returns it's ID

export const findItemID = async (url, data) => {
    const [ secName, subsecName, featureName ] = url.split('/')

    if (featureName) {
        return await findFeatureID(url, data)

    } else if (subsecName) {
        return await findSubsecID(url, data)

    } else {
        return await findSectionID(secName, data)
    }
}



// search in the state first, 
// and only then in the database

const findSectionID = async (name, sections) => (
    findIdByName(sections, name) || await findSectionIDinDB(name)
)

const findSubsecID = async (names, subsecs) => (
    findItem(subsecs, names)?.id || await findSubsecIDinDB(names)
)

const findFeatureID = async (names, features) => (
    findItem(features, names)?.id || await findFeatureIDinDB(names)          
)



// when searching for an item in state, 
// these facts must be taken into account:

// different subsections with the same names
// can co-exist in different sections

// different features with the same names
// can co-exist in different sections or subsections

// thus simply comparing names is not sufficient
// must also compare parents' names

// finds the subsection by the name and sectionName fields
// finds the feature by the name, subsectionName and sectionName fields

export const findItem = (data, names) => {

    const [ secName, subsecName, featureName ] = names

    // if featureName is present, find the feature
    if (featureName) {
        const features = objectToArray(data.features)

        return features.find(item => (
            item.name === featureName
            && item.sectionName === secName
            && item.subsectionName === subsecName
        ))

    // if subsecName is present (and featureName isn't), 
    // find the subsec
    } else if (subsecName) {
        const subsecs = objectToArray(data.subsections)

        return subsecs.find(item => (
            item.name === subsecName
            && item.sectionName === secName
        ))

    // find the section
    } else {
        const sections = objectToArray(data.sections.byID)
        return findItemByName(sections, secName)
    }  
}





const objectToArray = obj => (
    Array.isArray(obj) ? [...obj] : Object.values(obj)
)

// the container arg can either be an obj or an array
// it it's an object, we want to transform it into an array

export const findItemByName = (container, name) => {
    const arr = objectToArray(container)
    return arr.find(item => item.name === name)
}


export const findIdByName = (container, name) => (
    findItemByName(container, name)?.id
)



export const validateDelete = (names, ids) => {
    const [ secName, subsecName, featureName ] = names
    const [ sectionID, subsecID, featureID ] = ids

    if (!sectionID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)

    if (subsecName && !subsecID) throw Error(`
        The {{${subsecName}}} subsection does 
        {{not exist}} in {{${secName}}}/.
    `)

    if (featureName && !featureID) throw Error(`
        The {{${name}}} feature does not exist 
        in {{${section}}}/{{${subsection}}}
    `)
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