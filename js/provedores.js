
async function mostrarContenido(nombre) {
  function generarSelector(pieza) {
    let opcionesSelect = `<option value="">Seleccione Una Pieza</option>`;
    pieza.forEach((pieza) => {
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
  contenedor.innerHTML = `<h2>${nombre || "Hola"}</h2>`;

  // Crear un contenedor de diseño flexbox para organizar tabla y botones
  const layoutDiv = document.createElement("div");
  layoutDiv.style.display = "flex";
  layoutDiv.style.gap = "10px";
  layoutDiv.style.alignItems = "start"; // Alinea los elementos en la parte superior

  // Crear contenedor para la tabla
  const tablaDiv = document.createElement("div");
  layoutDiv.appendChild(tablaDiv);

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

  switch (nombre) {
    case "Soldador":
      data = [];

      function generarSelector(piezas) {
        return (
          `<option value="">Seleccione Una Pieza</option>` +
          piezas
            .map((pieza) => `<option value="${pieza}">${pieza}</option>`)
            .join("")
        );
      }

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

      const opcionesSelect = generarSelector(piezaSoldador);

      const html = `
      <div>
          <p>Stock Soldador</p>
          <div class="boxBtnStock">
              <button class='enFabrica' data-tipo="StockEnFabrica" >En Fabrica</button>
              <button class='enSoldador' data-tipo="StockEnSoldador" >En Soldador</button>
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
                  <button id="btnEnviar">Enviar</button>
              </div>
          </div>
    
          <div class="container-enviosSoldador">
              <p>Entregas del Soldador</p>
              <div class="row">
                  <label>Enviar</label>
                  <select class="selector">${opcionesSelect}</select>
              </div>
              <div class="row">
                  <label>Cantidad:</label>
                  <input class="cantidades" type="number" min="0" required>
                  <button>Enviar</button>
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
              </tr>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="basePintada300">Pintada 300</button></td>
                  <td><button class="botonesPiezas" data-tipo="basePintada330">Pintada 330</button></td>
              </tr>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="baseInox250">Inox 250</button></td>
                  <td><button class="botonesPiezas" data-tipo="baseInoxECO">Inox ECO</button></td>
              </tr>
              <tr>
                  <td><button class="botonesPiezas" data-tipo="CajaMotor_ECO">Caja Eco</button></td>
              </tr>
          </table>
      </div>`;

      caja.innerHTML = html;
      botonerBases.innerHTML = html2;

      layoutDiv.appendChild(caja);
      layoutDiv.appendChild(botonerBases);

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
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);

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
                "Media Luna"
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
                "Planchuela 250",
                "Planchuela 300",
                "Planchuela 330",
                "Varilla 300",
                "Varilla 330",
                "Varilla 250",
              ],
              balancin: ["PortaEje"],
            };

            const datosTabla = piezaBrutoEnFabrica.map((p) => {
              let categoria = Object.keys(piezasLista).find((key) =>
                piezasLista[key].includes(p.nombre)
              );
              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad || 0, // Evitar undefined
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
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);

          try {
            const res = await fetch("http://localhost:5000/api/stocksoldador");
            if (!res.ok) throw new Error("Error en respuesta del servidor");

            const piezaBrutoEnSoldador = await res.json();
            const PiezasDelSoldador = {
              bruto: [
                "baseInox330", "baseInox300", "baseInox250", "basePintada330", "basePintada300", "baseInoxECO", "Caja Soldada Eco"]
            }

            const datosTabla = piezaBrutoEnSoldador.map((p) => {
              let categoria = Object.keys(PiezasDelSoldador).find((key) => PiezasDelSoldador[key].includes(p.nombre)
              )

              return {
                nombre: p.nombre,
                cantidad: p.cantidad?.[categoria]?.cantidad || 0
              }
            })

            if (!tablaDiv) {
              console.error("Nose enmcontes el elemento con Id TableID")
              return
            }

            new Tabulator(tablaDiv, {
              height: 500,
              layout: 'fitColumns',
              data: datosTabla,
              initialSort: [{ column: "nombre", dir: "asc" }],
              columns: [
                { title: "Nombre", field: "nombre" },
                { title: "Cantidad", field: "cantidad" }
              ]
            })
          } catch (error) {
            console.error("es un error")
          }
        }
      });



      document.getElementById("btnEnviar").addEventListener("click", function () {
        const selectElement = document.getElementById("soldadorEnvios");
        const inputCantidad = document.getElementById("cantidadEnvios");

        const piezaSeleccionada = selectElement.value;
        const cantidad = inputCantidad.value;

        if (piezaSeleccionada && cantidad > 0) {
          fetch(`http://localhost:5000/api/enviosSoldador/${piezaSeleccionada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ cantidad: cantidad })
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.mensaje)
              alert(data.mensaje)
            })
            .catch((error) => {
              console.log("Error:", error)
            })

        } else {
          console.log("Por favor, seleccione una pieza y una cantidad válida.");
          alert("Por favor, seleccione una pieza y una cantidad válida.");
        }
      });

      break;

    case "Carmelo":
      const lista_piezas_carmerlo = [
        "brazo_augeriado_250",
        "brazo_augeriado_300",
        "brazo_augeriado_330",
        "cajas_torneadas_250",
        "cajas_torneadas_300",
        "cajas_torneadas_330",
        "cubrecuchilla_250",
        "cubre_300_torneado",
        "cubrecuchilla_330",
        "velero",
        "vela_final_330",
        "vela_final_250",
        "vela_final_300",
        "planchada_final_330",
        "planchada_final_300",
        "planchada_final_250",
        "tapa_afilador",
        "aro_numerador",
        "tapa_afilador_250",
        "teletubi_330",
        "teletubi_300_torneado",
        "teletubi_250",
        "BaseInox_330",
        "BaseInox_300",
        "BaseInox_250",
        "BaseECO",
        "tapa_afilador_eco",
      ];

      const cajaCarmelo = document.createElement("div");
      let envioCarmerlo = document.createElement("div");
      let entregaCarmerlo = document.createElement("div");
      let piezaCamelelo = generarSelector(lista_piezas_carmerlo);

      const htmlCarmelo = `
      <div>
        <p>Carmerlo</p>
          <div class="boxBtnStock">
            <button class="stockCarmelo"  data-tipo="StockEnCarmelo">En Carmelo
            </button>
            <button class="stockFabrica"  data-tipo="StockEnFabrica">En Fabrica Bruto</button>
          </div>

      </div>`;
      const formularioHTMLEnvios = `
      <div class="container-enviosSoldador">
          <p>Envio a Carmerlo</p>
         <div class="row">
            <label for="text">Enviar</label>
              <select class="selector">${piezaCamelelo}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input class="cantidades" type="number" id="cantidad" min="0" required>
              <button>Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntrega = `
        <div class="container-enviosSoldador">
            <p>Entregas de Carmerlo</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select class="selector">${piezaCamelelo}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidad" min="0" required>
                <button>Enviar</button>
              </div>
          </div>`;

      cajaCarmelo.innerHTML = `${htmlCarmelo}`;
      envioCarmerlo.innerHTML = `${formularioHTMLEnvios}`;
      entregaCarmerlo.innerHTML = `${formularioHTMLEntrega}`;

      layoutDiv.appendChild(cajaCarmelo);
      cajaCarmelo.appendChild(envioCarmerlo);
      cajaCarmelo.appendChild(entregaCarmerlo);

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              augeriado: ["Brazo 250", "Brazo 300", "Brazo 330", "baseInox330", "baseInox300", "baseInox250", "basePintada330", "basePintada300", "baseInoxECO", "Caja Soldada Eco"],

              bruto: [
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
              ],
              torno: ["Cubrecuchilla 300", "Teletubi 300"],
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
        } else if (event.target.classList.contains("stockCarmelo")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        }
      });

      break;

    case "Maxi":
      const lista_piezas_Maxi = [
        "brazo_augeriado_250",
        "brazo_augeriado_300",
        "brazo_augeriado_330",
        "cajas_torneadas_250",
        "cajas_torneadas_300",
        "cajas_torneadas_330",
        "cubrecuchilla_250",
        "cubre_300_torneado",
        "cubrecuchilla_330",
        "velero",
        "vela_final_330",
        "vela_final_250",
        "vela_final_300",
        "planchada_final_330",
        "planchada_final_300",
        "planchada_final_250",
        "tapa_afilador",
        "aro_numerador",
        "tapa_afilador_250",
        "teletubi_330",
        "teletubi_300_torneado",
        "teletubi_250",
        "BaseInox_330",
        "BaseInox_300",
        "BaseInox_250",
        "BaseECO",
        "tapa_afilador_eco",
      ];

      const cajaMaxi = document.createElement("div");
      let envioMaxi = document.createElement("div");
      let entregaMaxi = document.createElement("div");
      let piezaMaxi = generarSelector(lista_piezas_Maxi);

      const htmlMaxi = `
      <div>
        <p>Maxi</p>
          <div class="boxBtnStock">
            <button class="stockMaxi"  data-tipo="StockEnMaxi" >En Carmelo</button>
            <button class="stockFabrica"  data-tipo="StockEnFabrica">En Fabrica Bruto</button>
          </div>

      </div>`;
      const formularioHTMLEnviosMaxi = `
      <div class="container-enviosSoldador">
          <p>Envio a Maxi</p>
         <div class="row">
            <label for="text">Enviar</label>
              <select class="selector">${piezaMaxi}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input class="cantidades" type="number" id="cantidad" min="0" required>
              <button>Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntregaMaxi = `
        <div class="container-enviosSoldador">
            <p>Entregas de Maxi</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select class="selector">${piezaMaxi}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidad" min="0" required>
                <button>Enviar</button>
              </div>
          </div>`;

      cajaMaxi.innerHTML = `${htmlMaxi}`;
      envioMaxi.innerHTML = `${formularioHTMLEnviosMaxi}`;
      entregaMaxi.innerHTML = `${formularioHTMLEntregaMaxi}`;

      layoutDiv.appendChild(cajaMaxi);
      cajaMaxi.appendChild(envioMaxi);
      cajaMaxi.appendChild(entregaMaxi);

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);
          try {
            const res = await fetch(
              "http://localhost:5000/api/carmelostockfabrica"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              augeriado: ["Brazo 250", "Brazo 300", "Brazo 330", "baseInox330", "baseInox300", "baseInox250", "basePintada330", "basePintada300", "baseInoxECO", "Caja Soldada Eco"],

              bruto: [
                "Velero",
                "Cubrecuchilla 250",
                "Cubrecuchilla 330",
                "Tapa Afilador",
                "Aro Numerador",
                "Tapa Afilador 250",
                "Teletubi 330",
                "Teletubi 250",
                "Tapa Afilador Eco",
              ],
              torno: ["Cubrecuchilla 300", "Teletubi 300"],
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
        } else if (event.target.classList.contains("StockEnMaxi")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        }
      });

      break;

    case "Pintura":
      const lista_piezas_Pintura = [
        "BasePintada_330",
        "BasePintada_300",
        "cabezal_pintada",
        "caja_eco_augeriada",
        "teletubi_doblado_eco",
      ];

      const cajaPintura = document.createElement("div");
      let envioPintura = document.createElement("div");
      let entregaPintura = document.createElement("div");
      let piezaPintura = generarSelector(lista_piezas_Pintura);

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
              <select class="selector">${piezaPintura}
              </select>
          </div>
          <div class="row">
              <label  for="cantidad">Cantidad:</label>
              <input class="cantidades" type="number" id="cantidad" min="0" required>
              <button>Enviar</button>
            </div>
        </div>`;
      const formularioHTMLEntregaPintura = `
        <div class="container-enviosSoldador">
            <p>Entregas de Pintura</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select class="selector">${piezaPintura}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidad" min="0" required>
                <button>Enviar</button>
              </div>
          </div>`;

      cajaPintura.innerHTML = `${htmlPintura}`;
      envioPintura.innerHTML = `${formularioHTMLEnviosPintura}`;
      entregaPintura.innerHTML = `${formularioHTMLEntregaPintura}`;

      layoutDiv.appendChild(cajaPintura);
      cajaPintura.appendChild(envioPintura);
      cajaPintura.appendChild(entregaPintura);

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);
          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutapintada"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              balancin: ["Teletubi Eco"],
              soldador: [
                "cabezal_pintada",
              ],
              augeriado: ["Caja Soldada Eco", "basePintada330", "basePintada300",],
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
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        } else if (event.target.classList.contains("stockTerminado")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        }
      });

      break;

    case "Niquelado":
      const lista_piezas_Niquelado = [
        "eje_rectificado",
        "varilla_brazo_330",
        "varilla_brazo_300",
        "varilla_brazo_250",
        "tubo_manija",
        "tubo_manija_250",
        "palanca_afilador",
      ];

      const cajaNiquelado = document.createElement("div");
      let envioNiquelado = document.createElement("div");
      let entregaNiquelado = document.createElement("div");
      let piezaNiquelado = generarSelector(lista_piezas_Niquelado);

      const htmlNiquelado = `
        <div>
          <p>Niquelado</p>
            <div class="boxBtnStock">
              <button class="stockNiquelado"  data-tipo="StockEnNiquelado" >En Niquelado</button>
              <button class="stockBruto"  data-tipo="StockEnBruto">En Fabrica Bruto</button>
              <button class="stockTerminado"  data-tipo="StockEnTerminado">Terminado</button>
            </div>
        </div>`;
      const formularioHTMLEnviosNiquelado = `
        <div class="container-enviosSoldador">
            <p>Envio a Niquelado</p>
           <div class="row">
              <label for="text">Enviar</label>
                <select class="selector">${piezaNiquelado}
                </select>
            </div>
            <div class="row">
                <label  for="cantidad">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidad" min="0" required>
                <button>Enviar</button>
              </div>
          </div>`;
      const formularioHTMLEntregaNiquelado = `
          <div class="container-enviosSoldador">
              <p>Entregas de Niquelado</p>
             <div class="row">
                <label for="text">Enviar</label>
                  <select class="selector">${piezaNiquelado}
                  </select>
              </div>
              <div class="row">
                  <label  for="cantidad">Cantidad:</label>
                  <input class="cantidades" type="number" id="cantidad" min="0" required>
                  <button>Enviar</button>
                </div>
            </div>`;

      cajaNiquelado.innerHTML = `${htmlNiquelado}`;
      envioNiquelado.innerHTML = `${formularioHTMLEnviosNiquelado}`;
      entregaNiquelado.innerHTML = `${formularioHTMLEntregaNiquelado}`;

      layoutDiv.appendChild(cajaNiquelado);
      cajaNiquelado.appendChild(envioNiquelado);
      cajaNiquelado.appendChild(entregaNiquelado);

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockBruto")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);
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
        } else if (event.target.classList.contains("stockCarmelo")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        }
      });

      break;

    case "Afilador":
      const lista_piezas_Afilador = [
        "capuchon_afilador",
        "carcaza_afilador",
        "eje_corto",
        "eje_largo",
        "ruleman608",
        "palanca_afilador",
        "resorte_palanca",
        "resorte_empuje",
      ];

      const cajaAfilador = document.createElement("div");
      let entregaAfilador = document.createElement("div");
      let resivirAfiladores = document.createElement("div");

      let piezaAfilador = generarSelector(lista_piezas_Afilador);

      const htmlAfilador = `
          <div>
            <p>Afilador</p>
              <div class="boxBtnStock">
                <button class="stockRoman"  data-tipo="StockEnRoman" >En Roman</button>
                <button class="stockFabrica"  data-tipo="StockEnFabrica" >En Fabrica</button>
              </div>    
          </div>
          <div>
            <p>Terminado</p>
              <div class="boxBtnStock">
                <button >Terminado</button>
              </div>    
          </div>`;

      const formularioHTMLEntregaAfilador = `
            <div class="container-enviosSoldador">
                <p>Entregas de Afilador</p>
               <div class="row">
                  <label for="text">Enviar</label>
                    <select class="selector">${piezaAfilador}
                    </select>
                </div>
                <div class="row">
                    <label  for="cantidad">Cantidad:</label>
                    <input class="cantidades" type="number" id="cantidad" min="0" required>
                    <button>Enviar</button>
                  </div>
              </div>`;

      const htmlResivido = `
        <div>
          <p>Entrega De Afiladores Terminados</p>
          <div>
            <input class='cantidades' type='number' id='cantidad' min="0" required>
            <button>Afiladores Entregados</button>
          </div>
        </div>
      `;

      resivirAfiladores.innerHTML = `${htmlResivido}`;
      cajaAfilador.innerHTML = `${htmlAfilador}`;
      entregaAfilador.innerHTML = `${formularioHTMLEntregaAfilador}`;

      layoutDiv.appendChild(cajaAfilador);
      cajaAfilador.appendChild(entregaAfilador);
      cajaAfilador.appendChild(resivirAfiladores);

      document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("stockFabrica")) {
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado: ", tipo);
          try {
            const res = await fetch(
              "http://localhost:5000/api/piezasbrutaAfilador"
            );
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            const piezaBrutaEnFabrica = await res.json();
            console.log(piezaBrutaEnFabrica);

            const piezasLista = {
              augeriado: ["Carcaza Afilador"],
              balancin: ["Eje Corto", "Eje Largo"],
              bruto: [
                "Capuchon Afilador",
                "Ruleman608",
                "Resorte Palanca",
                "Resorte Empuje",
              ],
              corte: ["Palanca Afilador"],
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
          const tipo = event.target.getAttribute("data-tipo");
          console.log("Seleccionado:", tipo);
        }
      });

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
