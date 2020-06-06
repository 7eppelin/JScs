import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createItem, deleteItem } from 'dataSlice';
import { useOnClickOutside } from 'utils'

import StyledAddForm from './StyledAddForm';
import FormStatus from './FormStatus'


const AddForm = ({ hide }) => {

    const formRef = useRef()
    const dispatch = useDispatch()

    const status = useSelector(state => state.addFormStatus);

    const [inputValue, setinputValue] = useState('');

    // hide the form on click outside
    useOnClickOutside(formRef, hide)

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createItem(inputValue));
    }

    return (
        <StyledAddForm className='AddForm'
                onSubmit={handleSubmit}
                ref={formRef} >

            <h3>ADD OR DELETE AN ITEM</h3>

            <input value={inputValue} 
                placeholder='section/subsection/feature'
                onChange={e => setinputValue(e.target.value)} />

            <FormStatus status={status} />

            <button>
                CREATE
            </button>

            <button onClick={() => dispatch(deleteItem(inputValue))}
                    type='reset' >
                DELETE
            </button>
            
        </StyledAddForm>
    )
}

export default AddForm;