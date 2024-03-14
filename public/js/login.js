const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (!response.ok) {
          throw new Error('Failed to login');
        }
  
        document.location.replace('/dashboard');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to login');
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  