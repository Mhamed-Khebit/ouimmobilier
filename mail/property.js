function emailSendProperty() {
    const form = document.getElementById("propertyForm");
    const formData = new FormData(form);
  
    // convert FormData to JSON for text fields
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      propertyType: formData.get("propertyType"),
      transaction: formData.get("transaction"),
      location: formData.get("location"),
      surface: formData.get("surface"),
      price: formData.get("price"),
      description: formData.get("description"),
    };
  
    // handle files
    const files = formData.getAll("file");
    const attachments = [];
    files.forEach((file) => {
      attachments.push({
        filename: file.name,
        content: file,
      });
    });
  
    fetch("/api/sendProperty", {
      method: "POST",
      body: JSON.stringify({ data, attachments }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.message) {
          swal("Success", resp.message, "success");
          form.reset();
          document.getElementById("file-list").innerHTML = "";
          document.getElementById("file-counter").textContent = "0 / 3 photos ajoutées";
        } else {
          swal("Error", resp.error, "error");
        }
      })
      .catch((err) => {
        console.error(err);
        swal("Error", "Failed to send email!", "error");
      });
  }
  