import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import StyledAddForm from './StyledAddForm';
import { createItem, deleteItem } from 'dataSlice';


const AddForm = ({ hide }) => {

    const dispatch = useDispatch();
    const status = useSelector(state => state.addFormStatus);
    const [inputValue, setinputValue] = useState('');

    // hide the form on click outside
    useEffect(() => {
        const hideForm = e => {
            if (!e.target.closest('.AddForm')) hide()
        };

        document.addEventListener('click', hideForm);
        return () => document.removeEventListener('click', hideForm);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createItem(inputValue));
    }

    return (
        <StyledAddForm className='AddForm'
                onSubmit={handleSubmit} >

            <h3>ADD OR DELETE AN ITEM</h3>

            <input value={inputValue} 
                placeholder='section/subsection/feature'
                onChange={e => setinputValue(e.target.value)} />

            <div className={status.type === 'error' ? 'error' : ''} >
                {status.message}
            </div>

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