
async function controlCalidad(){
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

    const boxControl = document.getElementById("zonaControl")

    if(!boxControl){
        console.error("Elemento No encontrado");
        return
    }
  // Limpiar y configurar estilo del contenedor principal

    boxControl.innerHTML = ""
    boxControl.style.display = 'flex'
    boxControl.style.gap = "20px"
    boxControl.style.flexWrap = "wrap"
    boxControl.style.alignItems = "flex-start"

    data = []

  // --------- Columna 1: Tabla de Control ---------
    const tablaDiv = document.createElement("div")
    tablaDiv.id = "tablaControl";
    tablaDiv.style.flex = "1";
    tablaDiv.style.minWidth = "100px";
    tablaDiv.style.border = "1px solid #ccc";
    tablaDiv.style.margin = "10px";
    boxControl.appendChild(tablaDiv);

    const columnas = [
        {title: "Nombre", field: "nombre"},
        { title: "Cantidad", field: "cantidad"}
    ]

    new Tabulator(tablaDiv,{
        layout: "fitColumns",
        columns: columnas,
        data: data,
        height: 350
    })

  // --------- Columna 2: Embalaje Ventas ---------

    const embalajeVentas = document.createElement("div")
    embalajeVentas.id = "colmbalaje"
    embalajeVentas.style.flex = "1";
    embalajeVentas.style.minWidth = "250px";
    embalajeVentas.style.border = "1px solid #ccc";
    embalajeVentas.style.padding = "10px";
    embalajeVentas.style.borderRadius = "8px";
    const maquinasEmabalar = generarSelector(Maquinas)
    embalajeVentas.innerHTML = `

        <div class="">
            <h2>Maquinas para Limpiar</h2>
            <button class="btn-maquinasTermiandas"> Mostrar Maquinas Termiandas</button>   
            <p class="tituloBtnMotoreArmados">Maquinas Embaladas</p>
            <div class="row">
                <label for="text">Embalar</label>
                <select id="" class="selector">${maquinasEmabalar}
                </select>
            </div>
            <div class="row">
                <label for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
                <button class="btnEmbalar" id="" >Terminadas</button>
            </div>
        </div>
        <div>
            <p>Stock Cantidad Terminado </p>
            <div class="box-btn-ventas">
            <button>Stock Embalado</button>
            <button>Stock Insumos</button>
            </div>
        </div>

         <div style="margin-top: 20px; padding: 10px; border: 1px solid white; border-radius: 8px;">
            <p class="tituloBtnMotoreArmados">Maquinas Vendidas</p>
            <div class="row">
                <label for="">Venta</label>
                <select id="maquinaSeleccionada" class="selector">${maquinasEmabalar}
                </select>
            </div>
            <div class="row">
                <label for="cantidadEnviarAfilador3">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
                <button class="btnVentas" id="" >Terminadas</button>
            </div>
            <div >
            <p>Grafico/Tabla -  VENTAS</p>
                <div class="box-btn-ventas">
                    <button>Grafico</button>
                    <button>Tabla</button>
                </div>
            </div>
           
        </div>
        `
  



    boxControl.appendChild(embalajeVentas)

  // --------- Columna 3: Consultas Pieza ---------

const consultas = document.createElement("div")
consultas.id = "colPreArmado";
consultas.style.flex = "1";
consultas.style.minWidth = "250px";
consultas.style.border = "1px solid #ccc";
consultas.style.padding = "10px";
consultas.style.borderRadius = "8px";

const Motores = generarSelector(motores)
const PreArmado = generarSelector(Prearmado)
const maquinasArmadas =  generarSelector(Maquinas)
consultas.innerHTML = `<h2>Consultorio de Armado</h2>
<div>
        <div class="container-Control">
        <p  class="controlTitulo">Motores </p>
            <div class="row">
                <label class="labelcontrol"for="text">Motores</label>
                <select id="" class="selecConsultorio">${Motores}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
                <button class="btnConsultas" id="btnArmarfinal" >Terminadas</button>
            </div>
        </div>
</div>
<div>
        <div class="container-Control">
                <p class="controlTitulo">PreArmado</p>
            <div class="row">
                <label class="labelcontrol"for="text">PreArmado</label>
                <select id="" class="selecConsultorio">${PreArmado}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
                <button class="btnConsultas" id="btnArmarfinal" >Terminadas</button>
            </div>
        </div>
</div>
<div>
        <div class="container-Control">
                <p class="controlTitulo">Armado</p>
            <div class="row">
                <label class="labelcontrol"for="text">Armado</label>
                <select id="" class="selecConsultorio">${maquinasArmadas}
                </select>
            </div>
            <div class="row">
                <label class="labelcontrol"for="">Cantidad:</label>
                <input class="cantidades" type="number" id="cantidadMaquinasArmadas" min="0" required />
                <button class="btnConsultas" id="btnArmarfinal" >Terminadas</button>
            </div>
        </div>
</div>`

boxControl.appendChild(consultas)

  // --------- Columna 4: Pedidos ---------
  
const pedidos = document.createElement("div")
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

`

boxControl.appendChild(pedidos)


}

module.exports = { controlCalidad };
