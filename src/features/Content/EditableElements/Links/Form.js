import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import { useEditor } from 'slate-react';
import { setLinks } from '../../editor';

import Icon from 'components/Icon'


const Form = ({ links, editing, closeForm }) => {
    const editor = useEditor();

    const [ text, setText ] = useState('');
    const [ href, setHref ] = useState('');

    useEffect(() => {
        // if editing an existing link
        if (typeof editing === 'number') {
            setText(links[editing].text);
            setHref(links[editing].href);
        // if creating a new link
        } else {
            setText('');
            setHref('');
        }
    }, [editing])

    const submit = e => {
        e.preventDefault();
        let newLinks;

        // if editing an existing link
        if (typeof editing === 'number') {
            newLinks = links.map((link, i) => {
                if (editing !== i) return link;
                return { text, href };
            })
        } else {
            // if creating a new link
            newLinks = [ ...links, { text, href } ];
        }
        
        setLinks(editor, newLinks);
        closeForm();
    }

    return (
        <form onSubmit={submit}>

            <Input 
                type='text'
                placeholder='text...'
                value={text} 
                onChange={e => setText(e.target.value)} />

            <Input
                type='text'
                placeholder='href...' 
                value={href} 
                onChange={e => setHref(e.target.value)} />

            <Button>
                <Icon icon='check' size='1.4em' />
            </Button>

            <Button className='close' type='reset' onClick={closeForm}>
                <Icon icon='close' size='1.4em' />
            </Button>

        </form>
    )
}

const Input = styled.input`
    display: inline-block;
    width: 160px;
    padding: 5px 15px;
    font-size: 1.2rem;
    color: var(--white);
    background: var(--gray5);
    box-shadow: inset 0 0 5px 0 var(--gray6);
    border: 1px solid var(--black);
    border-radius: 3px;
    margin-right: 12px;
`

const Button = styled.button`
    display: inline-block;
    margin: 0 6px;
    background: var(--black);
    color: var(--gray1);
    border-radius: 3px;
    font-size: 1.2rem;
    padding: 5px 10px;
    transition: .15s;

    &:hover { background: var(--gray6) }
    &:hover path { fill: var(--green); }
    &.close:hover path { fill: var(--red); }
`

export default Form;