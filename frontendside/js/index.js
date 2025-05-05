const main = document.querySelector("main");

// Function to fetch the data from the API
function getData() {
    fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        if (!res.ok) {
            // Show alert if there is an error with the response
            alert("لم يتم العثور على البيانات.");
            throw new Error("Data not found");
        }
        return res.json();
    })
    .then(data => {
        // Check if the data is not empty
        if (data.length > 0) {
            showData(data);
        } else {
            alert("لا توجد بيانات لعرضها.");
        }
    })
    .catch(error => {
        // Show alert if there's a fetch error
        alert("حدث خطأ أثناء جلب البيانات: " + error.message);
    });
}

// Function to display the fetched data
function showData(data) {
    data.forEach(titleOfObject => {
        // Check if the object contains students
        if (titleOfObject.students) {
            titleOfObject.students.forEach(opj => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.id = opj._id;
                card.innerHTML = `
                    <h2>${opj.name}</h2><br>
                    <h2>${opj.age}</h2><br>
                    <h3>${opj.level}</h3><br>
                    <p>${opj.address}</p><br>
                `;
                main.appendChild(card);
            });
        } else {
            // If the object contains doctors
            titleOfObject.doctors.forEach(opj => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.id = opj._id;
                card.innerHTML = `
                    <h2>${opj.name}</h2><br>
                    <h2>${opj.age}</h2><br>
                    <h3>${opj.email}</h3><br>
                    <p>${opj.phone}</p><br>
                `;
                main.appendChild(card);
            });
        }
    });
}

// Call the function to fetch data when the page loads
getData();
