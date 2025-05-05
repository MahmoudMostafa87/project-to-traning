
let id = sessionStorage.getItem("id");
if (!id) {
  alert("لا يوجد معرف الطالب في الجلسة!");
  window.location.href = "student.html";
}

if(id.charAt(0)==="\"")//because quotaion have a value and i need delete it
  id=id.split("\"")[1];
 
fetch(`http://localhost:4000/student/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((student) => {
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("level").value = student.level;
    document.getElementById("address").value = student.address;
  });

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const level = document.getElementById("level").value;
  const address = document.getElementById("address").value;

  fetch(`http://localhost:4000/student/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age, level, address }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      alert(data.message);
      window.history.back();
    })
    .catch((ex) => {
      alert("حدث خطأ: " + ex.message);
    });
});