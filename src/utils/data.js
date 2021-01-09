

import { 
    findSectionIDinDB,
    findSubsecIDinDB, 
    findFeatureIDinDB 
} from 'utils'


// given an array of items' names - [ 'sectionName', 'subsecName', 'featureName' ]
// and the data slice of the store (state.data)
// return an array of given items' IDs [ sectionID, subsecID, featureID ]


export const findIDsByNames = async (names, data) => {
    const [ secName, subsecName, featureName ] = names

    const sectionID = await findSectionID(secName, data.sections)

    const ids = [ sectionID ]

    if (subsecName) {
        const subsecs = data.subsecs[secName]
        const subsecID = await findSubsecID(names, subsecs)
        ids.push(subsecID)
    }

    if (featureName) {
        const subsecID = ids[1]
        const features = data.features[subsecID]
        const featureID = await findFeatureID(names, features)
        ids.push(featureID)
    }

    return ids
}



// search in the state first, then in the database

const findSectionID = async (name, sections) => (
    findIdByName(name, sections) || await findSectionIDinDB(name)
)

const findSubsecID = async (names, subsecs) => (
    findIdByName(names[1], subsecs) || await findSubsecIDinDB(names)
)

const findFeatureID = async (names, features) => (
    findIdByName(names[2], features) || await findFeatureIDinDB(names)          
)



export const findIdByName = (name, items) => (
    items?.find(item => item.name === name)?.id
)

export const findItemByName = (name, items) => (
    items?.find(item => item.name === name)
)



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



// create a new content object
export const createContentItem = item => {

    const { id, name, sectionName, subsecName } = item

    let url = `/${name}`
    if (subsecName) url = `/${subsecName}` + url
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