function emailSendProperty() {
  const form = document.getElementById("propertyForm");
  const formData = new FormData(form);
  
  // Convert form fields to JSON
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

  // Send form data to API
  fetch("/api/sendProperty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.message) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: resp.message,
          confirmButtonColor: "#112E4C",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: resp.error || "Erreur lors de l'envoi !",
          confirmButtonColor: "#112E4C",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de l'envoi de l'email !",
        confirmButtonColor: "#112E4C",
      });
    });
}
