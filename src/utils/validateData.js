

export const validateDelete = (names, ids) => {
    const [ secName, subsecName, featureName ] = names
    const [ secID, subsecID, featureID ] = ids

    if (!secID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)

    if (subsecName && !subsecID) throw Error(`
        The {{${subsecName}}} subsection does 
        {{not exist}} in {{${secName}}}/.
    `)

    if (featureName && !featureID) throw Error(`
        The {{${featureName}}} feature does not exist 
        in {{${secName}}}/{{${subsecName}}}/.
    `)
}



export const validateCreate = (names, ids) => {
    const [ secName, subsecName, featureName ] = names
    const [ secID, subsecID, featureID ] = ids

    // if creating a section && 
    // such section already exists
    if (!subsecName && secID) throw Error(`
        The {{${secName}}} section already {{exists}}.
    `)

    // if creating a subsec or a feature, and
    // a section with the given name does not exist
    if (subsecName && !secID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)


    // if creating a subsection &&
    // such subsection already exists
    if (!featureName && subsecID) throw Error(`
        The {{${subsecName}}} subsection already {{exists}} 
        in {{${secName}}}/.
    `)

    // if creating a feature, and a subsec
    // with the given name does not exist
    if (featureName && !subsecID) throw Error(`
        The {{${subsecName}}} subsection does {{not exist}}
        in {{${secName}}}/.
    `)

    
    if (featureID) throw Error(`
        The {{${featureName}}} feature already {{exists}} 
        in {{${secName}}}/{{${subsecName}}}/.
    `)
}