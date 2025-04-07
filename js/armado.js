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
  const piezaAfilador = `
      <option value="pieza1">Pieza 1</option>
      <option value="pieza2">Pieza 2</option>
      <option value="pieza3">Pieza 3</option>
    `;

  // --------- Columna 1: Tabla de Armado ---------
  const tablaDiv = document.createElement("div");
  tablaDiv.id = "tablaArmado";
  tablaDiv.style.flex = "1";
  tablaDiv.style.minWidth = "250px";
  tablaDiv.style.border = "1px solid #ccc";
  tablaDiv.style.margin = "10px";
  BoxArmado.appendChild(tablaDiv);

  const data = [{ nombre: "matiasd", cantidad: 32 }]; // datos de prueba vacíos
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
            <button id="stockMotoresTorno">Motores Torno</button>
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
    augeriado: ["Tornillo Teletubi Eco", "Caja Soldada Eco"],
  });

  ///Stock de motores

  document
    .getElementById("stockMotoresTorno")
    .addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:5000/api/Motores");
        if (!res.ok) throw new Error("Error en respuesta del servidor");

        const piezaBrutoEnFabrica = await res.json();

        const piezasLista = {
          fresa: [
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
    terminado: ["baseInox330", "Aro Numerador", "Eje Rectificado", "CajaMotor_330"],
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
    terminado: ["baseInox300", "Aro Numerador", "Eje Rectificado","CajaMotor_300"],
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
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: ["basePintada330", "Aro Numerador", "Eje Rectificado", "CajaMotor_330"],
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
    ],
    augeriado: ["Movimiento", "Carros"],
    torno: ["Tornillo guia", "Rueditas"],
    terminado: ["basePintada300", "Aro Numerador", "Eje Rectificado", "CajaMotor_300"],
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
    terminado: ["baseInox250", "Aro Numerador", "Eje Rectificado", "CajaMotor_250"],
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
            { title: "Nombre", field: "nombre" , minWidth: 200 },
            { title: "Cantidad", field: "cantidad", with: 100},
          ],
        });
      } catch (error) {
        console.log("ERROR EM EL SERVIDOR", error);
      }
    });

  document.getElementById('btnArmarPre').addEventListener('click', function (){
    const piezaSeleccionada = document.getElementById("piezaSeleccionadaPreArmado");
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
  })

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

  armadoFinalDiv.innerHTML = `
      <div class="">
        <h3 class="tituloBtnMotoreArmados">Armado Final</h3>
        <div class="boxBotonesMaquinas">
        <button id="maquinasI330>Inox 330</button>
        <button id="maquinasP300>Pintada 330</button>
        <button id="maquinasI250>Inox 250</button>
        <button id="maquinasI300>Inox 300</button>
        <button id="maquinasP300>Pintada 300</button>
        <button id="maquinasIECO>Inox Eco</button>
        </div>
      </div>
  
      <div class="container-enviosSoldador">
        <p class="tituloBtnMotoreArmados">Maquinas Terminadas</p>
        <div class="row">
          <label for="piezaEnviarAfilador3">Enviar</label>
          <select id="piezaEnviarAfilador3" class="selector">
            ${maquinasArmadas}
          </select>
        </div>
        <div class="row">
          <label for="cantidadEnviarAfilador3">Cantidad:</label>
          <input class="cantidades" type="number" id="cantidadEnviarAfilador3" min="0" required />
          <button class="btnArmarfinal">Terminadas</button>
        </div>
      </div>
  
      <div class="boxMotoresTorneado">
      <p class="tituloBtnMotoreArmados" >Maquinas Terminadas / grafico</p>
        <div class="boxBotonesCajas">
          <button>Motores Torno</button>
          <button>Motores Armado</button>
        </div>
      </div>

        <div style="margin-top: 20px; padding: 10px; border: 1px solid white; border-radius: 8px;">
    <p class="tituloBtnMotoreArmados">Cierre del Mes</p>
    <div class="boxBotonesCajas">
      <div class="row">
          <label for="piezaEnviarAfilador3">Enviar</label>
          <select id="piezaEnviarAfilador3" class="selector">
            ${piezaAfilador}
          </select>
          <button>Ver Historial</button>
        </div>
      
    </div>
  </div>`;

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
        });
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  BoxArmado.appendChild(armadoFinalDiv);
}

module.exports = { boxArmado };
