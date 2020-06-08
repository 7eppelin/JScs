import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { createItem, deleteItem } from 'dataSlice';
import { useOnClickOutside } from 'utils'

import StyledAddForm from './StyledAddForm';
import FormStatus from './FormStatus'


const AddForm = ({ hide }) => {

    const formRef = useRef()
    const dispatch = useDispatch()

    const [inputValue, setinputValue] = useState('')

    const [status, setStatus] = useState({
        type: 'success',
        message: 'Specify the full address ({{section}}/{{subsection}}/{{feature}}) of the item you want to create/delete',
    })

    // hide the form on click outside
    useOnClickOutside(formRef, hide)

    const handleSubmit = e => {
        e.preventDefault()
        setStatus({ type: 'pending' })

        dispatch(createItem(inputValue))
            .then(message => setStatus({ type: 'success', message }))
            .catch(err =>  {
                console.log(err)
                setStatus({ type: 'error', message: err.message })
            })
    }

    const handleDelete = () => {
        setStatus({ type: 'pending' })

        dispatch(deleteItem(inputValue))
            .then(message => setStatus({ type: 'success', message }))
            .catch(err => setStatus({ type: 'error', message: err.message }))
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

            <button onClick={handleDelete}
                    type='reset' >
                DELETE
            </button>
            
        </StyledAddForm>
    )
}

export default AddForm;