function llenarProcesosDropdown() {
  const procesos_armado = [
    "Armado de Motores",
    "Pre armado",
    "Armado final",
    "Graficos",
    "Cierre del Mes",
    "Agregado de Piezas",
    "Mecanizado",
    "Proveedores",
    "Control-calidad",
    "CONSULTORIO",
    "Consulta Pedido",
    "Cierre Anual",
  ];

  const modeloDropdown = document.getElementById("instrucDropdown");

  if (!modeloDropdown) {
    console.error("El elemento 'instrucDropdown' no existe en el DOM.");
    return;
  }
  procesos_armado.sort()
  procesos_armado.forEach((proceso) => {
    const option = document.createElement("option");
    option.value = proceso;
    option.textContent = proceso;
    modeloDropdown.appendChild(option);
  });
  
}

async function mostrarSeleccion() {

  const procesos = {
      "Armado de Motores": `Pasos para armar el motor:
  1. Verifique si están todas las piezas. En la pestaña ZONA DE ARMADO, en la sección Armado de caja, puede verificar los motores correspondientes, así como los botones de cada modelo de caja.
  2. Seleccione un modelo y la cantidad.
  3. Una vez terminado el motor, este se deberá tornear para finalizar. Abajo hay dos botones que indican: P/Tornear y P/Armar.
  4. Diríjase a la pestaña MECANIZADO/Torno, seleccione el motor y la cantidad.
  ¡Su motor estará listo para el Pre-Armado!`,
  
      "Pre armado": `Pasos para el Pre-Armado de la base:
  1. Verifique en la pestaña ZONA DE ARMADO, los motores listos para armar, en la sección Motores P/Armar.
  2. En la misma pestaña, en la sección Zona de Pre-Armado, puede verificar cada modelo de máquina, con botones que muestran qué piezas necesita cada una y sus cantidades.
  3. Seleccione el modelo de máquina y la cantidad.
  4. Al final de todo, encontrará un botón para verificar las máquinas pre-armadas listas.`,
  
      "Armado final": `Pasos para el armado final de las máquinas:
  1. Verifique en la pestaña ZONA DE ARMADO, en la sección Zona Pre-Armado, las máquinas pre-armadas terminadas.
  2. En la misma pestaña, en la sección Zona de Armado, puede verificar las piezas necesarias para cada máquina, según su modelo.
  3. Seleccione el modelo y la cantidad.
  4. Abajo, encontrará un botón que muestra las máquinas terminadas del mes.`,
  
      "Graficos": `Pasos para visualizar los gráficos:
  1. En la pestaña Zona de Armado, en la sección Zona de Armado, hay un botón llamado Gráficos de Máquinas, que muestra el conteo de las máquinas por mes.
  2. En la misma pestaña, al final, encontrará un botón llamado Mostrar Gráficos del Año, que muestra un gráfico anual con la cantidad de máquinas armadas por mes.`,
  
      "Cierre del Mes": `Instrucciones para el cierre del mes:
  1. En la pestaña Zona de Armado, en la sección Cierre del Mes.
  2. Para cerrar el mes, seleccione el mes actual y presione el botón Terminar el Mes.
  3. Los datos se guardarán automáticamente en el gráfico.
  4. El último botón 'Mostrar Gráfica del Año' muestra el gráfico de todo el año.`,
  
      "Agregado de Piezas": `Instrucciones para el agregado de piezas:
  1. A la izquierda encontrará botones con el tipo de cada materia. Seleccione el tipo deseado y presione el botón azul para mostrar las piezas correspondientes.
  2. Al mostrar las piezas en la tabla, seleccione la pieza que desea agregar o eliminar. Se mostrará la imagen con detalles correspondientes.
  3. Lo mismo se aplica para cada sección.`,
  
      "Mecanizado": `Instrucciones para el mecanizado:
  1. Aquí es donde se encuentra todo el mecanizado de las piezas.
  2. Puede encontrar acciones como: Plegadora, Plasma, Sierra, Agujereado, Torno, Fresa, Soldador, Pulido y Balancín.
  3. Seleccione la pieza que desea mecanizar y la cantidad.
  4. También hay botones para verificar el stock de cada producto, tanto terminado como en bruto.`,
  
      "Proveedores": `Instrucciones para proveedores:
  1. A la izquierda, puede encontrar distintos proveedores como: Soldador, Carmelo, Maxi, Pintura, Niquelado y Afilador.
  2. En diferentes secciones, tendrá acceso al stock de cada pieza, así como a la información sobre las piezas que ofrece cada proveedor.`,
  
      "Control-calidad": `Instrucciones para la pestaña Control-Consulta:
  1. CONTROL: Botón 'Mostrar máquinas terminadas' - muestra las máquinas terminadas.
  2. EMBALAJE: Seleccione las máquinas que han pasado por el control de calidad. Aquí se descontarán las calcomanías.
  3. VENTAS: Se descontarán las máquinas embaladas para la venta. Al final, encontrará un botón con la cantidad total de ventas.`,
  
      "CONSULTORIO": `Instrucciones para la consulta de piezas importantes:
  1. MOTORES: Seleccione el tipo de motor y la cantidad deseada para verificar si se puede armar. Se mostrará un historial o las piezas faltantes.
  2. PRE ARMADO: Verifique si se puede armar la cantidad seleccionada.
  3. ARMADO FINAL: Si es factible, se reflejará en el historial; de lo contrario, se indicarán las piezas necesarias.`,
  
      "Consulta Pedido": `Instrucciones para la pestaña Control-Consulta:
  1. Simulador de pedidos: Seleccione la cantidad de cada máquina.
  2. Presione el botón 'Averiguar' para ver los resultados.
  3. Su pedido se reflejará en el historial.
  4. Al hacer clic en 'Abrir Registro', se abrirá un archivo con los detalles de las piezas solicitadas.`,
  
      "Cierre Anual": `Instrucciones para cerrar el año:
  1. En la pestaña 'Zona de Armado' hay un botón llamado 'MOSTRAR GRÁFICOS DEL AÑO', que muestra un gráfico anual.
  2. Debajo, hay otro botón para 'Cerrar el AÑO', que reinicia todos los gráficos del mes a 0, comenzando un nuevo registro.`
  };
  
  const modeloDropdown = document.getElementById('instrucDropdown')
  const resultado = document.getElementById('resultado')

  modeloDropdown.addEventListener('change', function() {
      const seleccion = modeloDropdown.value
      resultado.value = procesos[seleccion]
  })
}


async function cargarPiezas() {
    try {
      const response = await fetch("http://localhost:5000/api/piezas");
      const piezas = await response.json();
  
      const piezasDropdown = document.getElementById('piezasDropdown');
      const resultado = document.getElementById("resultado");
  
      // Ordenar las piezas alfabéticamente por nombre
      piezas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
      piezas.forEach(pieza => {
        const option = document.createElement('option');
        option.value = pieza.detallesGeneral;
        option.textContent = pieza.nombre;
        piezasDropdown.appendChild(option);
      });
  
      piezasDropdown.addEventListener('change', function () {
        resultado.value = this.value;
      });
  
    } catch (err) {
      console.log("Error al Cargar las Piezas", err);
    }
  }
  


module.exports = { llenarProcesosDropdown, mostrarSeleccion, cargarPiezas };