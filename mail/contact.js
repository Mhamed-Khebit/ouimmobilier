// function emailSend() {
//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');
//     const phoneInput = document.getElementById('phone');
//     const subjectInput = document.getElementById('subject');
//     const messageInput = document.getElementById('message');

//     const name = nameInput.value;
//     const email = emailInput.value;
//     const phone = phoneInput.value;
//     const subject = subjectInput.value;
//     const message = messageInput.value;

//     fetch("http://localhost:3000/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, phone, subject, message })
//     })
//     .then(response => response.text().then(text => ({ status: response.status, text })))
//     .then(({ status, text }) => {
//         if (status === 200) {
//             swal("Success", text, "success");

//             // Clear the input fields
//             nameInput.value = "";
//             emailInput.value = "";
//             phoneInput.value = "";
//             subjectInput.value = "";
//             messageInput.value = "";
//         } else {
//             swal("Error", text, "error");
//         }
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         swal("Error", "Failed to send email!", "error");
//     });
// }




function emailSend() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch("/api/send", {   // ✅ no localhost
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            swal("Success", data.message, "success");
            document.getElementById("contactForm").reset(); // ✅ clear form
        } else {
            swal("Error", data.error, "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        swal("Error", "Failed to send email!", "error");
    });
}
