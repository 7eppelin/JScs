import React, { useState } from 'react';
import { useDragControls } from 'framer-motion'

import SubsecLink from './SubsecLink';
import DraggableSubsec from './DraggableSubsec'
import FeaturesMenu from 'features/FeaturesMenu/FeaturesMenu';


const Subsec = ({
    i,
    heights,
    subsec,
    reorder,
    scrollbar,
    saveNewOrder,
}) => {
    const [ featuresOpen, setFeaturesOpen ] = useState(false)
    const { name, id, sectionName } = subsec   

    // dragging starts onMouseDown on a nested component (SubsecLink)
    const dragControls = useDragControls()
    const startDrag = e => dragControls.start(e)

    return (
        <DraggableSubsec i={i}
            heights={heights}
            reorder={reorder}
            scrollbar={scrollbar}
            saveNewOrder={saveNewOrder}
            dragControls={dragControls} >

            <SubsecLink 
                to={`/${sectionName}/${name}`}
                label={name}
                toggleFeatures={setFeaturesOpen}
                featuresOpen={featuresOpen}
                startDrag={startDrag} />

            <FeaturesMenu i={i}
                heights={heights}
                subsecID={id}
                isOpen={featuresOpen} />
        </DraggableSubsec>
    )
}

export default Subsec