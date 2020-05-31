import React, { useRef } from 'react';

import AnimatedPage from './AnimatedPage'
import PageTitle from './PageElements/PageTitle'
import PageContent from './PageContent'


const Page = ({ 
    content, 
    pageIndex, 
    scrollPages,
    justMounted,
    animationDirection,
    setAnimationDirection
}) => {
    const pageRef = useRef()

    return (
        <AnimatedPage
            pageRef={pageRef}
            pageIndex={pageIndex}
            justMounted={justMounted}
            scrollPages={scrollPages}
            animationDirection={animationDirection}
            setAnimationDirection={setAnimationDirection}>

            <PageTitle text={content.title} />
            <PageContent data={content.body} />
        </AnimatedPage>
    )
}


export default Page