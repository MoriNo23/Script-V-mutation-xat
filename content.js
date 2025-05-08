browser.runtime.onMessage.addListener((message) => {
  let objeto1 = message.objeto;
  console.log("Mensaje recibido en content.js:", objeto1);
  buscar = objeto1;
});
let buscar = {};

let docIframe;
document.getElementById("appframe").addEventListener("load", function () {
  docIframe = this.contentDocument;
  if (docIframe !== undefined) {
    console.log("Document loaded");
  }
  var ContainerMsg = docIframe.getElementById("messagesContainer");

  var contador = 0;
  function buscarMensajes() {
    // Seleccionar todos los mensajes (ajusta el selector según sea necesario)
    var mensajesPv = docIframe.querySelectorAll('[class^="messageText"]');
    var textEntryEditable = docIframe.getElementById("textEntryEditable");

    if (
      mensajesPv[mensajesPv.length - 1].textContent.includes(buscar.buscar1) &&
      !mensajesPv[mensajesPv.length - 1].dataset.modificado
    ) {
      // Agregar el contador al mensaje existente
      mensajesPv[mensajesPv.length - 1].textContent += ` [ID:${contador}]`;
      mensajesPv[mensajesPv.length - 1].dataset.modificado = "true";
      contador++;

      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });

      textEntryEditable.textContent += buscar.buscar3;
      // 3. Crea y dispara el evento mejorado
      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
        composed: true,
      });
      textEntryEditable.dispatchEvent(enterEvent);
    }
  }
  // Configurar MutationObserver
  const observer = new MutationObserver(function (mutations) {
    // Verificar si hay cambios relevantes antes de buscar mensajes
    let domChanged = false;

    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        domChanged = true;
      }
    });

    if (domChanged) {
      buscarMensajes();
    }
  });

  // Configurar el observer
  observer.observe(ContainerMsg, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Ejecutar la primera búsqueda
  buscarMensajes();
});
