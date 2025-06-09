import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthdate: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};

    if (!user.name) {
      errors.name = 'Name is required';
    }

    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid';
    }

    if (!user.password) {
      errors.password = 'Password is required';
    }

    if (!user.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(user.phone)) {
      errors.phone = 'Phone number must have only 10 numbers';
    }

    if (!user.address) {
      errors.address = 'Address is required';
    }

    if (!user.birthdate) {
      errors.birthdate = 'Date of birth is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validate()) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/add-user', user);
      setMessage(res.data.message);
      setUser({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        birthdate: '',
      });
      setErrors({}); // Clear errors after successful submission
    } catch (error) {
      setMessage(error.response?.data.error || 'Error adding user');
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='mb-3'>Add User</h2>
      {/* Show the alert if the form submitted successfully or not */}
      {message && <div className='alert alert-info'>{message}</div>}
      <form onSubmit={handleSubmit} className='row g-3'>
        <div className='col-sm-12'>
          <input
            type='text'
            name='name'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder='Name'
            value={user.name}
            onChange={handleChange}
          />
          {/* Show error messages */}
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>
        <div className='col-sm-12'>
          <input
            type='email'
            name='email'
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder='Email'
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className='invalid-feedback'>{errors.email}</div>
          )}
        </div>
        <div className='col-sm-12'>
          <input
            type='password'
            name='password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder='Password'
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className='invalid-feedback'>{errors.password}</div>
          )}
        </div>
        <div className='col-sm-12'>
          <input
            type='tel'
            name='phone'
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder='Phone'
            value={user.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className='invalid-feedback'>{errors.phone}</div>
          )}
        </div>
        <div className='col-sm-12'>
          <input
            type='text'
            name='address'
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder='Address'
            value={user.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div className='invalid-feedback'>{errors.address}</div>
          )}
        </div>
        <div className='col-sm-12'>
          <input
            type='date'
            name='birthdate'
            className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
            value={user.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && (
            <div className='invalid-feedback'>{errors.birthdate}</div>
          )}
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
