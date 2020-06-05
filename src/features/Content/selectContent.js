import { createSelector } from 'reselect';

const selectContent = createSelector(
    state => state.data.content,
    (_, url) => url,

    (contentItems, url) => {
        const items = Object.values(contentItems);
        return items.find(item => item.url === url)
    }
)

export default selectContent