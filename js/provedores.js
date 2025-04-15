async function mostrarContenido(nombre) {

  function generarSelector(pieza) {
    let opcionesSelect = `<option value="">Seleccione Una Pieza</option>`;
  
    // Ordenar alfabéticamente (ignorando mayúsculas/minúsculas)
    const piezasOrdenadas = pieza.slice().sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  
    piezasOrdenadas.forEach((pieza) => {
      opcionesSelect += `<option value="${pieza}">${pieza}</option>`;
    });
  
    return opcionesSelect;
  }

  const contenedor = document.getElementById("contenedorprovedores");

  if (!contenedor) {
    console.error("Elemento 'contenedorprovedores' no encontrado.");
    return;
  }

  // Limpiar el contenedor antes de agregar nueva tabla y elementos
  contenedor.innerHTML = ``;

  // Crear un contenedor de diseño flexbox para organizar tabla y botones
  const layoutDiv = document.createElement("div");
  layoutDiv.style.display = "flex";
  layoutDiv.style.gap = "10px";
  layoutDiv.style.alignItems = "start"; // Alinea los elementos en la parte superior

  // Crear contenedor para la tabla
  const tablaDiv = document.createElement("div");
  layoutDiv.appendChild(tablaDiv);

  const titulotabla = document.createElement("p")
  titulotabla.id = "tituloProvedoresTabla"
  titulotabla.innerText = "Tabla"
  contenedor.appendChild(titulotabla)
  // Crear contenedor para los botones
  const divLay = document.createElement("div");
  divLay.style.display = "flex";
  divLay.style.flexDirection = "column";
  divLay.style.gap = "5px"; // Espacio entre botones
  layoutDiv.appendChild(divLay);

  ///OTROS BOTONS
  const botonesVarios = document.createElement("div");
  layoutDiv.appendChild(botonesVarios);


  
  // Agregar el contenedor de layout al contenedor principal
  contenedor.appendChild(layoutDiv);

  let columnas = [
    { title: "Nombre", field: "nombre" },
    { title: "Cantidad", field: "cantidad" },
  ];
  
  function mostrarJson(provedor, cajasbox) {
    fetch(`http://localhost:5000/api/historialProvedores/${provedor}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener historial");
        }
        return response.json();
      })
      .then(data => {
        const historial = document.createElement("div");
        historial.classList.add("historial-contenedor");
  
        historial.innerHTML = `
          <div class="historial-columnas">
            <div class="columna-envios">
              <strong>📦 Envíos:</strong>
              <ul>${data.envios.map(e => `<li>${e}</li>`).join("")}</ul>
            </div>
            <div class="columna-entregas">
              <strong>📬 Entregas:</strong>
              <ul>${data.entregas.map(e => `<li>${e}</li>`).join("")}</ul>
            </div>
          </div>
        `;
  
        cajasbox.appendChild(historial);
      })
      .catch(err => {
        console.error("❌ Error:", err.message);
      });
  }
  
  data = [];

  switch (nombre) {
    case "Soldador":
      const caja = document.createElement("div");
      const botonerBases = document.createElement("div");
      const piezaSoldador = [
        "baseInox330",
        "baseInox300",
        "baseInox250",
        "basePintada330",
        "basePintada300",
        "baseInoxECO",
        "CajaSoldadaEco",
      ];
      let bttt = document.createElement("div");
      
      const opcionesSelect = generarSelector(piezaSoldador);

      const html = `
      <div>
          <p>Stock Soldador</p>
          <div class="boxBtnStock">
              <button class='enFabrica' data-tipo="StockEnFabrica" >En Fabrica</button>
              <button class='enSoldador' data-tipo="StockEnSoldador" >En Soldador</button>
              <button class='enFabricaTerminado' data-tipo="StockTerminado" >En Terminado</button>
          </div>
    
          <div id="enviosALSoldador" class="container-enviosSoldador">
              <p>Envios al Soldador</p>
              <div class="row">
                  <label>Enviar</label>
                  <select id="soldadorEnvios" class="selector">${opcionesSelect}</select>
              </div>
              <div class="row">
                  <label>Cantidad:</label>
                  <input id="cantidadEnvios" class="cantidades" type="number" min="0" required>
                  <button id="btnEnviarSoldador">Enviar</button>
              </div>
          </div>
    
          <div class="container-enviosSoldador">
              <p>Entregas del Soldador</p>
              <div class="row">
                  <label>Enviar</label>
                  <select id="soldadorEntrega" class="selector">${opcionesSelect}</select>
              </div>
              <div class="row">
                  <label>Cantidad:</label>
                  <input  id="cantidadEntrega" class="cantidades" type="number" min="0" required>
                  <button id="btnEntrega">Enviar</button>
              </div>
          </div>
      </div>`;

      const html2 = `
      <div>
          <p>Piezas Para El Soldador</p>
          <table>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="baseInox330">Inox 330</button></td>
                  <td><button class="botonesPiezas" data-tipo="baseInox300">Inox 300</button></td>
                   <td><button class="botonesPiezas" data-tipo="basePintada300">Pintada 300</button></td>
              </tr>
              <tr>
                 

              </tr>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="baseInox250">Inox 250</button></td>
                  <td><button class="botonesPiezas" data-tipo="baseInoxECO">Inox ECO</button></td>
                  <td><button class="botonesPiezas" data-tipo="basePintada330">Pintada 330</button></td>
              </tr>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="CajaMotor_ECO">Caja Eco</button></td>
              </tr>
          </table>
      </div>`;

      caja.innerHTML = html;
      botonerBases.innerHTML = html2;

      layoutDiv.appendChild(caja);
      caja.appendChild(botonerBases);
      layoutDiv.appendChild(bttt)
      
      async function cargarDatosTablas(url, piezasPorCategoria) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Error al responder el servidor");

          const datosAPI = await res.json();
          let datosTabla = [];

          for (let categoria in piezasPorCategoria) {
            piezasPorCategoria[categoria].forEach((nombrePieza) => {
              let piezaEncontrada = datosAPI.find(
                (p) => p.nombre === nombrePieza
              );
              let cantidad =
                piezaEncontrada?.cantidad?.[categoria]?.cantidad || 0;
              datosTabla.push({ nombre: nombrePieza, cantidad });
            });
          }

          new Tabulator(tablaDiv, {
            height: 500,
            layout: "fitColumns",
            data: datosTabla,
            initialSort: [{ column: "nombre", dir: "asc" }],
            columns: [
              { title: "Nombre", field: "nombre" },
              { title: "Cantidad", field: "cantidad" },
            ],
          });
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        }
      }

      const piezasPorTipo = {
        baseInox250: {
          url: "http://localhost:5000/api/baseSoldador/baseInox250",
          piezas: {
            plasma: ["ChapaBase 250Inox"],
            plegadora: ["Lateral i250 contecla", "Lateral i250 sintecla"],
            balancin: ["Planchuela 250"],
            corte: ["Varilla 250"],
            augeriado: ["PortaEje"],
          },
        },
        baseInoxECO: {
          url: "http://localhost:5000/api/baseSoldador/baseInoxECO",
          piezas: {
            plasma: ["ChapaBase 330Inox"],
            plegadora: ["Lateral i330 eco", "Lateral i330 sintecla"],
            balancin: ["Planchuela 330"],
            corte: ["Varilla 330"],
            augeriado: ["PortaEje"],
          },
        },
        baseInox330: {
          url: "http://localhost:5000/api/baseSoldador/baseInox330",
          piezas: {
            plasma: ["ChapaBase 330Inox"],
            plegadora: ["Lateral i330 contecla", "Lateral i330 sintecla"],
            balancin: ["Planchuela 330"],
            corte: ["Varilla 330"],
            augeriado: ["PortaEje"],
          },
        },
        baseInox300: {
          url: "http://localhost:5000/api/baseSoldador/baseInox300",
          piezas: {
            plasma: ["ChapaBase 300Inox"],
            plegadora: ["Lateral i300 contecla", "Lateral i300 sintecla"],
            balancin: ["Planchuela 300"],
            corte: ["Varilla 300"],
            augeriado: ["PortaEje"],
          },
        },
        basePintada330: {
          url: "http://localhost:5000/api/baseSoldador/basePintada330",
          piezas: {
            plasma: ["ChapaBase 330Pintada"],
            plegadora: ["Lateral p330 contecla", "Lateral p330 sintecla"],
            balancin: ["Planchuela 330"],
            corte: ["Varilla 330"],
            augeriado: ["PortaEje"],
          },
        },
        basePintada300: {
          url: "http://localhost:5000/api/baseSoldador/basePintada300",
          piezas: {
            plasma: ["ChapaBase 300Pintada"],
            plegadora: ["Lateral p300 contecla", "Lateral p300 sintecla"],
            balancin: ["Planchuela 300"],
            corte: ["Varilla 300"],
            augeriado: ["PortaEje"],
          },
        },
        CajaMotor_ECO: {
          url: "http://localhost:5000/api/baseSoldador/CajaMotor_ECO",
          piezas: {
            plasma: ["Pieza Caja Eco", "Media Luna"],
            corte: ["Planchuela Inferior", "Planchuela Interna"],
          },
        },
      };

      // Delegación de eventos para evitar problemas con elementos dinámicos
      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("botonesPiezas")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);

          if (!tablaDiv) {
            console.warn("No se encontró tablaDiv");
            return;
          }

          if (piezasPorTipo[tipo]) {
            await cargarDatosTablas(
              piezasPorTipo[tipo].url,
              piezasPorTipo[tipo].piezas
            );
          } else {
            console.warn("No se encontró el tipo:", tipo);
          }
        }
      });

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("enFabrica")) {

          titulotabla.innerText = "Tabla En Fabrica"

          try {
            const res = await fetch("http://localhost:5000/api/stockbruto");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnFabrica = await res.json();

            const piezasLista = {
              plasma: [
                "ChapaBase 330Inox",
                "ChapaBase 300Inox",
                "ChapaBase 330Pintada",
                "ChapaBase 300Pintada",
                "ChapaBase 250Inox",
                "Media Luna",
                "Pieza Caja Eco",
              ],
              plegadora: [
                "Lateral i330 contecla",
                "Lateral i330 sintecla",
                "Lateral i300 contecla",
                "Lateral i300 sintecla",
                "Lateral i250 contecla",
                "Lateral i250 sintecla",
                "Lateral p330 contecla",
                "Lateral p330 sintecla",
                "Lateral p300 contecla",
                "Lateral p300 sintecla",
                "Lateral i330 eco",
              ],
              corte: [
                "Varilla 300",
                "Varilla 330",
                "Varilla 250",
                "Planchuela Inferior",
                "Planchuela Interna",
              ],
              balancin: ["Planchuela 250", "Planchuela 300", "Planchuela 330"],
              augeriado: ["PortaEje"],
            };

            const datosTabla = piezaBrutoEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );
              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad, // Evitar undefined
              };
            });

            // Verifica que el div donde se mostrará la tabla exista
            if (!tablaDiv) {
              console.error("No se encontró el elemento con id 'tablaDiv'");
              return;
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error:", error);
          }
        } else if (event.target.classList.contains("enSoldador")) {
          titulotabla.innerText = "Tabla En Soldador"

          try {
            const res = await fetch("http://localhost:5000/api/stocksoldador");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              soldador: [
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco",
              ],
            };

            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("Nose enmcontes el elemento con Id TableID");
              return;
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        } else if (event.target.classList.contains("enFabricaTerminado")) {
          titulotabla.innerText = "Tabla Terminados "

          try {
            const res = await fetch("http://localhost:5000/api/stocksoldador");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              bruto: [
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco"
                
              ],
              augeriado: [],
            };
            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );
              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }
            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        }
      });

      document
      .getElementById("btnEnviarSoldador")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("soldadorEnvios");
        const inputCantidad = document.getElementById("cantidadEnvios");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = inputCantidad.value;
    
        if (piezaSeleccionada && cantidad > 0) {
          // PRIMER FETCH: Verifica y descuenta stock
          fetch(
            `http://localhost:5000/api/enviosSoldador/${piezaSeleccionada}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cantidad: cantidad }),
            }
          )
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                alert(errorData.mensaje); // <- CAMBIASTE "message" por "mensaje"
                throw new Error(errorData.mensaje); // igual acá
              });
            }
            return response.json();
          })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // SOLO si fue exitoso, ejecutamos el segundo fetch para guardar en historial
              return fetch("http://localhost:5000/api/envios/soldador", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((historialResponse) => {
              if (historialResponse && !historialResponse.ok) {
                return historialResponse.json().then((errorData) => {
                  console.warn("Error al guardar historial:", errorData.message);
                });
              }
            })
            .catch((error) => {
              console.error("Error general:", error.message);
            });
        } else {
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    

      document
        .getElementById("btnEntrega")
        .addEventListener("click", function () {
          const selectElement = document.getElementById("soldadorEntrega");
          const inputCantidad = document.getElementById("cantidadEntrega");

          const piezaSeleccionada = selectElement.value;
          const cantidad = inputCantidad.value;

          if (piezaSeleccionada && cantidad > 0) {
            fetch(
              `http://localhost:5000/api/entregasSoldador/${piezaSeleccionada}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ cantidad: cantidad }),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data.mensaje);
                alert(data.mensaje);
                inputCantidad.value = "";
              })
              .catch((error) => {
                console.log("Error:", error);
              });
              fetch("http://localhost:5000/api/entregas/soldador", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada
                })
              })
          } else {
            console.log(
              "Por favor, seleccione una pieza y una cantidad válida."
            );
            alert("Por favor, seleccione una pieza y una cantidad válida.");
          }
        });
        mostrarJson("soldador", bttt)

      break;

    case "Carmelo":
      const lista_piezas_carmerlo = [
        "Brazo 250",
        "Brazo 300",
        "Brazo 330",
        "Caja 250",
        "Caja 300",
        "Caja 330",
        "Cubrecuchilla 250",
        "Cubrecuchilla 300",
        "Cubrecuchilla 330",
        "Velero",
        "Vela 330",
        "Vela 250",
        "Vela 300",
        "Planchada 330",
        "Planchada 300",
        "Planchada 250",
        "Tapa Afilador",
        "Aro Numerador",
        "Tapa Afilador 250",
        "Teletubi 330",
        "Teletubi 300",
        "Teletubi 250",
        "baseInox330",
        "baseInox300",
        "baseInox250",
        "baseInoxECO",
        "Tapa Afilador Eco",
      ];

      const cajaCarmelo = document.createElement("div");
      let envioCarmerlo = document.createElement("div");
      let entregaCarmerlo = document.createElement("div");
      let piezaCamelelo = generarSelector(lista_piezas_carmerlo);
      let eddd = document.createElement("div");
   

      const htmlCarmelo = `
      <div>
        <p>Carmerlo</p>
          <div class="boxBtnStock">
            <button class="stockFabrica"  data-tipo="StockEnFabrica">En Fabrica Bruto</button>

            <button class="stockCarmelo"  data-tipo="StockEnCarmelo">En Carmelo
            </button>

            <button class="stockFabricaTerminado"  data-tipo="StockEnFabrica">En Fabrica Terminado</button>
          </div>

      </div>`;
      const formularioHTMLEnvios = `
      <div class="container-enviosSoldador">
          <p>Envio a Carmerlo</p>
         <div class="row">
            <label for="text">Enviar</label>
              <select id="piezaACarmerloSelector" class="selector">${piezaCamelelo}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input id="cantidadEnviarCarmerlo" class="cantidades" type="number" id="cantidad" min="0" required>
              <button id="btnEnviarCarmelo">Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntrega = `
        <div class="container-enviosSoldador">
            <p>Entregas de Carmerlo</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select id="piezaEntregaCarmelo" class="selector">${piezaCamelelo}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadEmtregacarmelo" min="0" required>
                <button id="btnEntregaCarmelo">Enviar</button>
              </div>
          </div>`;

      cajaCarmelo.innerHTML = `${htmlCarmelo}`;
      envioCarmerlo.innerHTML = `${formularioHTMLEnvios}`;
      entregaCarmerlo.innerHTML = `${formularioHTMLEntrega}`;

      layoutDiv.appendChild(cajaCarmelo);
      cajaCarmelo.appendChild(envioCarmerlo);
      cajaCarmelo.appendChild(entregaCarmerlo);
      layoutDiv.appendChild(eddd);
      
      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          titulotabla.innerText = "Tabla En Fabrica "

          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();

            const piezasLista = {
              augeriado: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "Caja Soldada Eco",
              ],

              bruto: [
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
              ],
              torno: [
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Tapa Afilador Eco",
                "Caja 250",
                "Caja 300",
                "Caja 330",
              ],
              soldador: [
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
              ],
              terminado: [

              ],
            };

            const datosTabla = piezaBrutaEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockCarmelo")) {
          titulotabla.innerText = "Tabla en Carmelo "
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const piezaEnCarmerlo = await res.json();

            const piezasCarmero = {
              carmerlo: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco",
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
                "cajas_torneadas_250",
                "cajas_torneadas_300",
                "cajas_torneadas_330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
                "Caja 250",
                "Caja 300",
                "Caja 330",
              ],
            };

            const datosTabla = piezaEnCarmerlo.map((p) => {
              let categoria = Object.keys(piezasCarmero).find((key) =>
                piezasCarmero[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockFabricaTerminado")) {
          titulotabla.innerText = "Tabla Terminados"
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const piezaEnCarmerlo = await res.json();

            const piezasCarmero = {
              terminado: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco",
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
                "cajas_torneadas_250",
                "cajas_torneadas_300",
                "cajas_torneadas_330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
                "Caja 250",
                "Caja 300",
                "Caja 330",
              ],
            };

            const datosTabla = piezaEnCarmerlo.map((p) => {
              let categoria = Object.keys(piezasCarmero).find((key) =>
                piezasCarmero[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        }
      });

      document
      .getElementById("btnEnviarCarmelo")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("piezaACarmerloSelector");
        const inputCantidad = document.getElementById("cantidadEnviarCarmerlo");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosCarmelo/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en el primer envío");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Solo después de que el primer fetch fue exitoso:
              return fetch("http://localhost:5000/api/envios/carmelo", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error en el segundo envío");
              }
              // Podés agregar una respuesta opcional si querés
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("No Ahi PieZas Suficientes en fabrica.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }

      });

      
      document
      .getElementById("btnEntregaCarmelo")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("piezaEntregaCarmelo");
        const inputCantidad = document.getElementById("cantidadEmtregacarmelo");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(
            `http://localhost:5000/api/entregasCarmelo/${piezaSeleccionada}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cantidad: cantidad }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en el primer envío");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Solo después del primer fetch exitoso:
              return fetch("http://localhost:5000/api/entregas/carmelo", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error en el segundo envío");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("No Ahi PieZas Suficientes en fabrica.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    
      mostrarJson("carmelo", eddd)

      break;

    case "Maxi":
      const lista_piezas_Maxi = [
        "Brazo 250",
        "Brazo 300",
        "Brazo 330",
        "Caja 250",
        "Caja 300",
        "Caja 330",
        "Cubrecuchilla 250",
        "Cubrecuchilla 300",
        "Cubrecuchilla 330",
        "Velero",
        "Vela 330",
        "Vela 250",
        "Vela 300",
        "Planchada 330",
        "Planchada 300",
        "Planchada 250",
        "Tapa Afilador",
        "Aro Numerador",
        "Tapa Afilador 250",
        "Teletubi 330",
        "Teletubi 300",
        "Teletubi 250",
        "baseInox330",
        "baseInox300",
        "baseInox250",
        "baseInoxECO",
        "Tapa Afilador Eco",
      ];

      const cajaMaxi = document.createElement("div");
      let envioMaxi = document.createElement("div");
      let entregaMaxi = document.createElement("div");
      let piezaMaxi = generarSelector(lista_piezas_Maxi);
      let ess = document.createElement("div");

      const htmlMaxi = `
      <div>
        <p>Maxi</p>
          <div class="boxBtnStock">
            <button class="stockFabrica"  data-tipo="StockEnFabrica">En Fabrica Bruto</button>

            <button class="stockMaxi"  data-tipo="StockEnMaxi" >En Maxi</button>
            
            <button class="stockFabricaTerminado"  data-tipo="StockEnFabrica">En Fabrica Terminado</button>
          </div>

      </div>`;
      const formularioHTMLEnviosMaxi = `
      <div class="container-enviosSoldador">
          <p>Envio a Maxi</p>
         <div class="row">
            <label for="text">Enviar</label>
              <select id="PiezasSeleccionada" class="selector">${piezaMaxi}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input class="cantidades" type="number" id="cantidad" min="0" required>
              <button id="EnviosAMaxi">Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntregaMaxi = `
        <div class="container-enviosSoldador">
            <p>Entregas de Maxi</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select id="piezaEntregaMaxi" class="selector">${piezaMaxi}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadEmtregaMaxi" min="0" required>
                <button id="btnEntregaMaxi">Enviar</button>
              </div>
          </div>`;

      cajaMaxi.innerHTML = `${htmlMaxi}`;
      envioMaxi.innerHTML = `${formularioHTMLEnviosMaxi}`;
      entregaMaxi.innerHTML = `${formularioHTMLEntregaMaxi}`;

      layoutDiv.appendChild(cajaMaxi);
      cajaMaxi.appendChild(envioMaxi);
      cajaMaxi.appendChild(entregaMaxi);
      layoutDiv.appendChild(ess)

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          titulotabla.innerText = "Tabla En Fabrica "

          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              augeriado: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "Caja Soldada Eco",
              ],

              bruto: [
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
              ],
              torno: [
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Caja 250",
                "Caja 300",
                "Caja 330",
                "Tapa Afilador Eco",
              ],
              soldador: [
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
              ],
              varios: [
                "cajas_torneadas_250",
                "cajas_torneadas_300",
                "cajas_torneadas_330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
              ],
            };

            const datosTabla = piezaBrutaEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockMaxi")) {
          titulotabla.innerText = "Tabla En Maxi "
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const piezaEnCarmerlo = await res.json();

            const piezasCarmero = {
              maxi: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco",
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
                "cajas_torneadas_250",
                "cajas_torneadas_300",
                "cajas_torneadas_330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
                "Caja 250",
                "Caja 300",
                "Caja 330",
              ],
            };

            const datosTabla = piezaEnCarmerlo.map((p) => {
              let categoria = Object.keys(piezasCarmero).find((key) =>
                piezasCarmero[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockFabricaTerminado")) {
          titulotabla.innerText = "Tabla Terminado "
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const piezaEnCarmerlo = await res.json();

            const piezasCarmero = {
              terminado: [
                "Brazo 250",
                "Brazo 300",
                "Brazo 330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "basePintada330",
                "basePintada300",
                "baseInoxECO",
                "Caja Soldada Eco",
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
                "Cubrecuchilla 300",
                "Teletubi 300",
                "Vela 330",
                "Vela 250",
                "Vela 300",
                "Planchada 330",
                "Planchada 300",
                "Planchada 250",
                "cajas_torneadas_250",
                "cajas_torneadas_300",
                "cajas_torneadas_330",
                "baseInox330",
                "baseInox300",
                "baseInox250",
                "baseInoxECO",
                "Caja 250",
                "Caja 300",
                "Caja 330",
              ],
            };

            const datosTabla = piezaEnCarmerlo.map((p) => {
              let categoria = Object.keys(piezasCarmero).find((key) =>
                piezasCarmero[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        }
      });

      document
      .getElementById("EnviosAMaxi")
      .addEventListener("click", function () {
        const piezasSeleccionada = document.getElementById("PiezasSeleccionada");
        const CantidadSeleccionada = document.getElementById("cantidad");
    
        const piezaSeleccionada = piezasSeleccionada.value;
        const cantidad = parseInt(CantidadSeleccionada.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosMaxi/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en el primer envío");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              CantidadSeleccionada.value = "";
    
              // Solo después de que el primer fetch fue exitoso:
              return fetch("http://localhost:5000/api/envios/maxi", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error en el segundo envío");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar el envío.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    

      document
      .getElementById("btnEntregaMaxi")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("piezaEntregaMaxi");
        const inputCantidad = document.getElementById("cantidadEmtregaMaxi");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(
            `http://localhost:5000/api/entregasMaxi/${piezaSeleccionada}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cantidad: cantidad }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en el primer envío de entrega a Maxi");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Solo si el primer fetch fue exitoso
              return fetch("http://localhost:5000/api/entregas/maxi", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error en el registro de entrega global");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar la entrega.");
            });
        } else {
          console.log(
            "Por favor, seleccione una pieza y una cantidad válida."
          );
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    

      mostrarJson("maxi", ess)

      break;

    case "Pintura":
      const lista_piezas_Pintura = [
        "basePintada330",
        "basePintada300",
        "Caja Soldada Eco",
        "Teletubi Eco",
        "CabezalPintada"
      ];

      const cajaPintura = document.createElement("div");
      let envioPintura = document.createElement("div");
      let entregaPintura = document.createElement("div");
      let piezaPintura = generarSelector(lista_piezas_Pintura);
      let edddcs = document.createElement("div");



      const htmlPintura = `
      <div>
        <p>Pintura</p>
          <div class="boxBtnStock">
            <button class="stockFabrica"  data-tipo="StockEnFabrica">En Fabrica</button>
            <button class="stockPintura"  data-tipo="StockEnPintura">En Pintura</button>
            <button class="stockTerminado"  data-tipo="StockEnTerminado">Termiando</button>
          </div>

      </div>`;
      const formularioHTMLEnviosPintura = `
      <div class="container-enviosSoldador">
          <p>Envio a Pintura</p>
         <div class="row">
            <label for="text">Enviar</label>
              <select id="soldadorEnviosPintura", class="selector">${piezaPintura}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input class="cantidades" type="number" id="cantidadEnviosPintura" min="0" required>
              <button id="btnEnviarPintura">Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntregaPintura = `
        <div class="container-enviosSoldador">
            <p>Entregas de Pintura</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select id="soldadorEntregaPintura" class="selector">${piezaPintura}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadEntregaPintura" min="0" required>
                <button id="btnEntregaPintura">Enviar</button>
              </div>
          </div>`;

      cajaPintura.innerHTML = `${htmlPintura}`;
      envioPintura.innerHTML = `${formularioHTMLEnviosPintura}`;
      entregaPintura.innerHTML = `${formularioHTMLEntregaPintura}`;

      layoutDiv.appendChild(cajaPintura);
      cajaPintura.appendChild(envioPintura);
      cajaPintura.appendChild(entregaPintura);
      layoutDiv.appendChild(edddcs)

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          titulotabla.innerText = "Tabla En Fabrica"
          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutapintada"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              balancin: ["Teletubi Eco"],
              soldador: ["CabezalPintada"],
              augeriado: [
                "Caja Soldada Eco",
              ],
              bruto:[ 
                "basePintada330",
                "basePintada300",]
            };

            const datosTabla = piezaBrutaEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockPintura")) {
          titulotabla.innerText = "Tabla De Pintor"
          try {
            const res = await fetch("http://localhost:5000/api/stockPintura");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              pintura: [
                "basePintada330",
                "basePintada300",
                "CabezalPintada",
                "Caja Soldada Eco",
                "Teletubi Eco",
              ],
            };

            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("Nose enmcontes el elemento con Id TableID");
              return;
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        } else if (event.target.classList.contains("stockTerminado")) {
          titulotabla.innerText = "Tabla Terminado "
          try {
            const res = await fetch("http://localhost:5000/api/stockPintura");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              terminado: [
                "basePintada330",
                "basePintada300",
                "CabezalPintada",
                "Teletubi Eco",
                "Caja Soldada Eco",
              ],
            };
            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );
              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }
            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        }
      });

      document
      .getElementById("btnEnviarPintura")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("soldadorEnviosPintura");
        const inputCantidad = document.getElementById("cantidadEnviosPintura");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosPintura/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en el envío a pintura (detalle individual).");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Solo si el primer fetch fue exitoso:
              return fetch("http://localhost:5000/api/envios/pintura", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error al registrar envío global a pintura.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar el envío a pintura.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    

      document
      .getElementById("btnEntregaPintura")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("soldadorEntregaPintura");
        const inputCantidad = document.getElementById("cantidadEntregaPintura");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/entregasPintura/${encodeURIComponent(piezaSeleccionada)}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en entrega individual a pintura.");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Registro global
              return fetch("http://localhost:5000/api/entregas/pintura", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error al registrar entrega global a pintura.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar la entrega a pintura.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    
      mostrarJson("pintura", edddcs)

      break;

    case "Niquelado":
      const lista_piezas_Niquelado = [
        "Eje Rectificado",
        "Varilla Brazo 330",
        "Varilla Brazo 300",
        "Varilla Brazo 250",
        "Tubo Manija",
        "Tubo Manija 250",
        "Palanca Afilador",
      ];

      const cajaNiquelado = document.createElement("div");
      let envioNiquelado = document.createElement("div");
      let entregaNiquelado = document.createElement("div");
      let piezaNiquelado = generarSelector(lista_piezas_Niquelado);
      let edddww = document.createElement("div");

      const htmlNiquelado = `
        <div>
          <p>Niquelado</p>
            <div class="boxBtnStock">
              <button class="stockBruto"  data-tipo="StockEnBruto">En Fabrica Bruto</button>
              <button class="stockNiquelado"  data-tipo="StockEnNiquelado" >En Niquelado</button>
              <button class="stockEnFabrica"  data-tipo="StockEnTerminado">Terminado</button>
            </div>
        </div>`;
      const formularioHTMLEnviosNiquelado = `
        <div class="container-enviosSoldador">
            <p>Envio a Niquelado</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select id="soldadorEnviosNiquelado" class="selector">${piezaNiquelado}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadEnviosNiquelado" min="0" required>
                <button id="btnEnviarNiquelado">Enviar</button>
              </div>
          </div>`;
      const formularioHTMLEntregaNiquelado = `
          <div class="container-enviosSoldador">
              <p>Entregas de Niquelado</p>
             <div class="row">
                <label for="text">Enviar</label>
                  <select id="soldadorEntregaNiquelado" class="selector">${piezaNiquelado}
                  </select>
              </div>
              <div class="row">
                  <label  for="cantidad">Cantidad:</label>
                  <input class="cantidades" type="number" id="cantidadEntregaNiquelado" min="0" required>
                  <button id="btnEntregaNiquelado" >Enviar</button>
                </div>
            </div>`;

      cajaNiquelado.innerHTML = `${htmlNiquelado}`;
      envioNiquelado.innerHTML = `${formularioHTMLEnviosNiquelado}`;
      entregaNiquelado.innerHTML = `${formularioHTMLEntregaNiquelado}`;

      layoutDiv.appendChild(cajaNiquelado);
      cajaNiquelado.appendChild(envioNiquelado);
      cajaNiquelado.appendChild(entregaNiquelado);
      layoutDiv.appendChild(edddww)

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockBruto")) {
          titulotabla.innerText = "Tabla En Fabrica"

          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaniquelado"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              corte: [
                "Eje Rectificado",
                "Varilla Brazo 330",
                "Varilla Brazo 300",
                "Varilla Brazo 250",
                "Tubo Manija",
                "Tubo Manija 250",
                "Palanca Afilador",
              ],
            };

            const datosTabla = piezaBrutaEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockNiquelado")) {
          titulotabla.innerText = "Tabla En Niquelado"

          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaniquelado"
            );
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              niquelado: [
                "Eje Rectificado",
                "Varilla Brazo 330",
                "Varilla Brazo 300",
                "Varilla Brazo 250",
                "Tubo Manija",
                "Tubo Manija 250",
                "Palanca Afilador",
              ],
            };

            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("Nose enmcontes el elemento con Id TableID");
              return;
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        } else if (event.target.classList.contains("stockEnFabrica")) {
          titulotabla.innerText = "Tabla En Fabrica"

          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaniquelado"
            );
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              terminado: [
                "Eje Rectificado",
                "Varilla Brazo 330",
                "Varilla Brazo 300",
                "Varilla Brazo 250",
                "Tubo Manija",
                "Tubo Manija 250",
                "Palanca Afilador",
              ],
            };
            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );
              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }
            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        }
      });

      document
      .getElementById("btnEnviarNiquelado")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("soldadorEnviosNiquelado");
        const inputCantidad = document.getElementById("cantidadEnviosNiquelado");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosNiquelado/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al actualizar envío individual a niquelado.");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
              inputCantidad.value = "";
    
              // Registro global
              return fetch("http://localhost:5000/api/envios/niquelado", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error al registrar envío global a niquelado.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar el envío a niquelado.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
    

        document
        .getElementById("btnEntregaNiquelado")
        .addEventListener("click", function () {
          const selectElement = document.getElementById("soldadorEntregaNiquelado");
          const inputCantidad = document.getElementById("cantidadEntregaNiquelado");
      
          const piezaSeleccionada = selectElement.value;
          const cantidad = parseInt(inputCantidad.value);
      
          if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
            fetch(`http://localhost:5000/api/entregasNiquelado/${piezaSeleccionada}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cantidad: cantidad }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error en entrega individual a niquelado.");
                }
                return response.json();
              })
              .then((data) => {
                console.log(data.mensaje);
                alert(data.mensaje);
                inputCantidad.value = "";
      
                // Registro global
                return fetch("http://localhost:5000/api/entregas/niquelado", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cantidad: cantidad,
                    pieza: piezaSeleccionada,
                  }),
                });
              })
              .then((response) => {
                if (response && !response.ok) {
                  throw new Error("Error al registrar entrega global a niquelado.");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("Hubo un problema al procesar la entrega a niquelado.");
              });
          } else {
            console.log("Por favor, seleccione una pieza y una cantidad válida.");
            alert("Por favor, seleccione una pieza y una cantidad válida.");
          }
        });
      
        mostrarJson("niquelado", edddww)
      break;

    case "Afilador":
      const lista_piezas_Afilador = [
        "Capuchon Afilador",
        "Carcaza Afilador",
        "Eje Corto",
        "Eje Largo",
        "Ruleman608",
        "Palanca Afilador",
        "Resorte Palanca",
        "Resorte Empuje",
      ];

      const cajaAfilador = document.createElement("div");
      let entregaAfilador = document.createElement("div");
      let resivirAfiladores = document.createElement("div");
      let edddfila = document.createElement("div");

      let piezaAfilador = generarSelector(lista_piezas_Afilador);

      const htmlAfilador = `
            <div>
               <div class="boxBtnStock">
                    <button class="stockFabrica" data-tipo="StockEnFabrica">En Fabrica</button>
                    <button class="stockRoman" data-tipo="StockEnRoman">En Roman</button>
                    <button class="stockEnFabricaAfilador">Terminado</button>
              </div>       
        </div>`;

      const formularioHTMLEntregaAfilador = `<div class="container-enviosSoldador">
                     <p>Entregas de Afilador</p>
                 <div class="row">
                    <label for="text">Enviar</label>
                    <select id="piezaEnviarAfilador" class="selector">${piezaAfilador} </select>
                </div>
               <div class="row">
                    <label  for="cantidad">Cantidad:</label>
                    <input class="cantidades" type="number" id="cantidadEnviarAfilador" min="0" required>
                    <button id="btnEnviarAfiladores">Enviar</button>
                  </div>
        </div>`;

      const htmlResivido = `
        <div>
          <p>Entrega De Afiladores Terminados</p>
          <div>
            <input class='cantidades' type='number' id='cantidadEntregaAfiladores' min="0" required>
            <button id="EntregaAfiladores">Afiladores Entregados</button>
          </div>
        </div>
      `;

      resivirAfiladores.innerHTML = `${htmlResivido}`;
      cajaAfilador.innerHTML = `${htmlAfilador}`;
      entregaAfilador.innerHTML = `${formularioHTMLEntregaAfilador}`;

      layoutDiv.appendChild(cajaAfilador);
      cajaAfilador.appendChild(entregaAfilador);
      cajaAfilador.appendChild(resivirAfiladores);
      layoutDiv.appendChild(edddfila)


      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          titulotabla.innerText = "Tabla En Fabrica"

          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaAfilador"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();

            const piezasLista = {
              augeriado: ["Carcaza Afilador"],
              balancin: ["Eje Corto", "Eje Largo"],
              bruto: [
                "Capuchon Afilador",
                "Ruleman608",
                "Resorte Palanca",
                "Resorte Empuje",
              ],
              terminado: ["Palanca Afilador"],
            };

            const datosTabla = piezaBrutaEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("No se encontro el elemento con el Id TablaDiv");
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("Esto es un error", error);
          }
        } else if (event.target.classList.contains("stockRoman")) {
          titulotabla.innerText = "Tabla en Roman"

          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaAfilador"
            );
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              afiladores: [
                "Carcaza Afilador",
                "Eje Corto",
                "Eje Largo",
                "Capuchon Afilador",
                "Ruleman608",
                "Resorte Palanca",
                "Resorte Empuje",
                "Palanca Afilador",
              ],
            };

            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) =>
                PiezasDelSoldador[key].includes(p.nombre)
              );

              return {
                nombre: p.nombre,
                cantidad: p.proveedores?.[categoria]?.cantidad,
              };
            });

            if (!tablaDiv) {
              console.error("Nose enmcontes el elemento con Id TableID");
              return;
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error");
          }
        } else if (event.target.classList.contains("stockEnFabricaAfilador")) {
          titulotabla.innerText = "Tabla de afiladores"

          try {
            const res = await fetch("http://localhost:5000/api/afilador");
            if (!res.ok) throw new Error("Error en respuesta del servidor");
          
            const piezas = await res.json();
            
            // Filtrar para que solo se incluya la pieza "Afilador"
            const piezasFiltradas = piezas.filter((p) => p.nombre === "Afilador");
            // Mapear para extraer solo nombre y la cantidad en cantidad.terminado.cantidad
            console.log(piezasFiltradas)

            const datosTabla = piezasFiltradas.map((p) => ({
              nombre: p.nombre,
              cantidad: p.cantidad?.terminado?.cantidad , // En caso de que no exista, queda en 0
            }));
          
            if (!tablaDiv) {
              console.error("No se encontró el elemento con el Id TablaDiv");
            }
            
            new Tabulator(tablaDiv, {
              height: 300,
              layout: "fitColumns",
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" },
              ],
            });
          } catch (error) {
            console.error("es un error", error);
          }
          
        }
      });

      document
      .getElementById("btnEnviarAfiladores")
      .addEventListener("click", function () {
        const selectElement = document.getElementById("piezaEnviarAfilador");
        const inputCantidad = document.getElementById("cantidadEnviarAfilador");
    
        const piezaSeleccionada = selectElement.value;
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosAfiladores/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al actualizar envío individual al afilador.");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
    
              // Segunda petición para el registro general
              return fetch("http://localhost:5000/api/envios/afilador", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error al registrar el envío global al afilador.");
              }
              inputCantidad.value = ""; // Limpia solo si todo salió bien
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar el envío al afilador.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });

      
      document
      .getElementById("EntregaAfiladores")
      .addEventListener("click", function () {
        const inputCantidad = document.getElementById("cantidadEntregaAfiladores");
    
        const piezaSeleccionada = "Afilador";
        const cantidad = parseInt(inputCantidad.value);
    
        if (piezaSeleccionada && !isNaN(cantidad) && cantidad > 0) {
          fetch(`http://localhost:5000/api/entregaAfiladores/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: cantidad }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al registrar entrega individual.");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.mensaje);
              alert(data.mensaje);
    
              // Segunda petición para el registro global
              return fetch("http://localhost:5000/api/entregas/afilador", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: cantidad,
                  pieza: piezaSeleccionada,
                }),
              });
            })
            .then((response) => {
              if (response && !response.ok) {
                throw new Error("Error al registrar entrega global.");
              }
              inputCantidad.value = "";
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Hubo un problema al procesar la entrega al afilador.");
            });
        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });
      mostrarJson("afilador", edddfila)

      break;
    default:
      console.log(`No hay datos para ${nombre}`);
      return; 
  }
  // Crear la tabla con Tabulator
  new Tabulator(tablaDiv, {
    layout: "fitColumns",
    columns: columnas,
    data: data,
    height: 500,
  });
}
module.exports = { mostrarContenido };
