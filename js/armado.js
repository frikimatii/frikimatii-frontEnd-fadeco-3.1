async function boxArmado() {
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
    tablaDiv.style.margin= "10px"
    BoxArmado.appendChild(tablaDiv);
  
    const data = [
        {nombre: "matiasd", cantidad: 32}
    ]; // datos de prueba vacíos
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
  
    motoresDiv.innerHTML = `
      <div class="boxMotores">
        <div class="stockMotores">
          <h3 class="tituloMotores">Stock Motores</h3>
          <button class="btnMotores">Motores</button>
        </div>
        <div class="cajaModelosMotores">
          <p class="tituloBtnMotoreArmados">Stock Por Modelo</p>
          <div>
            <button>Caja 330</button>
            <button>Caja 300</button>
          </div>
          <div>
            <button>Caja 250</button>
            <button>Caja Eco</button>
          </div>
        </div>
        <div class="container-enviosSoldador">
          <p class="tituloBtnMotoreArmados">Motores Armados</p>
          <div class="row">
            <label for="text">Motor</label>
            <select id="piezaEnviarAfilador1" class="selector">
              ${piezaAfilador}
            </select>
          </div>
          <div class="row">
            <label for="cantidadEnviarAfilador1">Cantidad:</label>
            <input class="cantidades" type="number" id="cantidadEnviarAfilador1" min="0" required />
            <button class="btnArmarMotores">Armar Motores</button>
          </div>
        </div>
        <div class="boxmecanizaodMotores">
          <p class="tituloBtnMotoreArmados">Motores Armado / Torno</p>
          <div class="boxMotoresTorneado">
            <button>Motores Torno</button>
            <button>Motores Armado</button>
          </div>
        </div>
      </div>
    `;
    BoxArmado.appendChild(motoresDiv);
  
    // --------- Columna 3: Pre-Armado ---------
    const preArmadoDiv = document.createElement("div");
    preArmadoDiv.id = "colPreArmado";
    preArmadoDiv.style.flex = "1";
    preArmadoDiv.style.minWidth = "250px";
    preArmadoDiv.style.border = "1px solid #ccc";
    preArmadoDiv.style.padding = "10px";
    preArmadoDiv.style.borderRadius = "8px";
  
    preArmadoDiv.innerHTML = `
      <div class="">
        <div class="">
          <h3 class="tituloBtnMotoreArmados" >Stock de Pre Armado</h3>
          <div class="boxBotonesCajas">
            <button>PreInox 330</button>
            <button>PreInox 300</button>
            <button>PrePintada 300</button>
            <button>PrePintada 330</button>
            <button>PreInox 250</button>
            <button>PreInox Eco</button>
          </div>
        </div>
        <div class="container-enviosSoldador">
          <p class="tituloBtnMotoreArmados" >Entregas de Afilador</p>
          <div class="row">
            <label for="piezaEnviarAfilador2">Enviar</label>
            <select id="piezaEnviarAfilador2" class="selector">
              ${piezaAfilador}
            </select>
          </div>
          <div class="row">
            <label for="cantidadEnviarAfilador2">Cantidad:</label>
            <input class="cantidades" type="number" id="cantidadEnviarAfilador2" min="0" required />
            <button class="btnArmarPre">Base PreArmado</button>
          </div>
        </div>
        <div class="boxmecanizaodMotores">
          <p class="tituloBtnMotoreArmados" >Pre Bases Armadas </p>
          <div class="boxMotoresTorneado">
            <button>Motores Armado</button>
          </div>
        </div>
      </div>
    `;
    BoxArmado.appendChild(preArmadoDiv);
  
    // --------- Columna 4: Armado Final ---------
    const armadoFinalDiv = document.createElement("div");
    armadoFinalDiv.id = "colArmadoFinal";
    armadoFinalDiv.style.flex = "1";
    armadoFinalDiv.style.minWidth = "250px";
    armadoFinalDiv.style.border = "1px solid #ccc";
    armadoFinalDiv.style.padding = "10px";
    armadoFinalDiv.style.borderRadius = "8px";
    armadoFinalDiv.style.marginRight= "10px"
  
    armadoFinalDiv.innerHTML = `
      <div class="">
        <h3 class="tituloBtnMotoreArmados">Armado Final</h3>
        <div class="boxBotonesMaquinas">
        <button>Inox 330</button>
        <button>Pintada 330</button>
        <button>Inox 250</button>
        <button>Inox 300</button>
        <button>Pintada 300</button>
        <button>Inox Eco</button>
        </div>
      </div>
  
      <div class="container-enviosSoldador">
        <p class="tituloBtnMotoreArmados">Maquinas Terminadas</p>
        <div class="row">
          <label for="piezaEnviarAfilador3">Enviar</label>
          <select id="piezaEnviarAfilador3" class="selector">
            ${piezaAfilador}
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
  </div>



    `;
    BoxArmado.appendChild(armadoFinalDiv);


  }
  
  module.exports = { boxArmado };
  