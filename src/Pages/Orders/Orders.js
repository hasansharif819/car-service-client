import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect( () => {
        const getOrders = async() => {
            const email = user.email;
            console.log(user.email)
            const url = `http://localhost:5000/orders?email=${email}`;
           try{
            const {data} = await axios.get(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOrders(data);
           }
           catch(error){
            console.log(error.message);
            if(error.response.status === 401 || 403){
                signOut(auth);
                navigate('/login');
            }
           }
        }
        getOrders();
    }, [user])
    return (
        <div>
            <h2>Your Total Orders is: {orders.length}</h2>
        </div>
    );
};

export default Orders;