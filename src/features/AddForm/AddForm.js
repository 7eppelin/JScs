import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

//import { createItem, deleteItem } from 'dataSlice';
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

    const handleSubmit = async e => {
        e.preventDefault()
        setStatus({ type: 'pending' })

        const { createItem } = await import('dataSlice/thunks/createItem')

        dispatch(createItem(inputValue))
            .then(message => setStatus({ 
                type: 'success', 
                message 
            }))
            .catch(err =>  {
                console.log(err)
                setStatus({ 
                    type: 'error', 
                    message: err.message 
                })
            })
    }

    const handleDelete = async () => {
        setStatus({ type: 'pending' })

        const { deleteItem } = await import('dataSlice/thunks/deleteItem')

        dispatch(deleteItem(inputValue))
            .then(message => setStatus({ 
                type: 'success', 
                message 
            }))
            .catch(err => {
                console.log(err)
                setStatus({ 
                    type: 'error', 
                    message: err.message 
                })
            })
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