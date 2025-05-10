var contador = 0;

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const objeto1 = message.objeto;
  console.log("Mensaje recibido en content.js:", objeto1);
  buscar = objeto1;
  contador = objeto1.reset;
});
let buscar = {};

let docIframe;
document.getElementById("appframe").addEventListener("load", function () {
  docIframe = this.contentDocument;
  if (docIframe !== undefined) {
    console.log("Document loaded");
  }
  var ContainerMsg = docIframe.getElementById("messagesContainer");

  function buscarMensajes() {
    // Seleccionar todos los mensajes (ajusta el selector según sea necesario)
    var mensajesPv = docIframe.querySelectorAll('[class^="messageText"]');
    var textEntryEditable = docIframe.getElementById("textEntryEditable");

    if (
      mensajesPv[mensajesPv.length - 1].textContent === buscar.buscar1 &&
      !mensajesPv[mensajesPv.length - 1].dataset.modificado
    ) {
      contador++;

      // se envia el estado actual del contador
      browser.runtime.sendMessage({
        contador: contador,
        data: "Mensaje recibido en content.js",
      });

      if (contador == 2) {
        mensajesPv[mensajesPv.length - 1].textContent = `Ganaste con: ${
          buscar.buscar3
        } ${mensajesPv[mensajesPv.length - 1].textContent}`;
      }
      // Agregar el contador al mensaje existente
      /*  mensajesPv[mensajesPv.length - 1].textContent += ` [ID:${contador}]`; */
      mensajesPv[mensajesPv.length - 1].dataset.modificado = "true";

      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });

      /* textEntryEditable.textContent += buscar.buscar3;
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
      textEntryEditable.dispatchEvent(enterEvent); */
    }
    if (
      mensajesPv[mensajesPv.length - 1].textContent === buscar.buscar2 &&
      !mensajesPv[mensajesPv.length - 1].dataset.modificado
    ) {
      contador++;

      // se envia el estado actual del contador
      browser.runtime.sendMessage({
        contador: contador,
        data: "Mensaje recibido en content.js",
      });

      if (contador == 2) {
        mensajesPv[mensajesPv.length - 1].textContent = `Ganaste con: ${
          mensajesPv[mensajesPv.length - 1].textContent
        }`;
      }
      // Agregar el contador al mensaje existente
      mensajesPv[mensajesPv.length - 1].textContent += ` [ID:${contador}]`;
      mensajesPv[mensajesPv.length - 1].dataset.modificado = "true";

      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
      new Notification(`Mensaje modificado - ID: ${contador}`, {
        body: `Texto: ${mensajesPv[mensajesPv.length - 1].textContent}`,
      });
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
