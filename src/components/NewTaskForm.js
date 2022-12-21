import React from 'react';
import { useState } from 'react';
import  PropTypes from 'prop-types';


const NewTaskInput = (props) => {
    const [formFields, setformFields] = useState({
        title: '',
        description: ''
    });

    const onTitleChange = (event) => {
        setformFields({
            ...formFields,
            title: event.target.value
        });
    };

    const onDescriptionChange = (event) => {
        setformFields({
            ...formFields,
            description: event.target.value
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addTaskCallback({
            title: formFields.title,
            description: formFields.description
        });

        setformFields({
            title: '',
            description: ''
        });
    };

    return (
        <form onSubmit={onFormSubmit} className= "form-style">
            <section>
                <h5>New Task Title</h5>
                <input 
                type="text" 
                value={formFields.title}
                onChange={onTitleChange}/>
                <h5>Description</h5>
                <input
                type= "text"
                value= {formFields.description}
                onChange={onDescriptionChange} />
            </section>
            <input 
                type="submit"
                value="Add Task" />
        </form>
    );
};


NewTaskInput.propTypes = {
    addTaskCallback: PropTypes.func.isRequired
};

export default NewTaskInput;