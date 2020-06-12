

// This file exists to avoid the circular dependencies problem
// It contains the actions that different reducers want to react to

import { createAction } from '@reduxjs/toolkit'


export const addSubsec = createAction('data/addSubsec')
export const removeSubsec = createAction('data/removeSubsec')

export const removeSection = createAction('data/removeSection')

export const addFeature = createAction('data/addFeature')
export const removeFeature = createAction('data/removeFeature')