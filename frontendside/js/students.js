const studentContainer = document.getElementById("student-container");

async function fetchstudent() {
  try {
    const response = await fetch("http://localhost:4000/student/");
    const student = await response.json();

    student.forEach((student) => {
      const imageSrc = (student.fileInfo.path && student.fileInfo)? student.fileInfo.path : "../image/default.png";
      const studentCard = document.createElement("div");
      studentCard.className = "student-card";
      studentCard.innerHTML = `
      <img src="${imageSrc}" alt="not have image" width="300px">
          <h3>${student.name}</h3>
          <p><strong>Age:</strong> ${student.age} years</p>
          <p><strong>Level:</strong> ${student.level}</p>
          <p><strong>Address:</strong> ${student.address}</p>
          <button class="profile" data-id=${student._id}>Profile</button>
          <button class="update_profile" data-id=${student._id}>Update</button>
          <button class="delete_profile" data-id=${student._id}>Delete</button>
      `;
      studentContainer.appendChild(studentCard);
    });
  } catch (error) {
    console.error("Error fetching student:", error);
  }
}

fetchstudent();

function deleteStudent(id) {
  fetch(`http://localhost:4000/student/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      sessionStorage.removeItem("id");
      alert(data.message);
      location.reload(); // reload to reflect changes
    });
}

function getSpcificStudent(id) {
  fetch(`http://localhost:4000/student/${id}`)
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem("id", data._id);
      window.location.href = "./spcificStudent.html";
    });
}

studentContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("profile")) {
    getSpcificStudent(e.target.dataset.id);
  } else if (e.target.classList.contains("update_profile")) {
    sessionStorage.setItem("id", e.target.dataset.id);
    window.location.href = "./updateStudent.html";
  } else if (e.target.classList.contains("delete_profile")) {
    deleteStudent(e.target.dataset.id);
  }
});