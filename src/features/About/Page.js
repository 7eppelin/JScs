import React from 'react';
import styled from 'styled-components/macro';

import PageTitle from './PageTitle'
import PageContent from './PageContent'


const Page = ({ content }) => {
    return (
        <Section>
            <PageTitle text={content.title} />
            <PageContent text={content.content} />
        </Section>
    )
}

const Section = styled.section`
    width: 75%;
    margin: 0 auto;
    padding: 30px 0;
    text-align: left;
    color: var(--gray1);
`

export default Page