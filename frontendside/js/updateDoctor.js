
let id = sessionStorage.getItem("id");
if (!id) {
  alert("لا يوجد معرف للطبيب في الجلسة!");
  window.location.href = "doctors.html";
}

if(id.charAt(0)==="\"")//because quotaion have a value and i need delete it
  id=id.split("\"")[1];
 
fetch(`http://localhost:4000/doctors/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((doctor) => {
    document.getElementById("name").value = doctor.name;
    document.getElementById("age").value = doctor.age;
    document.getElementById("phone").value = doctor.phone;
    document.getElementById("email").value = doctor.email;
  })
  .catch((err) => {
    alert("فشل في تحميل بيانات الطبيب");
    console.error(err);
  });


  document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;

  fetch(`http://localhost:4000/doctors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age, phone, email }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("فشل التحديث");
    })
    .then((data) => {
      alert(data.message);
      window.history.back();
    })
    .catch((ex) => {
      alert("حدث خطأ: " + ex.message);
      console.error(ex);
    });
});