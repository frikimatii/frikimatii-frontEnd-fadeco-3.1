document.getElementById('loginBtn').addEventListener('click', handleLogin);
document.getElementById('registerBtn').addEventListener('click', handleRegister);

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    console.log('Intentando iniciar sesión:', { username, password });
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      console.log('Respuesta del servidor:', response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        document.getElementById('message').textContent = errorData.message || 'Error desconocido';
        return;
      }
  
      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);
      localStorage.setItem('token', data.token);
      alert('Inicio de sesión exitoso');
      document.getElementById('loader').style.display = 'block';
      window.location.href = 'inicio.html';
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
      document.getElementById('message').textContent = 'Error al comunicarse con el servidor';
    }
  }

async function handleRegister() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    console.log('Intentando registrar:', { username, password });
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      console.log('Respuesta del servidor:', response);
  
      const data = await response.json();
      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        document.getElementById('message').textContent = data.message || 'Error desconocido';
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
      document.getElementById('message').textContent = 'Error al comunicarse con el servidor';
    }
  }