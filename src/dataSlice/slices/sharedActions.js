

// This file exists to avoid the circular dependencies problem
// It contains the actions that different reducers want to react to

import { createAction } from '@reduxjs/toolkit'

export const removeSection = createAction('sections/removeSection')

export const addSubsec = createAction('subsecs/addSubsec')
export const removeSubsec = createAction('subsecs/removeSubsec')

export const removeFeature = createAction('features/removeFeature')