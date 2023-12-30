import React, { useEffect, useState } from 'react';

function Signup() {
  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await fetch('/api', { method: 'GET' });
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      const contentType = res.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        // If the response is not JSON, handle it accordingly (e.g., show an error message)
        throw new Error('Invalid response format. Expected JSON.');
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., set a state variable to display an error message
    }
  };
    fetchData();
  })
  const [userData, setUserData] = useState({
    username: '',
    imgBase64: '', // Add other required fields here
    fullName: 'temp1 lew ',
    password: '12',
    email:'temp12@gmail.com'
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send all user data in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to create account. Please try again.');
      }

      const responseData = await response.json();
      console.log(responseData);
      // Handle successful response, e.g., redirect or show success message
    } catch (error) {
      const err = error as Error;
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Instagram username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />
        {/* Add similar input fields for other user data */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
