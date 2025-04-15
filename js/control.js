async function controlCalidad() {
  const Maquinas = [
    "Inox_330",
    "Inox_300",
    "Inox_250",
    "Pintada_330",
    "Pintada_300",
    "Inox_ECO",
  ];

  const motores = [
    "CajaMotor_330",
    "CajaMotor_300",
    "CajaMotor_250",
    "CajaMotor_ECO",
  ];

  const Prearmado = [
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

  const boxControl = document.getElementById("zonaControl");

  if (!boxControl) {
    console.error("Elemento No encontrado");
    return;
  }
  // Limpiar y configurar estilo del contenedor principal

  boxControl.innerHTML = "";
  boxControl.style.display = "flex";
  boxControl.style.gap = "20px";
  boxControl.style.flexWrap = "wrap";
  boxControl.style.alignItems = "flex-start";

  data = [];

  // --------- Columna 1: Tabla de Control ---------
  const tablaDiv = document.createElement("div");
  tablaDiv.id = "tablaControl";
  tablaDiv.style.flex = "1";
  tablaDiv.style.minWidth = "100px";
  tablaDiv.style.border = "1px solid #ccc";
  tablaDiv.style.margin = "10px";
  boxControl.appendChild(tablaDiv);

  const columnas = [
    { title: "Nombre", field: "nombre" },
    { title: "Cantidad", field: "cantidad" },
  ];

  new Tabulator(tablaDiv, {
    layout: "fitColumns",
    columns: columnas,
    data: data,
    height: 350,
  });

  // --------- Columna 2: Embalaje Ventas ---------

  const embalajeVentas = document.createElement("div");
  embalajeVentas.id = "colmbalaje";
  embalajeVentas.style.flex = "1";
  embalajeVentas.style.minWidth = "250px";
  embalajeVentas.style.border = "1px solid #ccc";
  embalajeVentas.style.padding = "10px";
  embalajeVentas.style.borderRadius = "8px";
  const maquinasEmabalar = generarSelector(Maquinas);
  embalajeVentas.innerHTML = `

        <div class="">
            <h2>Maquinas para Limpiar</h2>
            <button class="btn-maquinasTermiandas" id="datosEmbalar"> Maquinas Para Embalar</button>   
            <p class="tituloBtnMotoreArmados">Maquinas Embaladas</p>
            <div class="row">
                <label for="text">Embalar</label>
                <select id="maquinaAEmbalar" class="selector">${maquinasEmabalar}
                </select>
            </div>
            <div class="row">
                <label for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasEmabalar" min="0" required />
                <button class="btnEmbalar" id="maquinasLimpia" >Terminadas</button>
            </div>
        </div>
        <div>
            <p>Stock Cantidad Terminado </p>
            <div class="box-btn-ventas">
            <button id="bnt-maquinasLimpiar">Terminado (Ventas)</button>
            <button id="btn-stockEmbalar">Stock Insumos</button>
            </div>
        </div>

         <div style="margin-top: 20px; padding: 10px; border: 1px solid white; border-radius: 8px;">
            <p class="tituloBtnMotoreArmados">Maquinas Vendidas</p>
            <div class="row">
                <label for="">Venta</label>
                <select id="maquinaSeleccionadaV" class="selector">${maquinasEmabalar}
                </select>
            </div>
            <div class="row">
                <label for="cantidadEnviarAfilador3">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadVentas" min="0" required />
                <button class="btnVentas" id="maquinaVendidas" >Terminadas</button>
            </div>
            <div >
            <p>Grafico/Tabla -  VENTAS</p>
                <div class="box-btn-ventas">
                    <button>Grafico</button>
                    <button id="StockVentas">Tabla</button>
                </div>
            </div>
           
        </div>
        `;
  boxControl.appendChild(embalajeVentas);

  const btn = document.getElementById("datosEmbalar");
  btn.addEventListener("click", async function () {
    try {
      const res = await fetch("http://localhost:5000/api/datosEmbalar");
      if (!res.ok) throw new Error("Error en respuestas del servidor");

      const maquinasAlimpiar = await res.json();

      const filtroMaquinas = {
        terminadas: [
          "Inox_250",
          "Inox_300",
          "Inox_330",
          "Inox_ECO",
          "Pintada_300",
          "Pintada_330",
        ],
      };

      const maquinasFiltradas = maquinasAlimpiar.filter((p) =>
        filtroMaquinas.terminadas.includes(p.nombre)
      );

      const datosTabla = maquinasFiltradas.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad.terminadas.cantidad,
      }));

      if (!tablaDiv) {
        console.error("No Se encontro el elemento con id TablaDiv");
        return;
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
    } catch (err) {
      console.log("esto es un Error con el servidor", err);
    }
  });

  const btnLimpiar = document.getElementById("bnt-maquinasLimpiar");
  btnLimpiar.addEventListener("click", async function () {
    try {
      const res = await fetch("http://localhost:5000/api/datosLimpios");
      if (!res.ok) throw new Errro("Erro en respues del servidor");

      const maquinasTerminadas = await res.json();

      const filtroMaquinas = {
        limpias: [
          "Inox_250",
          "Inox_300",
          "Inox_330",
          "Inox_ECO",
          "Pintada_300",
          "Pintada_330",
        ],
      };
      const maquinasFiltradas = maquinasTerminadas.filter((p) =>
        filtroMaquinas.limpias.includes(p.nombre)
      );
      const datosTabla = maquinasFiltradas.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad.limpias.cantidad,
      }));

      if (!tablaDiv) {
        console.error("No Se encontro el elemento con id TablaDiv");
        return;
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
      console.log("esto es un error", error);
    }
  });

  const btnStock = document.getElementById("btn-stockEmbalar");
  btnStock.addEventListener("click", async function () {
    try {
      const res = await fetch("http://localhost:5000/api/stockEmbalar");
      if (!res.ok) throw new Error("Error en respuesta del servidor");

      const stockEmbalar = await res.json();

      const piezasEmbalar = {
        bruto: [
          "F circulo",
          "F Cuadrado",
          "Calco verde eco",
          "Circulo argentina",
          "Fadeco 300 4estrella",
          "Capuchon Afilador",
          "Calco Tensor Correa",
          "Fadeco 300 3estrella",
          "Fadeco 330 3estrella",
          "Manual Instruciones",
          "Fadeco 250 2estrella",
          "Fadeco 330 4estrella",
          "Garantia",
          "Etiqueta Cable",
          "Etiqueta Peligro",
          "Capuchon 250",
          "Ventilador 250",
          "Ventilador Motor",
        ],
      };
      const piezaFiltradas = stockEmbalar.filter((p) =>
        piezasEmbalar.bruto.includes(p.nombre)
      );

      const datosTabla = piezaFiltradas.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad.bruto.cantidad,
      }));

      if (!tablaDiv) {
        console.error("No Se encontro el elemento con id TablaDiv");
        return;
      }

      new Tabulator(tablaDiv, {
        height: 460,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (err) {
      console.log("esto es un Error con el servidor", err);
    }
  });

  document
    .getElementById("maquinasLimpia")
    .addEventListener("click", embalarMaquinasHandler);

  async function embalarMaquinasHandler() {
    const piezaSeleccionada = document.getElementById("maquinaAEmbalar").value;
    const cantidadSeleccionada = parseInt(
      document.getElementById("cantidadMaquinasEmabalar").value,
      10
    );

    if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
      alert("❌ Ingresá una cantidad válida mayor a cero");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/Embalar/${encodeURIComponent(
          piezaSeleccionada
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );

      const data = await res.json(); // Lo convertimos a JSON primero

      if (!res.ok) {
        // Si hay errores específicos, los mostramos en detalle
        if (data.errores && Array.isArray(data.errores)) {
          const mensajeErrores = data.errores.join("\n");
          alert(`❌ ${data.mensaje}\n\n${mensajeErrores}`);
        } else {
          alert(`❌ ${data.mensaje || "Error en el servidor"}`);
        }
        return;
      }

      alert(data.mensaje || "✅ Actualización exitosa");
    } catch (error) {
      console.log("❌ Error:", error);
      alert(error.message || "Ocurrió un error inesperado");
    }
  }

  document
    .getElementById("maquinaVendidas")
    .addEventListener("click", maquinasVendidas);

  async function maquinasVendidas() {
    const piezaSeleccionada = document.getElementById(
      "maquinaSeleccionadaV"
    ).value;
    const cantidadSeleccionada = parseInt(
      document.getElementById("cantidadVentas").value,
      10
    );

    if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
      alert("❌ Ingresá una cantidad válida mayor a cero");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/Ventas/${encodeURIComponent(
          piezaSeleccionada
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );

      console.log(
        "Respuesta del servidor:",
        res.status,
        await res.clone().text()
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.mensaje || "ERror en el servidor");
      }
      alert(data.mensaje || "✅ Actualización exitosa");
    } catch (error) {
      console.log("❌ Error:", error);
      alert(error.message || "Ocurrió un error inesperado");
    }
  }

  const btnVentas = document.getElementById("StockVentas");
  btnVentas.addEventListener("click", async function () {
    try {
      const res = await fetch("http://localhost:5000/api/stockDeVentas");
      if (!res.ok) throw new Error("Error en respuesta del servidor");

      const maquinasVendidas = await res.json();

      const filtroMaquinas = {
        embaladas: [
          "Inox_250",
          "Inox_300",
          "Inox_330",
          "Inox_ECO",
          "Pintada_300",
          "Pintada_330",
        ],
      };

      const maquinasFiltradas = maquinasVendidas.filter((p) =>
        filtroMaquinas.embaladas.includes(p.nombre)
      );

      const datosTabla = maquinasFiltradas.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad.ventas.cantidad,
      }));

      if (!tablaDiv) {
        console.error("No Se encontro el elemento con id TablaDiv");
        return;
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
      console.log("esto es un errro", error);
    }
  });

  // --------- Columna 3: Consultas Pieza ---------

  const consultas = document.createElement("div");
  consultas.id = "colPreArmado";
  consultas.style.flex = "1";
  consultas.style.minWidth = "250px";
  consultas.style.border = "1px solid #ccc";
  consultas.style.padding = "10px";
  consultas.style.borderRadius = "8px";

  const Motores = generarSelector(motores);
  const PreArmado = generarSelector(Prearmado);
  const maquinasArmadas = generarSelector(Maquinas);
  consultas.innerHTML = `<h2>Consultorio de Armado</h2>
<div>
        <div class="container-Control">
        <p  class="controlTitulo">Motores </p>
            <div class="row">
                <label class="labelcontrol"for="text">Motores</label>
                <select id="motorSeleccionado" class="selecConsultorio">${Motores}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMotoresSeleccionado" min="0" required />
                <button class="btnConsultas" id="consultaMotores" >Consulta de Motores</button>
            </div>
        </div>
</div>
<div>
        <div class="container-Control">
                <p class="controlTitulo">PreArmado</p>
            <div class="row">
                <label class="labelcontrol"for="text">PreArmado</label>
                <select id="basePreArmadaSelecc" class="selecConsultorio">${PreArmado}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadPrearmardaSelecc" min="0" required />
                <button class="btnConsultas" id="btnConsultaPreArmado" >Terminadas</button>
            </div>
        </div>
</div>
<div>
        <div class="container-Control">
                <p class="controlTitulo">Armado</p>
            <div class="row">
                <label class="labelcontrol"for="text">Armado</label>
                <select id="armadoSelecc" class="selecConsultorio">${maquinasArmadas}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadArmadoSelecc" min="0" required />
                <button class="btnConsultas" id="btnConsultaArmarfinal" >Terminadas</button>
            </div>
        </div>
</div>`;

  boxControl.appendChild(consultas);

  document.getElementById("consultaMotores").addEventListener("click", consultasDeMotores);
  async function consultasDeMotores() {
    const MotorSeleccionado =
      document.getElementById("motorSeleccionado").value;
    const CantidadSeleccionada = parseInt(
      document.getElementById("cantidadMotoresSeleccionado").value,
      10
    );

    try {
      const response = await fetch(
        `http://localhost:5000/api/verificarArmadoMotores/${MotorSeleccionado}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: CantidadSeleccionada }),
        }
      );

      const data = await response.json();

      console.log("Respuesta de la API:", data);

      if (data.puedeArmar) {
        mostrarVentanaMensaje("✅ Éxito", data.mensaje, data.piezasFaltantes);
      } else {
        mostrarVentanaMensaje(
          "❌ No se puede armar",
          data.mensaje,
          data.piezasFaltantes
        );
        console.log("Faltantes:", data.piezasFaltantes);
      }
    } catch (error) {
      console.error("❌ Error en la consulta:", error);
      alert("Ocurrió un error al verificar el armado.");
    }
  }

  

  document.getElementById("btnConsultaPreArmado").addEventListener('click', consultaPreArmado)
  async function consultaPreArmado(){
    const preArmadoSelecc = document.getElementById("basePreArmadaSelecc").value
    const cantidadSelecc = parseInt( document.getElementById("cantidadPrearmardaSelecc").value, 10)

    try{
      const res = await fetch(`http://localhost:5000/api/verificarPreArmado/${preArmadoSelecc}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cantidad: cantidadSelecc})
      })

      const data = await res.json()

      console.log("Respuesta de la API:", data);

      if (data.puedeArmar) {
        mostrarVentanaMensaje("✅ Éxito", data.mensaje, data.piezasFaltantes);
      } else {
        mostrarVentanaMensaje(
          "❌ No se puede armar",
          data.mensaje,
          data.piezasFaltantes
        );
        console.log("Faltantes:", data.piezasFaltantes);
      }
    } catch (error) {
      console.error("❌ Error en la consulta:", error);
      alert("Ocurrió un error al verificar el armado.");
    }
  }


  document.getElementById("btnConsultaArmarfinal").addEventListener('click', consultaArmadoFinal)
  async function consultaArmadoFinal(){
    const MaquinaSelecc = document.getElementById("armadoSelecc").value
    const CantidaSelecc = parseInt( document.getElementById("cantidadArmadoSelecc").value, 10)

    try{
      const res = await fetch(`http://localhost:5000/api/verificarArmado/${MaquinaSelecc}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cantidad: CantidaSelecc})
      })

      const data = await res.json()

      console.log("Respuesta De La API: ", data)

      if (data.puedeArmar) {
        mostrarVentanaMensaje("✅ Éxito", data.mensaje, data.piezasFaltantes);
      } else {
        mostrarVentanaMensaje(
          "❌ No se puede armar",
          data.mensaje,
          data.piezasFaltantes
        );
        console.log("Faltantes:", data.piezasFaltantes);
      }
    } catch (error) {
      console.error("❌ Error en la consulta:", error);
      alert("Ocurrió un error al verificar el armado.");
    }
  }


  function mostrarVentanaMensaje(titulo, mensaje, piezasFaltantes = []) {
    const ventanaExistente = document.getElementById("ventanaMensaje");
    if (ventanaExistente) ventanaExistente.remove();
  
    const ventana = document.createElement("div");
    ventana.id = "ventanaMensaje";
    ventana.style.position = "fixed";
    ventana.style.top = "50%";
    ventana.style.left = "50%";
    ventana.style.transform = "translate(-50%, -50%)";
    ventana.style.background = "#fff";
    ventana.style.border = "2px solid #333";
    ventana.style.padding = "20px";
    ventana.style.color = "#000";
    ventana.style.borderRadius = "12px";
    ventana.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
    ventana.style.zIndex = "9999";
    ventana.style.maxWidth = "400px";
    ventana.style.textAlign = "center";
  
    const tituloElem = document.createElement("h3");
    tituloElem.innerText = titulo;
    ventana.appendChild(tituloElem);
  
    const mensajeElem = document.createElement("p");
    mensajeElem.innerText = mensaje;
    ventana.appendChild(mensajeElem);
  
    if (piezasFaltantes && piezasFaltantes.length > 0) {
      const lista = document.createElement("ul");
  
      for (let i = 0; i < piezasFaltantes.length; i++) {
        const pieza = piezasFaltantes[i];
        if (pieza && pieza.nombre && pieza.faltante !== undefined) {
          const item = document.createElement("li");
          item.innerHTML = `${pieza.nombre}: faltan <strong>${pieza.faltante}</strong>`;
          lista.appendChild(item);
        }
      }
  
      ventana.appendChild(lista);
    } else {
      const mensajeSinFaltantes = "No hay piezas faltantes";
      const parrafoSinFaltantes = document.createElement("p");
      parrafoSinFaltantes.innerText = mensajeSinFaltantes;
      ventana.appendChild(parrafoSinFaltantes);
    }
  
    // Botón para cerrar la ventana
    const btnCerrar = document.createElement("button");
    btnCerrar.innerText = "Cerrar";
    btnCerrar.style.marginTop = "15px";
    btnCerrar.onclick = () => ventana.remove();
    ventana.appendChild(btnCerrar);
  
    document.body.appendChild(ventana);
  }

  // --------- Columna 4: Pedidos ---------

  const pedidos = document.createElement("div");
  pedidos.id = "colArmadoFinal";
  pedidos.style.flex = "1";
  pedidos.style.minWidth = "250px";
  pedidos.style.border = "1px solid #ccc";
  pedidos.style.padding = "10px";
  pedidos.style.borderRadius = "8px";
  pedidos.style.marginRight = "10px";

  pedidos.innerHTML = `
<h2> Consulta de pedidos </h2>
<div class="pedidos">
    <div>
        <label for="cantidadInox330">Inox330</label>
        <input class="cantidades" type="number" id="cantidadInox330" min="0" required />
    </div>
    <div>
        <label for="cantidadInox300">Inox300</label>
        <input class="cantidades" type="number" id="cantidadInox300" min="0" required />
    </div>
    <div>
        <label for="cantidadInox250">Inox250</label>
        <input class="cantidades" type="number" id="cantidadInox250" min="0" required />
    </div>
    <div>
        <label for="cantidadPintada330">Pintada330</label>
        <input class="cantidades" type="number" id="cantidadPintada330" min="0" required />
    </div>
    <div>
        <label for="cantidadPintada300">Pintada300</label>
        <input class="cantidades" type="number" id="cantidadPintada300" min="0" required />
    </div>
    <div>
        <label for="cantidadInoxECO">InoxECO</label>
        <input class="cantidades" type="number" id="cantidadInoxECO" min="0" required />
    </div>
    <div class="botones">
        <button>Averiguar</button>
        <button>Abrir Registro</button>
    </div>
</div>

`;

  boxControl.appendChild(pedidos);
}

module.exports = { controlCalidad };
