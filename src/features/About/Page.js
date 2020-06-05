import React from 'react';

import PageTitle from './PageElements/PageTitle'
import PageContent from './PageContent'


const Page = ({ content, isLastPage, scrollDown, setAnimationDirection }) => (
    <>
        <PageTitle text={content.title} />
        <PageContent data={content.body}
            isLastPage={isLastPage}
            scrollDown={scrollDown}
            setAnimationDirection={setAnimationDirection} />
    </>
)


export default Page