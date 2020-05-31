import React from 'react';

import PageTitle from './PageElements/PageTitle'
import PageContent from './PageContent'


const Page = ({ content }) => (
    <>
        <PageTitle text={content.title} />
        <PageContent data={content.body} />
    </>
)


export default Page