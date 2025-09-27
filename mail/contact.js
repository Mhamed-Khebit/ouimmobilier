



function emailSend() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            swal("Success", data.message, "success");
            document.getElementById("contactForm").reset();
        } else {
            swal("Error", data.error, "error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        swal("Error", "Failed to send email!", "error");
    });
}
