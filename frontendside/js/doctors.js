const doctorsContainer = document.getElementById("doctors-container");

async function fetchDoctors() {
    try {
        const response = await fetch("http://localhost:4000/doctors/");
        const doctors = await response.json();

        const container = document.getElementById("doctors-container");
        doctors.forEach((doctor) => {
            const imageSrc = (doctor.fileInfo.path && doctor.fileInfo)? doctor.fileInfo.path : "../image/default.png";
            const doctorCard = document.createElement("div");
            doctorCard.className = "doctor-card";
            doctorCard.innerHTML = `
            <img src="${imageSrc}" alt="not have image" width="300px">
                <h3>${doctor.name}</h3>
                <p><strong>Email:</strong> ${doctor.email}</p>
                <p><strong>Age:</strong> ${doctor.age} years</p>
                <p><strong>Phone:</strong> ${doctor.phone}</p>
                <button class="profile" data-id=${doctor._id}>Profile</button>
                <button class="update_profile" data-id=${doctor._id}>Update</button>
                <button class="delete_profile" data-id=${doctor._id}>Delete</button>
            `;
            container.appendChild(doctorCard);
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}

fetchDoctors();

function getSpcificDoctor(id) {
    fetch(`http://localhost:4000/doctors/${id}`)
        .then((res) => res.json())
        .then((data) => {
            sessionStorage.setItem("id", JSON.stringify(data._id));
            window.location.href = "spcificDoctor.html";
        });
}

function deleteDoctor(id) {
    fetch(`http://localhost:4000/doctors/${id}`, {
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
            alert(data.message || "تم حذف الطبيب.");
            location.reload(); // reload to reflect changes
        });
}

doctorsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("profile")) {
        getSpcificDoctor(e.target.dataset.id);
    } else if (e.target.classList.contains("update_profile")) {
        sessionStorage.setItem("id", e.target.dataset.id);
        window.location.href = "updateDoctor.html";
    } else if (e.target.classList.contains("delete_profile")) {
        deleteDoctor(e.target.dataset.id);
    }
});