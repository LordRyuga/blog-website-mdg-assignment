document.getElementById('signUp').addEventListener('click', async () => {
    const username = document.getElementById('uid-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('pwd-signup').value;


    if(username && email && password)
    {
      try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
          password,
        });
    
        alert(res.data.message || 'Signup successful');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Signup error');
      }
    }
  });
  