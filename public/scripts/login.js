document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
  
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      }, {withCredentials: true});
  
      window.location.href = '/profile';

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  });
  