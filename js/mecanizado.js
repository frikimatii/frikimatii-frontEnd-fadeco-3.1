function box() {
  async function mostrarTablasPlasma() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/plasma`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasPlegadora() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/plegadora`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasCorte() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/corte`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasTorno() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/torno`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasAugeriado() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/augeriado`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasBalancin() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/balancin`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasFresa() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/fresa`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasPulido() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/pulido`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }

  async function mostrarTablasSoldador() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/soldador`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.bruto?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  
  async function actualizarPieza(piezaSeleccionada, cantidadSeleccionada) {

    try {
      // Realizar la solicitud PUT al servidor
      const response = await fetch(
        `http://localhost:5000/api/piezas/mecanizado/${piezaSeleccionada}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cantidad: cantidadSeleccionada,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en responder el servidor");
      }

      // Obtener la respuesta y manejar el resultado
      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.mensaje) {
        alert(data.mensaje); // Muestra el mensaje de éxito
      }
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert("Hubo un error al intentar actualizar la pieza.");
    }
  }
  const objetosMecanizados = [
    {
      augeriado: {
        piezas: [
          "cuadrado_regulador",
          "brazo_330",
          "brazo_300",
          "brazo_250",
          "carros",
          "carros_250",
          "movimiento",
          "tornillo_teletubi_eco",
          "caja_soldada_eco",
        ],
        imagen: "https://i.postimg.cc/fyYZgvx6/augeriado.png",
        mecanizado: "augeriado",
        funcion: mostrarTablasAugeriado,
      },
      fresa: {
        piezas: [
          "vela_250",
          "vela_300",
          "vela_330",
          "planchada_330",
          "planchada_300",
          "planchada_250",
        ],
        imagen: "https://i.postimg.cc/pLWxqzy6/fresado.png",
        mecanizado: "fresa",
        funcion: mostrarTablasFresa,
      },
      pulido: {
        piezas: ["cabezal Inox", "cabezal 250"],
        imagen: "https://i.postimg.cc/2jnDY2Zt/pulido.png",
        mecanizado: "pulido",
        funcion: mostrarTablasPulido,
      },
      plegadora: {
        piezas: [
          "ChapaBase_330Inox",
          "ChapaBase_300Inox",
          "ChapaBase_330Pintada",
          "ChapaBase_300Pintada",
          "ChapaBase 250Inox",
          "lateral_i330_contecla",
          "lateral_i330_sintecla",
          "lateral_i300_contecla",
          "lateral_i300_sintecla",
          "lateral_i250_contecla",
          "lateral_i250_sintecla",
          "lateral_p330_contecla",
          "lateral_p330_sintecla",
          "lateral_p300_contecla",
          "lateral_p300_sintecla",
          "lateral_i330_eco",
          "bandeja_cabezal_inox_250",
          "bandeja_cabezal_pintada",
          "bandeja_cabezal_inox",
          "chapa_U_inox_250",
          "chapa_U_pintada",
          "chapa_U_inox",
          "planchada_fresada_300",
          "planchada_fresada_330",
          "planchada_fresada_250",
        ],
        imagen: "https://i.postimg.cc/MK8zfhwx/dobladora.png",
        mecanizado: "plegadora",
        funcion: mostrarTablasPlegadora,
      },
      plasma: {
        piezas: [
          "ChapaBase_330Inox",
          "ChapaBase_300Inox",
          "ChapaBase_330Pintada",
          "ChapaBase_300Pintada",
          "ChapaBase_250Inox",
          "lateral_i330_contecla",
          "lateral_i330_sintecla",
          "lateral_i300_contecla",
          "lateral_i300_sintecla",
          "lateral_i250_contecla",
          "lateral_i250_sintecla",
          "lateral_p330_contecla",
          "lateral_p330_sintecla",
          "lateral_p300_contecla",
          "lateral_p300_sintecla",
          "lateral_i330_eco",
          "planchada_330",
          "planchada_300",
          "planchada_250",
          "vela_330",
          "vela_300",
          "vela_250",
          "bandeja_cabezal_inox_250",
          "bandeja_cabezal_pintada",
          "bandeja_cabezal_inox",
          "pieza_caja_eco",
          "media_luna",
        ],
        imagen: "https://i.postimg.cc/W11LMVHR/plasma.png",
        mecanizado: "plasma",
        funcion: mostrarTablasPlasma,
      },
      corte: {
        piezas: [
          "planchuela_250",
          "planchuela_300",
          "planchuela_330",
          "varilla_300",
          "varilla_330",
          "varilla_250",
          "portaeje",
          "eje_rectificado",
          "varilla_brazo_330",
          "varilla_brazo_300",
          "varilla_brazo_250",
          "tubo_manija",
          "tubo_manija_250",
          "cuadrado_regulador",
          "palanca_afilador",
          "eje_corto",
          "eje_largo",
          "buje_eje_eco",
          "teletubi_eco",
          "guia_u",
          "chapa_cubre_cabezal_inox",
          "chapa_cubre_cabezal_pintada",
          "chapa_cubre_cabezal_inox_250",
          "planchuela_inferior",
          "planchuela_interna",
        ],
        imagen: "https://i.postimg.cc/yYBz8ch8/sierra.png",
        mecanizado: "corte",
        funcion: mostrarTablasCorte,
      },
      balancin: {
        piezas: [
          "planchuela_250",
          "planchuela_300",
          "planchuela_330",
          "portaeje",
          "guia_u",
          "teletubi_eco",
          "chapaU_inox",
          "chapaU_pintada",
          "chapaU_inox_250",
          "eje_corto",
          "eje_largo",
        ],
        imagen: "https://i.postimg.cc/1RF9tyLJ/balancin.png",
        mecanizado: "balancin",
        funcion: mostrarTablasBalancin,
      },
      torno: {
        piezas: [
          "buje_eje_eco",
          "eje",
          "eje_250",
          "manchon",
          "manchon_250",
          "rueditas",
          "tornillo_guia",
          "carros",
          "carros_250",
          "movimiento",
          "caja_300",
          "caja_330",
          "caja_250",
          "cubrecuchilla_300",
          "teletubi_300",
          "tornillo_teletubi_eco",
          "caja_330_armada",
          "caja_300_armada",
          "caja_250_armada",
          "caja_eco_armada",
          "tapa_afilador_eco_torno",
        ],
        imagen: "https://i.postimg.cc/bwVXg57Z/torno.png",
        mecanizado: "torno",
        funcion: mostrarTablasTorno,
      },
      soldador: {
        piezas: [
          "vela_fresada_330",
          "vela_fresada_300",
          "vela_fresada_250",
          "planchada_doblada_250",
          "planchada_doblada_330",
          "planchada_doblada_300",
          "varilla_330",
          "varilla_300",
          "varilla_250",
          "cuadrado_regulador",
          "cabezal_inox",
          "cabezal_pintada",
          "cabezal_eco",
        ],
        imagen: "https://i.postimg.cc/Nf4v9Fb7/soldador.png",
        mecanizado: "soldador",
        funcion: mostrarTablasSoldador,
      },
    },
  ];

  const listaDeMecanizado = [
    "plegadora",
    "plasma",
    "corte",
    "torno",
    "fresa",
    "soldador",
    "pulido",
    "balancin",
    "augeriado",
  ]; // Lista de claves principales

  const contenedor = document.querySelector(".cajasMecanizados"); // Seleccionamos el contenedor
  document
    .querySelector(".cajasMecanizados")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("btn")) {
        const mecanizadoId = event.target.id.replace("accionemecanizado-", ""); // Extrae el ID del mecanizado
        const select = document.getElementById(`select-${mecanizadoId}`);
        const inputCantidad = document.getElementById(
          `cantidad-${mecanizadoId}`
        );

        if (select && inputCantidad) {
          const piezaSeleccionada = select.value;
          const cantidadSeleccionada = parseInt(inputCantidad.value, 10); // Convertir a número

          if (piezaSeleccionada && cantidadSeleccionada > 0) {
            console.log(`Mecanizado: ${mecanizadoId}`);
            console.log(`Pieza seleccionada: ${piezaSeleccionada}`);
            console.log(`Cantidad seleccionada: ${cantidadSeleccionada}`);
            actualizarPieza(piezaSeleccionada, cantidadSeleccionada);
          } else {
            alert("Selecciona una pieza y una cantidad válida.");
          }
        }
      }
     
    });
  

  if (!contenedor) {
    console.error(
      "No se encontró el contenedor con la clase 'cajasMecanizados'."
    );
  } else {
    listaDeMecanizado.forEach((r, index) => {
      const colIndex = Math.floor(index / 3);
      let columna = contenedor.querySelector(`.col[data-index="${colIndex}"]`);

      if (!columna) {
        columna = document.createElement("div");
        columna.classList.add("col");
        columna.setAttribute("data-index", colIndex);
        contenedor.appendChild(columna);
      }

      const caja = document.createElement("div");
      caja.classList.add("cajaMecanizadobox");
      caja.id = r;

      // Obtener datos del mecanizado actual (piezas e imagen)
      const mecanizado = objetosMecanizados[0][r] || {};
      const piezas = mecanizado.piezas || []; // Lista de piezas
      const imagen = mecanizado.imagen || ""; // Imagen de respaldo
      const fun = mecanizado.funcion || ""; // Función de respaldo
      // Generar las opciones para el <select>
      let opcionesSelect = `<option value="">Selecciona una pieza</option>`;
      piezas.forEach((pieza) => {
        opcionesSelect += `<option value="${pieza}">${pieza}</option>`;
      });

      caja.innerHTML = `
                <div class="cajacaja">
                    <p class="titulomecanizado">${r}</p>
                    <div class="cajaselectimput">
                        <select class="selector" id="select-${r}">${opcionesSelect}</select>
                        <input class="cantidades" type="number" name="cantidad" id="cantidad-${r}">
                    </div>
                    <div class="box-boton">
                        <button class="btn" id="accionemecanizado-${r}">${r}</button>
                    </div>
                    <div class="sepa"></div>
                    <div class="cajonBotones">
                        <button class="btnstock" id="stockBruto-${r}">Stock Bruto</button>
                        <button class="btnstock" id="stockTerminado-${r}">Stock terminado</button>
                        <img src="${imagen}" alt="${r}">
                    </div>
                </div>`;

      // Add event listener for "Stock Bruto" button
      if (fun) {
        const stockBrutoButton = caja.querySelector(`#stockBruto-${r}`);
        stockBrutoButton.addEventListener("click", fun);
      }

      columna.appendChild(caja);
    });
  }
}

function mostrarbtn() {}

module.exports = { mostrarbtn, box };
