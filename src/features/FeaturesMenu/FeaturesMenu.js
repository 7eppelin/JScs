import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeatures } from 'dataSlice'
import FeaturesList from './FeaturesList'


const FeaturesMenu = ({ 
    i,
    heights,
    subsecID, 
    isOpen 
}) => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.data.features[subsecID])

    useEffect(() => {
        if (!isOpen || items) return
        dispatch(fetchFeatures(subsecID))
    }, [items, isOpen, dispatch])

    // set the item's current height, so the siblings can know it
    const openHeight = 47 + items?.length * 35
    heights.current[i] = isOpen ? openHeight : 47

    return (
        <FeaturesList 
            isOpen={isOpen}
            items={items}
            subsecID={subsecID} />
    )
}

export default FeaturesMenu;