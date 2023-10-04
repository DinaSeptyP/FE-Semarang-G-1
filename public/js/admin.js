const hostUrl = "https://be-semarang-g-1-production.up.railway.app";
const token = localStorage.getItem('token')

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
  if (!token) {
      // Token not found, balik ke halaman login
      window.location.href = 'https://dinaseptyp.github.io/FE-Semarang-G-1.github.io/admin/login.html';
  } else {
      // Kirim permintaan GET ke server dengan token
      fetch(`${hostUrl}/api/admin/data`, {
          method: 'GET',
          headers: {
              'authorization': `Bearer ${token}` // Kirim token dalam header "Authorization"
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
  }
});

///////////// PAGE DATA /////////////

document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('table-body-data');
  fetch(`${hostUrl}/api/admin/data/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      const messages = data.messages;

      messages.forEach((message) => {
        const newRow = document.createElement('tr');
        const dataElement = `
          <td style="text-align: center;">${message.data_id}</td>
          <td>${message.name}</td>
          <td>${message.email}</td>
          <td>${message.message}</td>
          <td>${message.review}</td>
          <td>
            <center>
              <button onclick="editButtonClick('${message.data_id}')" style="width: 47%; height: 20px; border: 1px solid; background: #28a745; border-radius: 5px; color: #e9f4fb; font-weight: 500; cursor: pointer; outline: none;">
                Edit
              </button>
              <button onclick="deleteButtonClick('${message.data_id}')" style="width: 47%; height: 20px; border: 1px solid; background: #dc3545; border-radius: 5px; color: #e9f4fb; font-weight: 500; cursor: pointer; outline: none;">
                Delete
              </button>
            </center>
          </td>
        `;
        newRow.innerHTML = dataElement;
        tableBody.append(newRow);
      });
    } else {
      console.error('Error fetching data:', data.error);
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
});


function editButtonClick(postId) {
  // Get modal
  var modal = document.getElementById("myModal");
  
  // Get elemen <span> untuk menutup modal
  var span = document.getElementsByClassName("close")[0];
  
  // Saat user klik button, modal muncul 
  modal.style.display = "block";
  
  // User klik <span> (x) untuk menutup modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // Modal tertutup saat user klik di luar modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
  // Kirim permintaan untuk mengambil data dari server yang ditampilkan di form
  fetch(`${hostUrl}/api/admin/data/${postId}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
        document.getElementById("data_id").value = data.data_id;
        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("message").innerText = data.message;
        document.getElementById("review").value = data.review;
  
      // Menampilkan modal
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
  
function submitEditButtonClick(postId, event) {
    event.preventDefault();

    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        review: document.getElementById('review').value,
        postId: postId,
    };
    fetch(`${hostUrl}/api/admin/data/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log('Data updated:', data);
        // Navigate ke seluruh data setelah berhasil update
        window.location.href = 'https://dinaseptyp.github.io/FE-Semarang-G-1.github.io/admin/data.html';
        })
        .catch((error) => {
        console.error('Error updating data:', error);
        });
    }

function deleteButtonClick(postId) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
    fetch(`${hostUrl}/api/admin/data/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
      },
    })
        .then((response) => response.json())
        .then((data) => {
        // Navigate ke /admin/data
        window.location.href = 'https://dinaseptyp.github.io/FE-Semarang-G-1.github.io/admin/data.html';
        alert('Data berhasil dihapus');
        })
        .catch((error) => {
        console.error('Error deleting data:', error);
        });
    }
}


