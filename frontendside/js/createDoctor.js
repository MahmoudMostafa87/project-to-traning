document.getElementById('doctorForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    

    // const name = document.getElementById('name').value.trim();
    // const age = document.getElementById('age').value;
    // const email = document.getElementById('email').value.trim();
    // const phone = document.getElementById('phone').value.trim();
    
    const formdata=document.getElementById("doctorForm");
    const body=new FormData(formdata);
    
    try {
    
    fetch('http://localhost:4000/doctors/', {
        method: 'POST',
        body
    }).then(res =>{
        if (res.ok) {
            alert('تم إنشاء الطبيب بنجاح!');
            
                res.json().then(data=>{
                    let div=document.getElementById("messageBox")
                    div.innerHTML = `<h3 style="color:white;">رابط البريد التجريبي:</h3>
                    <a href="${data.url}" target="_blank" style="color:lightblue">${data.url}</a>`;
                });
        } else {
            res.json().then(data=>{
                alert(`فشل إنشاء الطبيب. يرجى المحاولة مرة أخرى.`)
                messageBox.innerHTML =`<h2> ${data.message} <h2>`
            });
        }
    
        setTimeout(()=>{
            window.history.back();
        },3000)
    
    });
    } catch (error) {
        alert('خطأ:', error);
        alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
    });
    