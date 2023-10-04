// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//Klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

const btn = document.getElementById('btn'); 

btn.addEventListener('click', () => {
  const name = document.getElementById('input-name').value;
  const email = document.getElementById('input-email').value;
  const message = document.getElementById('input-message').value;

  if (!name || !email || !message) {
      Swal.fire({
          title: 'Required',
          text: 'Please fill in all fields.',
          icon: 'info',
      });
      return;
  } else {
    Swal.fire({
      title: 'Thank you for submitting!',
      text: 'We got your message.',
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        
        fetch('https://be-semarang-g-1-production.up.railway.app/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log(data);
            } else {
              console.error('Error sending data to the server:', data.error);
            }
          })
          .catch((error) => {
            console.error('Error sending data to the server:', error);
          });
      }
  });
  }
});