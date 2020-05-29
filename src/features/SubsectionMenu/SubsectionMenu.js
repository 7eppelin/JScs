import React, { Suspense, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';

const SubsectionsContainer = React.lazy(() => import('./SubsectionsContainer'))


const SubsectionMenu = ({ sectionName, isAdmin }) => {
    const prevSection = useRef()

    useEffect(() => {
        prevSection.current = sectionName
    }, [sectionName])

    // we want to know if we are transitioning 
    // from the content section to the frontpage
    // if that's the case (sectionName = undefined), 
    // we don't want the subsections to disappear during the animation

    return (
        <Section>
            <Suspense fallback=''>
                {(prevSection.current || sectionName) && (
                    <SubsectionsContainer
                        sectionName={sectionName}
                        isAdmin={isAdmin} />
                )}
            </Suspense>
        </Section>
    )
}

const Section = styled.section`
    height: 100%;
    flex-basis: 250px;
    text-align: center;
    padding: 7px;

    ul { padding-right: 4px; }
`

export default React.memo(SubsectionMenu)