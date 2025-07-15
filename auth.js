const secureAdmin = () => {
  const user = localStorage.getItem('admin-auth');
  if(!user || user !== 'AUTH_TOKEN') {
    window.location.href = 'login.html';
  }
};

const login = (password) => {
  if(password === 'YOUR_SECURE_PASSWORD') {
    localStorage.setItem('admin-auth', 'AUTH_TOKEN');
    return true;
  }
  return false;
};