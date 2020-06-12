import React, { Suspense } from 'react';
import styled from 'styled-components/macro';

import { usePrevious } from 'utils'

const SubsectionsContainer = React.lazy(() => import('./SubsectionsContainer'))


const SubsectionMenu = ({ sectionName, isAdmin, delayAnimation }) => {
    const prevSection = usePrevious(sectionName)

    return (
        <Section>
            <Suspense fallback=''>
                {(prevSection || sectionName) && (
                    <SubsectionsContainer
                        sectionName={sectionName}
                        isAdmin={isAdmin}
                        delayAnimation={delayAnimation} />
                )}
            </Suspense>
        </Section>
    )
}

const Section = styled.section`
    height: 100%;
    width: 17vw;
    text-align: center;
    padding: 5px;
    padding-left: 2px;
`

export default React.memo(SubsectionMenu)