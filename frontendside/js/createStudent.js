document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    // this code before add field input file 
    // const name = document.getElementById('name').value.trim();
    // const age = document.getElementById('age').value;
    // const level = document.getElementById('level').value.trim();
    // const address = document.getElementById('address').value.trim();
    
    const form=document.getElementById("studentForm");
    const body=new FormData(form);//this will deal with all form data automaticly
    
    try {
    
    fetch('http://localhost:4000/student/addStudent', {
        method: 'POST',
        body
        }).then(res =>{
        if (res.ok) {
                   
            alert('تم إنشاء الطالب بنجاح!');
            
            res.json().then(data=>{
                    let div=document.getElementById("messageBox")
                    div.innerHTML = `<h3 style="color:white;">${data.message}</h3>`
                    // let div=document.getElementById("messageBox") when add email in student
                    // div.innerHTML = `<h3 style="color:white;">رابط البريد التجريبي:</h3>
                    // <a href="${data.url}" target="_blank" style="color:lightblue">${data.url}</a>`;
                });
            } else {
                alert(`فشل إنشاء الطالب. يرجى المحاولة مرة أخرى.`)
                res.json().then(data=>{
                    let div=document.getElementById("messageBox")
                    div.innerHTML = `<h3 style="color:white;">${data.message}</h3>`
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
    