const h31 = document.getElementById("h31");
const h32 = document.getElementById("h32");
const h33 = document.getElementById("h33");
const h34 = document.getElementById("h34");

let id = sessionStorage.getItem("id");
if (!id) {
  alert("لا يوجد معرف للطالب في الجلسة!");
  window.location.href = "student.html";
}

if(id.charAt(0)==="\"")//because quotaion have a value and i need delete it
  id=id.split("\"")[1];

fetch(`http://localhost:4000/doctors/${JSON.parse(id)}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    h31.innerText = data.name;
    h32.innerText = data.age;
    h33.innerText = data.phone;
    h34.innerText = data.email;
  });

function deleteData(id) {
  fetch(`http://localhost:4000/doctors/${JSON.parse(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((message) => {
      sessionStorage.removeItem("id");
      alert(message.message);
        window.history.back();
    })
    .catch((err) => alert(err));
}

document.getElementById("delete").addEventListener("click", () => {
  deleteData(id);
});