const hostUrl = "https://be-semarang-g-1-production.up.railway.app";
const token = localStorage.getItem('token');

///////////// PAGE LOGIN /////////////

function submitLogin(event) {
    event.preventDefault();
  
    const loginData = {
        usernameLogin: document.getElementById('usernameLogin').value,
        emailLogin: document.getElementById('emailLogin').value,
        passwordLogin: document.getElementById('passwordLogin').value,
    };
  
    // Kirim permintaan POST ke server
    fetch(`${hostUrl}/api/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            const token = data.token; //token from server
            localStorage.setItem('token', token); // save to local storage
            document.cookie = `token=${token}`
            window.location.href = 'https://dinaseptyp.github.io/FE-Semarang-G-1.github.io/admin/data.html';
        } else {
            alert('Login gagal. Periksa kembali username dan password Anda.');
        }
        })
        .catch((error) => {
        console.error('Error during login:', error);
        });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token'); // token from Local storage
    // Kirim permintaan GET ke server dengan token
    fetch(`${hostUrl}/api/admin/data`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Kirim token dalam header "Authorization"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});