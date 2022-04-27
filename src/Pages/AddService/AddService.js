import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        fetch('http://localhost:5000/service', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
    };
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Add New Service </h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Service Name' {...register("name", { required: true, maxLength: 20 })} />
                <input className='mb-2' placeholder='Description' {...register("description",)} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price",)} />
                <input className='mb-2' placeholder='Photo URL' {...register("img",)} />
                <input type="submit" />
            </form>

        </div>
    );
};

export default AddService;