var contador = 0;

var style = document.createElement("style");
style.innerHTML = `
 .broder {
	height: 200px;
	width: 200px;
	background: rgba(99, 90, 78, 0.62);
	color: rgba(255, 222, 178, 0.62);
	float: left;
	transform: translate(97px, 64px);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 700;
	font-size: 1.2em;
	padding: 50px;
	position: absolute;
}
  .quitate {
  display: flex!important;
  }
`;
document.head.appendChild(style);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const objeto1 = message.objeto;
  console.log("Mensaje recibido en content.js:", objeto1);
  buscar = objeto1;
  contador = objeto1.reset;
  const groupNameElem = document.querySelector("#groupName");
  if (message) {
    groupNameElem.textContent = objeto1.buscar3;
    groupNameElem.style.cursor = "pointer"; // Opcional: cambia el cursor
    groupNameElem.addEventListener("click", function () {
      // Copia el texto del nodo al portapapeles
      navigator.clipboard
        .writeText(groupNameElem.textContent)
        .then(() => {
          const original = groupNameElem.textContent;
          groupNameElem.textContent = "¡Copiado!";
          setTimeout(() => {
            groupNameElem.textContent = original;
          }, 1000);
        })
        .catch((err) => {
          console.error("No se pudo copiar:", err);
        });
    });
  }
});
let buscar = {};

let docIframe;
document.getElementById("appframe").addEventListener("load", function () {
  docIframe = this.contentDocument;
  if (docIframe !== undefined) {
    console.log("Document loaded");
  }
  var ContainerMsg = docIframe.getElementById("messagesContainer");
  // Crea el aviso dentro del iframe
  var aviso = docIframe.createElement("div");
  docIframe.body.appendChild(aviso);
  aviso.classList.add("broder");
  var a_insertar = "";
  function actualizarAviso(texto) {
    a_insertar += texto + "\n";
    aviso.textContent = a_insertar;
  }

  docIframe.body.classList.add("quitate");

  function buscarMensajes() {
    // Seleccionar todos los mensajes (ajusta el selector según sea necesario)
    var Indicador = docIframe.querySelectorAll(".userNick");

    var mensajesPv = docIframe.querySelectorAll('[class^="messageText"]');
    var textEntryEditable = docIframe.getElementById("textEntryEditable");

    if (
      mensajesPv[mensajesPv.length - 1].textContent.includes(buscar.buscar1) &&
      !mensajesPv[mensajesPv.length - 1].dataset.modificado
    ) {
      contador++;

      actualizarAviso(`ha aparecido ${buscar.buscar1}`);

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
      mensajesPv[mensajesPv.length - 1].textContent.includes(buscar.buscar2) &&
      !mensajesPv[mensajesPv.length - 1].dataset.modificado
    ) {
      contador++;

      actualizarAviso(`ha aparecido ${buscar.buscar2}`);
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
