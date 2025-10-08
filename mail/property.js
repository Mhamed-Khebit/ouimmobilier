async function emailSendProperty() {
  const form = document.getElementById("propertyForm");
  const formData = new FormData(form);

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

  try {
    const res = await fetch("/api/sendProperty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.message) {
      Swal.fire("Succès", result.message, "success");
      form.reset();
      document.getElementById("file-list").innerHTML = "";
      document.getElementById("file-counter").textContent = "0 / 3 photos ajoutées";
    } else {
      Swal.fire("Erreur", result.error || "Erreur lors de l'envoi !", "error");
    }
  } catch (err) {
    console.error("Error:", err);
    Swal.fire("Erreur", "Échec de l'envoi de l'email !", "error");
  }
}
