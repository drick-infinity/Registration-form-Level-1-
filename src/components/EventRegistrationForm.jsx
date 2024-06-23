import React, { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  };
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }

  if (values.attendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required';
  }

  return errors;
};

const EventRegistrationForm = () => {
  const submitForm = () => {
    alert(JSON.stringify(values, null, 2));
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useForm(submitForm, validate);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Age:</label>
        <input
          type="number"
          name="age"
          value={values.age || ''}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Are you attending with a guest?</label>
        <select
          name="attendingWithGuest"
          value={values.attendingWithGuest || ''}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {values.attendingWithGuest === 'yes' && (
        <div className="mb-4">
          <label className="block text-gray-700">Guest Name:</label>
          <input
            type="text"
            name="guestName"
            value={values.guestName || ''}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
        </div>
      )}
      <button type="submit" className=" text-white tracking wider bg-gradient-to-r from-[#9021e3] via-[#379fef] to-[#5ffbf1] py-2 px-4 w-full rounded hover:bg-gradient-to-br font-bold transition duration-700 ease-in-out animate-fadeInUp">
        Submit
      </button>
      {isSubmitting && !Object.keys(errors).length && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Form Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default EventRegistrationForm;
