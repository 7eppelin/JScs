

import { 
    findSectionIDinDB,
    findSubsecIDinDB, 
    findFeatureIDinDB 
} from 'utils'


// names = [ 'sectionName', 'subsectionName', 'featureName' ]
// 'featureName' and 'subsectionName' are optional

// return [ sectionID, subsecID, featureID ]

export const findIDsByNames = async (names, data) => {

    const [ secName, subsecName, featureName ] = names

    const sectionID = await findSectionID(secName, data.sections)

    const ids = [ sectionID ]

    if (subsecName) {
        const subsecID = await findSubsecID(names, data.subsecs)
        ids.push(subsecID)
    }

    if (featureName) {
        const featureID = await findFeatureID(names, data.features)
        ids.push(featureID)
    }

    return ids
}


// search in the state first, 
// and only then in the database

const findSectionID = async (name, sections) => (
    findSection(name, sections)?.id 
    || 
    await findSectionIDinDB(name)
)

const findSubsecID = async (names, subsecs) => (
    findSubsec(names, subsecs)?.id 
    || 
    await findSubsecIDinDB(names)
)

const findFeatureID = async (names, features) => (
    findFeature(names, features)?.id 
    || 
    await findFeatureIDinDB(names)          
)


// when searching for an item in state by name, 
// must always keep in mind that:

// different subsections with the same names
// can co-exist in different sections

// different features with the same names
// can co-exist in different sections or subsections

// thus simply comparing names is not sufficient
// must also compare parents' names

export const findSection = (name, sections) => (
    sections.find(sec => sec.name === name)
)

export const findSubsec = (names, subsecs) => {
    const [ secName, name ] = names
    const arr = Object.values(subsecs)

    return arr.find(sub => (
        sub.name === name && 
        sub.sectionName === secName
    ))
}

export const findFeature = (names, features) => {
    const [ secName, subsecName, name ] = names
    const arr = Object.values(features)

    return arr.find(f => (
        f.name === name && 
        f.sectionName === secName && 
        f.subsectionName === subsecName
    ))
}



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



// create a new content object
export const createContentItem = item => {

    const { id, name, sectionName, subsectionName } = item

    let url = `/${name}`
    if (subsectionName) url = `/${subsectionName}` + url
    if (sectionName) url = `/${sectionName}` + url


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