const config = {
  buscar1: "",
  buscar2: "",
  buscar3: "",
};

document.getElementById("miform").addEventListener("submit", function (event) {
  // Prevenir el envío del formulario
  event.preventDefault();
  const campos = ["buscar1", "buscar2", "buscar3"];

  campos.forEach((campo) => {
    config[campo] = document.getElementById(campo).value; // Actualiza config
  });

  // Obtener la pestaña activa y enviar el mensaje
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const tabId = activeTab.id;

    // Enviar un mensaje al script de contenido en la pestaña activa
    browser.tabs.sendMessage(tabId, { objeto: config });

    // Limpiar los campos después de enviar el mensaje
    campos.forEach((campo) => {
      document.getElementById(campo).value = ""; // Limpiar el campo
    });
  });
});
document.getElementById("reset").addEventListener("click", () => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const tabId = activeTab.id;

    // Enviar un mensaje al script de contenido en la pestaña activa
    browser.tabs.sendMessage(tabId, { objeto: config });
  });
});
