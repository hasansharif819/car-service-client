import React from 'react';
import useServices from '../../hooks/useServices';

const ManageService = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure');
        if(proceed){
            const url = `http://localhost:5000/service/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining);
            })
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Manage Services</h2>
            {
                services.map(service => <div
                    key={service._id}>
                    <li>
                        {service.name}
                        <button onClick={() => handleDelete(service._id)}>Delete</button>
                    </li>
                </div>)
            }
        </div>
    );
};

export default ManageService;