
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({

    name: 'data',

    initialState: {
        sections: { byID: {}, ids: [] },
        subsections: {},
        features: {}, 
        content: {}
    },

    reducers: {
        // redux-toolkit's createSlice() uses
        // immerjs internally https://github.com/immerjs/immer
        // which allows us to 'mutate' the state

        // add* are dispatched when retrieving items from the db
        addSections: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.sections.byID[item.id] = item;
                state.sections.ids.push(item.id)
            })
        },

        addSubsections: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.subsections[item.id] = item
            })
        },

        addFeatures: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.features[item.id] = item
            })
        },


        // addNew* are dispatch when creating a new item
        // addSection is used in both retrieving
        // and creating scenatios for sections
        addNewSubsection: (state, action) => {
            const item = action.payload

            state.subsections[item.id] = item

            // add a reference to the subsec
            // to the parent section's children field
            const sec = state.sections.byID[item.sectionID]
            sec.children.push(item.id)
        },

        addNewFeature: (state, action) => {
            const item = action.payload

            state.features[item.id] = item

            // add a reference to the feature
            // to the parent subsection's children field
            const sub = state.subsections[item.subsectionID]
            sub.children.push(item.id)
        },


        removeSection: (state, action) => {
            const itemID = action.payload;

            // not only delete the section
            // but all the nested items aswell
            const secs = state.sections.byID;
            const subs = secs[itemID].children;

            if (subs.length) {
                let features = []

                for (let id of subs) {
                    features = [ 
                        ...features, 
                        ...state.subsections[id].children 
                    ]
                    delete state.subsections[id]
                }

                features.forEach(id => delete state.features[id])
            }

            delete secs[itemID];
            state.sections.ids = state.sections.ids.filter(id => id !== itemID)
        },

        removeSubsection: (state, action) => {
            const itemID = action.payload;

            // not only delete the subsection
            // // but all the nested items aswell
            const sub = state.subsections[itemID];
            sub.children.forEach(id => delete state.features[id])

            // del the reference to the subsec
            // from the parent section's children field
            const sec = state.sections.byID[sub.sectionID]
            sec.children = sec.children.filter(id => id !== itemID)

            // del the subsection
            delete state.subsections[itemID]
        },

        removeFeature: (state, action) => {
            const itemID = action.payload;

            // delete the reference to the feature
            // from the parent subsection's children field
            const f = state.features[itemID]
            const sub = state.subsections[f.subsectionID]
            sub.children = sub.children.filter(id => id !== itemID)

            // del the subsection
            delete state.features[itemID]
        },


        reorderSections: (state, action) => {
            // action.payload is an array of ids in a new order;
            state.sections.ids = action.payload;
        },

        reorderSubsections: (state, action) => {
            const { sectionID, newOrder } = action.payload
            state.sections.byID[sectionID].children = newOrder
        },

        reorderFeatures: (state, action) => {
            const { subsecID, newOrder } = action.payload
            state.subsections[subsecID].children = newOrder
        },


        addContentItem: (state, action) => {
            state.content[action.payload.id] = action.payload;
        },

        removeContentItem: (state, action) => {
            const id = action.payload
            delete state.content[id]
        }
    }
});


const { reducer, actions } = dataSlice;

export const { 
    addSections,
    addSubsections,
    addFeatures, 
    addNewSubsection,
    addNewFeature,
    removeSection,
    removeSubsection,
    removeFeature,
    reorderSections,
    reorderSubsections,
    reorderFeatures,
    addContentItem,
    removeContentItem
} = actions;

export default reducer;