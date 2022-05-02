import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            service: service.name,
            serviceId: serviceId,
            email: user.email,
            name: user.displayName,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(Response => {
            const {data} = Response;
            if(data.insertedId){
                toast('You are successfully Booked your order');
                event.target.reset();
            }
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mx-auto mb-2' type="text" value={user?.displayName} name='name' placeholder='name' required readOnly disabled/>
                <br />
                <input className='w-100 mx-auto mb-2' type="email" value={user?.email} name='email' placeholder='email' required readOnly disabled/>
                <br />
                <input className='w-100 mx-auto mb-2' type="text" value={service.name} name='service' placeholder='service' required readOnly disabled/>
                <br />
                <input className='w-100 mx-auto mb-2' type="text" name='address' placeholder='address' autoComplete='off' required/>
                <br />
                <input className='w-100 mx-auto mb-2' type="text" name='phone' placeholder='phone' required/>
                <br />
                
                <input className='btn btn-primary' type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Checkout;