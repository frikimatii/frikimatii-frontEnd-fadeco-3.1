const { Chart } = require("chart.js");

async function boxArmado() {
  const Maquinas = [
    "Inox_330",
    "Inox_300",
    "Inox_250",
    "Pintada_330",
    "Pintada_300",
    "Inox_ECO",
  ];

  const ParteMaquinasMOTOR = [
    "CajaMotor_330",
    "CajaMotor_300",
    "CajaMotor_250",
    "CajaMotor_ECO",
  ];

  const ParteMaquinasPrearmado = [
    "BasePreArmada_Inox330",
    "BasePreArmada_Inox300",
    "BasePreArmada_Inox250",
    "BasePreArmada_InoxECO",
    "BasePreArmada_Pintada330",
    "BasePreArmada_Pintada300",
  ];

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  function generarSelector(pieza) {
    let opcionesSelect = `<option value="">Seleccione Una Pieza</option>`;
    pieza.forEach((pieza) => {
      opcionesSelect += `<option value="${pieza}">${pieza}</option>`;
    });
    return opcionesSelect;
  }

  const BoxArmado = document.getElementById("zonaArmado");

  if (!BoxArmado) {
    console.error("Elemento No encontrado");
    return;
  }

  // Limpiar y configurar estilo del contenedor principal
  BoxArmado.innerHTML = "";
  BoxArmado.style.display = "flex";
  BoxArmado.style.gap = "20px";
  BoxArmado.style.flexWrap = "wrap";
  BoxArmado.style.alignItems = "flex-start";

  // Simulación de las opciones para el selector de piezas
  data = [];

  // --------- Columna 1: Tabla de Armado ---------
  const tablaDiv = document.createElement("div");
  tablaDiv.id = "tablaArmado";
  tablaDiv.style.flex = "1";
  tablaDiv.style.minWidth = "250px";
  tablaDiv.style.border = "1px solid #ccc";
  tablaDiv.style.margin = "10px";
  BoxArmado.appendChild(tablaDiv);

  const columnas = [
    { title: "Nombre", field: "nombre" },
    { title: "Cantidad", field: "cantidad" },
  ];

  new Tabulator(tablaDiv, {
    layout: "fitColumns",
    columns: columnas,
    data: data,
    height: 500,
  });

  // --------- Columna 2: Motores ---------
  const motoresDiv = document.createElement("div");
  motoresDiv.id = "colMotores";
  motoresDiv.style.flex = "1";
  motoresDiv.style.minWidth = "250px";
  motoresDiv.style.border = "1px solid #ccc";
  motoresDiv.style.padding = "10px";
  motoresDiv.style.borderRadius = "8px";

  const motores = generarSelector(ParteMaquinasMOTOR);

  motoresDiv.innerHTML = `
      <div class="boxMotores">
        <div class="stockMotores">
          <h3 class="tituloMotores">Stock Motores</h3>
          <button id="stockMotores"class="btnMotores">Motores</button>
        </div>
        <div class="cajaModelosMotores">
          <p class="tituloBtnMotoreArmados">Stock Por Modelo</p>
          <div>
            <button id="StockMotores330">Caja 330</button>
            <button id="StockMotores300">Caja 300</button>
          </div>
          <div>
            <button id="StockMotores250">Caja 250</button>
            <button id="StockMotoresECO">Caja Eco</button>
          </div>
        </div>
        <div class="container-enviosSoldador">
          <p class="tituloBtnMotoreArmados">Motores Armados</p>
          <div class="row">
            <label for="text">Motor</label>
            <select id="MotorSeleccionado" class="selector">
              ${motores}
            </select>
          </div>
          <div class="row">
            <label for="cantidad">Cantidad:</label>
            <input class="cantidades" type="number" id="cantidadMotores" min="0" required />
            <button id="ArmarMotores" class="btnArmarMotores">Armar Motores</button>
          </div>
        </div>
        <div class="boxmecanizaodMotores">
          <p class="tituloBtnMotoreArmados">Motores Armado / Torno</p>
          <div class="boxMotoresTorneado">
            <button id="stockMotoresFinales">Motores Armado</button>
          </div>
        </div>
      </div>
    `;
  BoxArmado.appendChild(motoresDiv);

  document
    .getElementById("stockMotores")
    .addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:5000/api/shop");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const Motores = await res.json();

        const PiezaMotores = {
          bruto: ["Motor 220w", "Motor ECO 220w", "Motor250 220w"],
        };

        const motoresFiltrado = Motores.filter((p) =>
          PiezaMotores.bruto.includes(p.nombre)
        );
        const datosTabla = motoresFiltrado.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.bruto?.cantidad,
          stock: p.cantidad?.bruto?.stock_deseado,
        }));

        if (!tablaDiv) {
          console.error("No Se encontro el elemento con id TablaDiv");
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

          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.log("ERROR EM EL SERVIDOR", error);
      }
    });

  document
    .getElementById("ArmarMotores")
    .addEventListener("click", function () {
      const piezaSeleccionada = document.getElementById("MotorSeleccionado");
      const cantidadSeleccionada = document.getElementById("cantidadMotores");

      const pieza = piezaSeleccionada.value;
      const cantidad = cantidadSeleccionada.value;
      if (pieza && cantidad > 0) {
        fetch(`http://localhost:5000/api/armadoDeMotores/${pieza}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidad }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.mensaje);
            alert(data.mensaje);
            cantidadSeleccionada.value = "";
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        console.log("Por favor, seleccione una pieza y una cantidad válida.");
        alert("Por favor, seleccione una pieza y una cantidad válida.");
      }
    });

  async function cargarStockMotor(idBoton, piezasMotor) {
    document.getElementById(idBoton).addEventListener("click", async () => {
      try {
        const res = await fetch("http://localhost:5000/api/StockMotores");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const piezaJsonMotore = await res.json();
        const piezasValidas = Object.values(piezasMotor).flat();
        const piezasFiltradas = piezaJsonMotore.filter((p) =>
          piezasValidas.includes(p.nombre)
        );

        const datosTabla = piezasFiltradas.map((p) => {
          let categoria = Object.keys(piezasMotor).find((key) =>
            piezasMotor[key].includes(p.nombre)
          );
          return {
            nombre: p.nombre,
            cantidad: p.cantidad?.[categoria]?.cantidad,
            stock: p.cantidad?.[categoria].stock_deseado,
          };
        });

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
          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.log("esto es un error", error);
      }
    });
  }

  // 🔧 Acá llamás la función para cada botón con sus piezas específicas:
  cargarStockMotor("StockMotores330", {
    bruto: [
      "Corona 330",
      "Seguer",
      "Sinfin",
      "Motor 220w",
      "Ruleman6005",
      "Ruleman6205",
      "Oring",
      "Ruleman6000",
    ],
    torno: ["Manchon", "Eje"],
    terminado: ["Caja 330"],
  });

  cargarStockMotor("StockMotores300", {
    bruto: [
      "Corona 300",
      "Seguer",
      "Sinfin",
      "Motor 220w",
      "Ruleman6005",
      "Ruleman6205",
      "Oring",
      "Ruleman6000",
    ],
    torno: ["Manchon", "Eje"],
    terminado: ["Caja 300"],
  });

  cargarStockMotor("StockMotores250", {
    bruto: [
      "Corona 250",
      "Seguer",
      "Sinfin",
      "Motor250 220w",
      "Ruleman6004",
      "Ruleman6204",
      "Oring",
      "RulemanR6",
    ],
    torno: ["Manchon 250", "Eje 250"],
    terminado: ["Caja 250"],
  });

  cargarStockMotor("StockMotoresECO", {
    bruto: [
      "Polea Grande",
      "Polea Chica",
      "Tecla",
      "Capacitores",
      "Conector Hembra",
      "Cable Corto Eco",
      "Motor ECO 220w",
      "Tapa Correa Eco",
      "Correa Eco",
      "Capuchon Motor Dodo",
      "Rectangulo Plastico Eco",
      "Ventilador Motor",
    ],
    torno: ["Buje Eje Eco"],
    augeriado: ["Tornillo Teletubi Eco"],
    terminado: ["Caja Soldada Eco"],
  });

  ///Stock de motores

  document
    .getElementById("stockMotoresFinales")
    .addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:5000/api/Motores");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const piezaBrutoEnFabrica = await res.json();

        const piezasLista = {
          terminado: [
            "CajaMotor_330",
            "CajaMotor_300",
            "CajaMotor_250",
            "CajaMotor_ECO",
          ],
        };

        const datosTabla = piezaBrutoEnFabrica.map((p) => {
          let categoria = Object.keys(piezasLista).find((key) =>
            piezasLista[key].includes(p.nombre)
          );
          return {
            nombre: p.nombre,
            cantidad: p.cantidad?.[categoria]?.cantidad, // Evitar undefined
            stock: p.cantidad?.[categoria]?.stock_deseado,
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

          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.error("Esto es un error:", error);
      }
    });

  // --------- Columna 3: Pre-Armado ---------
  const preArmadoDiv = document.createElement("div");
  preArmadoDiv.id = "colPreArmado";
  preArmadoDiv.style.flex = "1";
  preArmadoDiv.style.minWidth = "250px";
  preArmadoDiv.style.border = "1px solid #ccc";
  preArmadoDiv.style.padding = "10px";
  preArmadoDiv.style.borderRadius = "8px";

  const preArmadas = generarSelector(ParteMaquinasPrearmado);

  preArmadoDiv.innerHTML = `
      <div class="">
        <div class="">
          <h3 class="tituloBtnMotoreArmados" >Stock de Pre Armado</h3>
          <div class="boxBotonesCajas">
            <button id="PreArmadoi330">PreInox 330</button>
            <button id="PreArmadoi300">PreInox 300</button>
            <button id="PreArmadop330">PrePintada 330</button>
            <button id="PreArmadop300">PrePintada 300</button>
            <button id="PreArmadoi250">PreInox 250</button>
            <button id="PreArmadoieco">PreInox Eco</button>
          </div>
        </div>
        <div class="container-enviosSoldador">
          <p class="tituloBtnMotoreArmados" >Entregas de Afilador</p>
          <div class="row">
            <label for="piezaEnviarAfilador2">Enviar</label>
            <select id="piezaSeleccionadaPreArmado" class="selector">
              ${preArmadas}
            </select>
          </div>
          <div class="row">
            <label for="cantidadEnviarAfilador2">Cantidad:</label>
            <input class="cantidades" type="number" id="cantpreArmado" min="0" required />
            <button class="btnArmarPre" id="btnArmarPre">Base PreArmado</button>
          </div>
        </div>
        <div class="boxmecanizaodMotores">
          <p class="tituloBtnMotoreArmados" >Pre Bases Armadas </p>
          <div class="boxMotoresTorneado">
            <button id="StockPreArmado">Bases Pre Armadas</button>
          </div>
        </div>
      </div>
    `;
  BoxArmado.appendChild(preArmadoDiv);

  async function cargarPreArmado(idButon, PiezaPreArmado) {
    document.getElementById(idButon).addEventListener("click", async () => {
      try {
        const res = await fetch("http://localhost:5000/api/StockPrearmado");
        if (!res.ok) throw new Error("Error en respuest del Servidoe");

        const PiezaJsonPrearmado = await res.json();

        const PiezaValidad = Object.values(PiezaPreArmado).flat();
        const piezaFiltradass = PiezaJsonPrearmado.filter((p) =>
          PiezaValidad.includes(p.nombre)
        );

        const datosTabla = piezaFiltradass.map((p) => {
          let categoria = Object.keys(PiezaPreArmado).find((key) =>
            PiezaPreArmado[key].includes(p.nombre)
          );
          return {
            nombre: p.nombre,
            cantidad: p.cantidad?.[categoria]?.cantidad,
            stock: p.cantidad?.[categoria]?.stock_deseado,
          };
        });

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
          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  cargarPreArmado("PreArmadoi330", {
    bruto: [
      "Espiral",
      "Perilla Numerador",
      "Tapita Perilla",
      "Patas",
      "Resorte Movimiento",
      "Tecla",
      "Cable 220w",
      "Resorte Carro",
      "Capacitores",
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: [
      "baseInox330",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_330",
    ],
    balancin: ["Guia U"],
    soldador: ["Varilla 330"],
  });
  cargarPreArmado("PreArmadoi300", {
    bruto: [
      "Espiral",
      "Perilla Numerador",
      "Tapita Perilla",
      "Patas",
      "Resorte Movimiento",
      "Tecla",
      "Cable 220w",
      "Resorte Carro",
      "Capacitores",
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: [
      "baseInox300",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_300",
    ],
    balancin: ["Guia U"],
    soldador: ["Varilla 300"],
  });
  cargarPreArmado("PreArmadop330", {
    bruto: [
      "Espiral",
      "Perilla Numerador",
      "Tapita Perilla",
      "Patas",
      "Resorte Movimiento",
      "Tecla",
      "Cable 220w",
      "Resorte Carro",
      "Capacitores",
      "Bandeja 330",
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: [
      "basePintada330",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_330",
    ],
    balancin: ["Guia U"],
    soldador: ["Varilla 330"],
  });
  cargarPreArmado("PreArmadop300", {
    bruto: [
      "Espiral",
      "Perilla Numerador",
      "Tapita Perilla",
      "Patas",
      "Resorte Movimiento",
      "Tecla",
      "Cable 220w",
      "Resorte Carro",
      "Capacitores",
      "Bandeja 300",
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: [
      "basePintada300",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_300",
    ],
    balancin: ["Guia U"],
    soldador: ["Varilla 300"],
  });
  cargarPreArmado("PreArmadoi250", {
    bruto: [
      "Espiral",
      "Perilla Numerador",
      "Tapita Perilla",
      "Patas",
      "Resorte Movimiento",
      "Tecla",
      "Cable 220w",
      "Capacitores 250",
    ],
    augeriado: ["Movimiento", "Carros 250"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: [
      "baseInox250",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_250",
    ],
    balancin: ["Guia U"],
    soldador: ["Varilla 250"],
  });
  cargarPreArmado("PreArmadoieco", {
    bruto: [
      "Espiral",
      "Tapita Perilla",
      "Cable Eco 220w",
      "Patas",
      "Perilla Numerador",
      "Resorte Carro",
      "Resorte Movimiento",
    ],
    terminado: [
      "baseInoxECO",
      "Aro Numerador",
      "Eje Rectificado",
      "CajaMotor_ECO",
    ],
    torno: ["Rueditas", "Tornillo guia"],
    augeriado: ["Movimiento", "Carros"],
    balancin: ["Guia U"],
    soldador: ["Varilla 330"],
  });

  document
    .getElementById("StockPreArmado")
    .addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:5000/api/Prearmado");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const Motores = await res.json();

        const PiezaMotores = {
          bruto: [
            "BasePreArmada_Inox330",
            "BasePreArmada_Inox300",
            "BasePreArmada_Inox250",
            "BasePreArmada_InoxECO",
            "BasePreArmada_Pintada330",
            "BasePreArmada_Pintada300",
          ],
        };

        const motoresFiltrado = Motores.filter((p) =>
          PiezaMotores.bruto.includes(p.nombre)
        );
        const datosTabla = motoresFiltrado.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.terminado?.cantidad,
        }));

        if (!tablaDiv) {
          console.error("No Se encontro el elemento con id TablaDiv");
          return;
        }

        new Tabulator(tablaDiv, {
          height: 500,
          layout: "fitColumns",
          data: datosTabla,
          initialSort: [{ column: "nombre", dir: "asc" }],
          columns: [
            { title: "Nombre", field: "nombre", minWidth: 200 },
            { title: "Cantidad", field: "cantidad", with: 100 },
          ],
          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.log("ERROR EM EL SERVIDOR", error);
      }
    });

  document.getElementById("btnArmarPre").addEventListener("click", function () {
    const piezaSeleccionada = document.getElementById(
      "piezaSeleccionadaPreArmado"
    );
    const cantidadSeleccionada = document.getElementById("cantpreArmado");

    const pieza = piezaSeleccionada.value;
    const cantidad = cantidadSeleccionada.value;
    if (pieza && cantidad > 0) {
      fetch(`http://localhost:5000/api/preArmado/${pieza}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad: cantidad }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.mensaje);
          alert(data.mensaje);
          cantidadSeleccionada.value = "";
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      console.log("Por favor, seleccione una pieza y una cantidad válida.");
      alert("Por favor, seleccione una pieza y una cantidad válida.");
    }
  });

  // --------- Columna 4: Armado Final ---------
  const armadoFinalDiv = document.createElement("div");
  armadoFinalDiv.id = "colArmadoFinal";
  armadoFinalDiv.style.flex = "1";
  armadoFinalDiv.style.minWidth = "250px";
  armadoFinalDiv.style.border = "1px solid #ccc";
  armadoFinalDiv.style.padding = "10px";
  armadoFinalDiv.style.borderRadius = "8px";
  armadoFinalDiv.style.marginRight = "10px";

  const maquinasArmadas = generarSelector(Maquinas);
  const todoslosmeses = generarSelector(meses);

  armadoFinalDiv.innerHTML = `
      <div class="boxArmado">
        <h3 class="tituloBtnMotoreArmados">Armado Final</h3>
        <div class="boxBotonesMaquinas">
        <button id="maquinasi330">Inox 330 </button>
        <button id="maquinasp330">Pintada 330 </button>
        <button id="maquinasi250">Inox 250 </button>
        <button id="maquinasi300">Inox 300 </button>
        <button id="maquinasp300">Pintada 300 </button>
        <button id="maquinasiECO">Inox Eco </button>
        </div>
      </div>
  
      <div class="container-enviosSoldador">
        <p class="tituloBtnMotoreArmados">Maquinas Terminadas</p>
        <div class="row">
          <label for="piezaEnviarAfilador3">Enviar</label>
          <select id="maquinaSeleccionada" class="selector">
            ${maquinasArmadas}
          </select>
        </div>
        <div class="row">
          <label for="cantidadEnviarAfilador3">Cantidad:</label>
          <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
          <button class="btnArmarfinal" id="btnArmarfinal" >Terminadas</button>
        </div>
      </div>
  
      <div class="boxMotoresTorneado">
      <p class="tituloBtnMotoreArmados" >Maquinas Terminadas / grafico</p>
        <div class="boxBotonesCajas">
          <button id="MaquinasTerminadas" >Maquinas Armadas</button>
<button id="abrirGraficos">Graficos del Mes</button>            
        </div>
      </div>

    <div style="margin-top: 20px; padding: 10px; border: 1px solid white; border-radius: 8px;">
    <p class="tituloBtnMotoreArmados">Cierre del Mes</p>
    <div class="boxBotonesCajas">
      <div class="row">
          <label for="text">Enviar</label>
          <select id="mesSeleccionado" class="selector">
            ${todoslosmeses}
          </select>
          <button id="CerraMes">Cerra Mes</button>
          <button id="GraficoAnual">Grafico Anual</button>
        </div>
        <p id="cantidadDeMaquinas">cantidad Total</p>
    </div>
  </div>`;

  BoxArmado.appendChild(armadoFinalDiv);

  async function cargarArmadoFinal(idButon, PiezaArmado) {
    document.getElementById(idButon).addEventListener("click", async () => {
      try {
        const res = await fetch("http://localhost:5000/api/piezasArmado");
        if (!res.ok) throw new Error("Error en respuest del Servidoe");

        const PiezaJsonPrearmado = await res.json();

        const PiezaValidad = Object.values(PiezaArmado).flat();
        const piezaFiltradass = PiezaJsonPrearmado.filter((p) =>
          PiezaValidad.includes(p.nombre)
        );

        const datosTabla = piezaFiltradass.map((p) => {
          let categoria = Object.keys(PiezaArmado).find((key) =>
            PiezaArmado[key].includes(p.nombre)
          );
          return {
            nombre: p.nombre,
            cantidad: p.cantidad?.[categoria]?.cantidad,
            stock: p.cantidad?.[categoria]?.stock_deseado,
          };
        });

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
            { title: "Nombre", field: "nombre", minWidth: 200 },
            { title: "Cantidad", field: "cantidad", width: 100 },
          ],
          rowFormatter: function (row) {
            const data = row.getData();

            if (data.cantidad < data.stock) {
              row.getElement().style.backgroundColor = "#f8d7da"; // rojo claro (menos del deseado)
            } else {
              row.getElement().style.backgroundColor = "#d4edda"; // verde claro (ok o más del deseado)
            }
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  cargarArmadoFinal("maquinasi330", {
    terminado: [
      "Brazo 330",
      "Cubrecuchilla 330",
      "Velero",
      "Teletubi 330",
      "Vela 330",
      "Planchada 330",
      "Varilla Brazo 330",
      "Tapa Afilador",
      "Tubo Manija",
      "Afilador",
      "BasePreArmada_Inox330",
    ],
    bruto: [
      "Cubre Motor Rectangulo",
      "Cubre Motor Cuadrado",
      "Cuchilla 330",
      "Perilla Brazo",
      "Resorte Brazo",
      "Pipas",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 330",
      "Piedra Afilador",
      "Pinche Frontal",
      "Pinche lateral",
    ],
    soldador: ["Cuadrado Regulador"],
    pulido: ["CabezalInox"],
  });

  cargarArmadoFinal("maquinasi300", {
    terminado: [
      "Brazo 300",
      "Cubrecuchilla 300",
      "Velero",
      "Teletubi 300",
      "Vela 300",
      "Planchada 300",
      "Varilla Brazo 300",
      "Tapa Afilador",
      "Tubo Manija",
      "Afilador",
      "BasePreArmada_Inox300",
    ],
    bruto: [
      "Cubre Motor Rectangulo",
      "Cubre Motor Cuadrado",
      "Cuchilla 300",
      "Perilla Brazo",
      "Resorte Brazo",
      "Pipas",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 300",
      "Piedra Afilador",
      "Pinche Frontal",
      "Pinche lateral",
    ],
    soldador: ["Cuadrado Regulador"],
    pulido: ["CabezalInox"],
  });

  cargarArmadoFinal("maquinasp330", {
    terminado: [
      "Brazo 330",
      "Cubrecuchilla 330",
      "Velero",
      "Teletubi 330",
      "Vela 330",
      "Planchada 330",
      "Varilla Brazo 330",
      "Tapa Afilador",
      "Tubo Manija",
      "Afilador",
      "BasePreArmada_Pintada330",
      "CabezalPintada",
    ],
    bruto: [
      "Cubre Motor Rectangulo",
      "Cubre Motor Cuadrado",
      "Cuchilla 330",
      "Perilla Brazo",
      "Resorte Brazo",
      "Pipas",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 330",
      "Piedra Afilador",
      "Pinche Frontal",
      "Pinche lateral",
    ],
    soldador: ["Cuadrado Regulador"],
  });

  cargarArmadoFinal("maquinasp300", {
    terminado: [
      "Brazo 300",
      "Cubrecuchilla 300",
      "Velero",
      "Teletubi 300",
      "Vela 300",
      "Planchada 300",
      "Varilla Brazo 300",
      "Tapa Afilador",
      "Tubo Manija",
      "Afilador",
      "BasePreArmada_Pintada300",
      "CabezalPintada",
    ],
    bruto: [
      "Cubre Motor Rectangulo",
      "Cubre Motor Cuadrado",
      "Cuchilla 300",
      "Perilla Brazo",
      "Resorte Brazo",
      "Pipas",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 300",
      "Piedra Afilador",
      "Pinche Frontal",
      "Pinche lateral",
    ],
    soldador: ["Cuadrado Regulador"],
  });

  cargarArmadoFinal("maquinasiECO", {
    terminado: [
      "Brazo 330",
      "Cubrecuchilla 330",
      "Velero",
      "Vela 330",
      "Planchada 330",
      "Varilla Brazo 330",
      "Tubo Manija",
      "Afilador",
      "BasePreArmada_InoxECO",
      "Tapa Afilador Eco",
      "Teletubi Eco",
    ],
    bruto: [
      "Perilla Brazo",
      "Resorte Brazo",
      "Cuchilla 330",
      "Pipas",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 250",
      "Piedra Afilador",
      "Pinche Frontal",
      "Pinche lateral",
      "Pitito Teletubi Eco",
    ],
    soldador: ["Cuadrado Regulador"],
    pulido: ["CabezalInox"],
  });

  cargarArmadoFinal("maquinasi250", {
    terminado: [
      "Brazo 250",
      "Cubrecuchilla 250",
      "Velero",
      "Teletubi 250",
      "Vela 250",
      "Planchada 250",
      "Varilla Brazo 250",
      "Tapa Afilador 250",
      "Tubo Manija 250",
      "Afilador",
      "BasePreArmada_Inox250",
    ],
    bruto: [
      "Cubre Motor Rectangulo",
      "Perilla Brazo",
      "Resorte Brazo",
      "Pipas",
      "Cuchilla 250",
      "Perilla Cubrecuchilla",
      "Perilla Afilador",
      "Base Afilador 250",
      "Piedra Afilador",
      "Pinche Frontal 250",
      "Pinche lateral 250",
    ],
    soldador: ["Cuadrado Regulador"],
    pulido: ["Cabezal250"],
  });

  document
    .getElementById("MaquinasTerminadas")
    .addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:5000/api/maquinasTerminadas");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const piezaBrutoEnFabrica = await res.json();

        const piezasLista = {
          terminado: [
            "Inox_330",
            "Inox_300",
            "Inox_250",
            "Pintada_330",
            "Pintada_300",
            "Inox_ECO",
          ],
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
    });

  document
    .getElementById("btnArmarfinal")
    .addEventListener("click", async function () {
      const piezaSeleccionada = document.getElementById("maquinaSeleccionada");
      const cantidadSeleccionada = document.getElementById(
        "cantidadMaquinasArmadas"
      );

      const pieza = piezaSeleccionada.value;
      const cantidad = cantidadSeleccionada.value;
      if (pieza && cantidad > 0) {
        fetch(`http://localhost:5000/api/ArmadoFinal/${pieza}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidad }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.mensaje);
            alert(data.mensaje);
            cantidadSeleccionada.value = "";
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        console.log("Por favor, seleccione una pieza y una cantidad válida.");
        alert("Por favor, seleccione una pieza y una cantidad válida.");
      }
    });

  ///////// GRAFICOS
  document.getElementById("abrirGraficos").addEventListener("click", () => {
    const nuevaVentana = window.open("", "Graficos", "width=500,height=500");

    nuevaVentana.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Gráficos del Mes</title>
          <style>
            body {
              background: #222;
              color: white;
              font-family: sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            canvas {
              max-width: 90%;
            }
            body.dark-mode {
                background-color: #121212;
                color: #e0e0e0;
            }
          </style>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
          <p>Gráficos del Mes</p>
          <canvas id="myChart" width="300" height="200"></canvas>
          <script>
             fetch("http://localhost:5000/api/datosGraficos") 
    .then(res => res.json())
    .then(data => {
      const labels = data.map(item => item.nombre.replace("_", " "));
      const cantidades = data.map(item => item.cantidad);
      
      // 👉 Calcular el total de todas las máquinas terminadas
      const totalMaquinas = cantidades.reduce((acc, curr) => acc + curr, 0);

      // 👉 Insertar el total en el DOM (crear un elemento antes del canvas)
      const totalElement = document.createElement("h3");
      totalElement.textContent = "Total de máquinas terminadas: " + totalMaquinas;
      totalElement.style.marginBottom = "20px";
      totalElement.style.color = "#4bc0c0";
      document.body.insertBefore(totalElement, document.getElementById("myChart"));

      const ctx = document.getElementById("myChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Máquinas Terminadas",
            data: cantidades,
            backgroundColor: "#4bc0c0",
            borderColor: "#36a2eb",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(err => {
      console.error("Error al cargar los datos:", err);
    });
          <\/script>
        </body>
      </html>
    `);
  });

  document.getElementById("CerraMes").addEventListener("click", async () => {
    try {
      // Obtener el valor del mes seleccionado
      const mesSeleccionado = document.getElementById("mesSeleccionado").value;

      // Validar que realmente se ha seleccionado un mes
      if (!mesSeleccionado) {
        alert("Por favor, selecciona un mes.");
        return;
      }

      const cantidad = 0;

      // Mostrar el mes seleccionado en la consola
      console.log("Mes seleccionado:", mesSeleccionado);

      const res = await fetch("http://localhost:5000/api/cierreMes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad, mesSeleccionado }), // Enviamos también el mes seleccionado
      });

      const data = await res.json();
      alert(`Total de máquinas:  ${data.totalMaquinas}`);
      const total = document.getElementById("cantidadDeMaquinas");
      total.innerText = data.totalMaquinas;
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.");
    }
  });

  async function obtenerCantidadTotal() {
    let totalCantidad = 0;
    try {
      const res = await fetch("http://localhost:5000/api/totall");
      const data = await res.json();

      if (data.totalCantidad !== undefined) {
        totalCantidad = data.totalCantidad;
      }

      document.getElementById(
        "cantidadDeMaquinas"
      ).textContent = `Cantidad Total: ${totalCantidad}`;
    } catch (error) {
      console.error("Error al obtener la cantidad total de máquinas:", error);
    }
  }

  function inicarContador() {
    obtenerCantidadTotal();

    setInterval(() => {
      obtenerCantidadTotal();
    }, 5000);
  }

  inicarContador();


  document.getElementById("GraficoAnual").addEventListener("click", () => {
    const nuevaVentana = window.open("", "GraficoAnual", "width=800,height=600");
  
    nuevaVentana.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Gráficos del Mes</title>
          <style>
            body {
              background: #222;
              color: white;
              font-family: sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 10px;
            }
            canvas {
              max-width: 90%;
              max-height: 80%;
            }
            #controls {
              margin-top: 20px;
              display: flex;
              gap: 10px;
              align-items: center;
            }
            select, button {
              padding: 10px;
              font-size: 16px;
              border-radius: 5px;
              border: none;
            }
            select {
              background-color: #444;
              color: white;
            }
            button {
              background-color: #ff4444;
              color: white;
              cursor: pointer;
            }
            button:hover {
              background-color: #cc0000;
            }
          </style>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
          <h2>Gráficos del Mes</h2>
          <canvas id="graficoMeses" width="600" height="300"></canvas>
      
          <div id="controls">
            <label for="anioSelect">Seleccionar Año:</label>
            <select id="anioSelect">
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <button id="resetButton">Resetear Piezas</button>
          </div>
  
          <script>
            const mesesValidos = [
              "enero", "febrero", "marzo", "abril", "mayo", "junio",
              "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];
  
            fetch("http://localhost:5000/api/graficoAnual")
              .then(res => res.json())
              .then(data => {
                const meses = [];
                const cantidades = [];
  
                for (const mes of mesesValidos) {
                  if (data[mes] !== undefined) {
                    meses.push(mes);
                    cantidades.push(data[mes]);
                  }
                }
  
                const totalMaquinas = cantidades.reduce((acc, curr) => acc + curr, 0);
                const totalElement = document.createElement("h4");
                totalElement.textContent = "Total de Máquinas Anual: " + totalMaquinas;
                document.body.insertBefore(totalElement, document.getElementById("graficoMeses"));
  
                const ctx = document.getElementById("graficoMeses").getContext("2d");
  
                new Chart(ctx, {
                  type: "bar",
                  data: {
                    labels: meses,
                    datasets: [{
                      label: "Máquinas terminadas",
                      data: cantidades,
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1
                    }]
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              });
  
            function resetearPiezas() {
              const anio = document.getElementById("anioSelect").value;
  
              fetch("http://localhost:5000/api/resetAnual", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ anio }),
              })
                .then(response => response.json())
                .then(data => {
                  alert(data.mensaje);
                  document.getElementById("resetButton").textContent = "Piezas Reseteadas ✔";
                  window.close(); // <- Esto cierra la ventana

                })
                .catch(error => {
                  console.error("Error al resetear las piezas:", error);
                  alert("Hubo un error al resetear las piezas.");
                });
            }
  
            document.getElementById("resetButton").addEventListener("click", resetearPiezas);
          </script>
        </body>
      </html>
    `);
  });
  
  



}

module.exports = { boxArmado };
