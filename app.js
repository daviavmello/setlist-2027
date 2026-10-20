const form = document.getElementById("song-form");
const submitButton = document.getElementById("submit-button");
const buttonLabel = submitButton.querySelector(".button-label");
const status = document.getElementById("form-status");
const endpoint = "https://formsubmit.co/ajax/thedavimello@gmail.com";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  status.textContent = "";
  status.className = "form-status";
  submitButton.disabled = true;
  buttonLabel.textContent = "Enviando...";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Falha no envio");

    const result = await response.json();
    if (result.success === false || result.success === "false") {
      throw new Error("Serviço recusou o envio");
    }

    form.reset();
    status.textContent = "Sugestão enviada! Obrigado por compartilhar essa música com a gente.";
    status.classList.add("success");
  } catch (error) {
    console.error("Não foi possível enviar a sugestão:", error);
    status.textContent = "Não foi possível enviar sua sugestão agora. Tente novamente em alguns instantes.";
    status.classList.add("error");
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = "Enviar sugestão";
  }
});
