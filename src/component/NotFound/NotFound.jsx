import React from 'react';
import notFoundImg from '../../images/error.svg'

const NotFound = () => {
    return (
        <div className='d-flex align-items-center justify-content-center py-5'>
            <img src={notFoundImg} className='w-50' alt="" />
        </div>
    );
}

export default NotFound;
