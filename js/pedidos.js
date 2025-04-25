async function pedidosGrandes() {
  const contenedorPedidos = document.getElementById("contenedorPedidos");
  const aceptarPedidoBtn = document.getElementById("aceptarPedido");
  const cargarPedidosBtn = document.getElementById("cargarPedidosBtn");
  const cargarTerminados = document.getElementById("cargarTerminados")
  
  
  // Verificar si los elementos existen en el DOM
  if (!contenedorPedidos || !aceptarPedidoBtn || !cargarPedidosBtn) {
    console.error("Uno o más elementos no existen en el DOM.");
    return;
  }

  // Función para crear una tarjeta de pedido (única)
  const crearTarjetaPedido = (pedido, mostrarBotones = true) => {
    let contenidoPedido = `
      <p><strong>Cliente:</strong> ${pedido.cliente}</p>
      <p><strong>Fecha Creacion:</strong> ${new Date (pedido.createdAt).toLocaleDateString()}</p>
      <p><strong>Fecha Entrega:</strong> ${new Date (pedido.fechaEntrega).toLocaleDateString()}</p>

    `;
    pedido.productos.forEach((producto) => {
      contenidoPedido += `<p><strong>${producto.nombre}:</strong> ${producto.cantidad}</p>`;
      
    });
  
    const nuevoPedido = document.createElement("div");
    nuevoPedido.classList.add("cardlisto");
  
    // Agregar botones solo si `mostrarBotones` es true
    if (mostrarBotones) {
      nuevoPedido.innerHTML = `
        ${contenidoPedido}
        <div class="btn">
          <button class="completar-pedido">Pedido Listo</button>
          <button class="eliminar-pedido">Eliminar Pedido</button>
        </div>
      `;
  
      // Botón para marcar como completado
      const completarBtn = nuevoPedido.querySelector(".completar-pedido");
      completarBtn.addEventListener("click", async function () {
        try {
          const pedidoId = nuevoPedido.getAttribute("data-id");
  
          if (!pedidoId) {
            console.error("El ID del pedido no está disponible.");
            return;
          }
  
          const response = await fetch(`http://localhost:5000/api/pedidos/${pedidoId}/completado`, {
            method: "PATCH",
          });
  
          const data = await response.json();
          if (response.ok) {
            alert("Pedido marcado como completado exitosamente");
            nuevoPedido.style.backgroundColor = "#d4edda";
            nuevoPedido.querySelector(".btn").innerHTML = "<p>Pedido Completado</p>";
            setTimeout(() => nuevoPedido.remove(), 2000);
          } else {
            alert("Error al marcar el pedido como completado: " + data.message);
          }
        } catch (error) {
          console.error("Error al marcar el pedido como completado:", error);
          alert("Error al conectar con el servidor");
        }
      });
  
      // Botón para eliminar el pedido
      const eliminarBtn = nuevoPedido.querySelector(".eliminar-pedido");
      eliminarBtn.addEventListener("click", async function () {
        try {
          const pedidoId = nuevoPedido.getAttribute("data-id");
  
          if (!pedidoId) {
            console.error("El ID del pedido no está disponible.");
            return;
          }
  
          const response = await fetch(`http://localhost:5000/api/pedidos/${pedidoId}`, {
            method: "DELETE",
          });
  
          const data = await response.json();
          if (response.ok) {
            alert("Pedido eliminado exitosamente");
            nuevoPedido.remove();
          } else {
            alert("Error al eliminar el pedido: " + data.message);
          }
        } catch (error) {
          console.error("Error al eliminar el pedido:", error);
          alert("Error al conectar con el servidor");
        }
      });
    } else {
      // Sin botones para pedidos terminados
      nuevoPedido.innerHTML = contenidoPedido;
    }
  
    // Asignar el ID del pedido como atributo
    nuevoPedido.setAttribute("data-id", pedido._id);
  
    return nuevoPedido;
  };

  // Evento para el botón "Cargar Pedidos"
  cargarPedidosBtn.addEventListener("click", async function () {
    try {
      const response = await fetch(
        "http://localhost:5000/api/verPedidossactuales"
      );
      if (!response.ok) {
        throw new Error("Error al cargar los pedidos");
      }

      const pedidos = await response.json();

      // Limpiar el contenedor antes de agregar nuevos pedidos
      contenedorPedidos.innerHTML = "";

      if (pedidos.length === 0) {
        contenedorPedidos.innerHTML = "<p>No hay pedidos disponibles.</p>";
        return;
      }

      pedidos.forEach((pedido) => {
        const tarjeta = crearTarjetaPedido(pedido);
        contenedorPedidos.appendChild(tarjeta);
      });
    } catch (error) {
      console.error("Error al cargar los pedidos:", error);
      alert("Error al cargar los pedidos. Inténtalo más tarde.");
    }
  });

  cargarTerminados.addEventListener("click", async function () {
    try {
      const response = await fetch("http://localhost:5000/api/verPedidosTerminados");
      if (!response.ok) {
        throw new Error("Error al cargar los pedidos");
      }
  
      const pedidos = await response.json();
  
      // Limpiar el contenedor antes de agregar nuevos pedidos
      contenedorPedidos.innerHTML = "";
  
      if (pedidos.length === 0) {
        contenedorPedidos.innerHTML = "<p>No hay pedidos disponibles.</p>";
        return;
      }
  
      pedidos.forEach((pedido) => {
        // Crear tarjetas sin botones para pedidos terminados
        const tarjeta = crearTarjetaPedido(pedido, false);
        contenedorPedidos.appendChild(tarjeta);
      });
    } catch (error) {
      console.error("Error al cargar los pedidos:", error);
      alert("Error al cargar los pedidos. Inténtalo más tarde.");
    }
  });

  // Evento para el botón "Aceptar Pedido"
  aceptarPedidoBtn.addEventListener("click", async function () {
    // Obtener los valores del formulario
    const nombreCliente = document.getElementById("para").value.trim();
    const cantInox330 =
      parseInt(document.getElementById("cantInox330").value) || 0;
    const cantInox300 =
      parseInt(document.getElementById("cantInox300").value) || 0;
    const cantInox250 =
      parseInt(document.getElementById("cantInox250").value) || 0;
    const cantInoxECO =
      parseInt(document.getElementById("cantInoxECO").value) || 0;
    const cantPintada330 =
      parseInt(document.getElementById("cantPintada330").value) || 0;
    const cantPintada300 =
      parseInt(document.getElementById("cantPintada300").value) || 0;
    const fecha = document.getElementById("fecha").value;

    // Validar campos obligatorios
    if (!nombreCliente || !fecha) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Construir el contenido del pedido (solo productos con cantidad > 0)
    const productos = [
      { nombre: "Inox 330", cantidad: cantInox330 },
      { nombre: "Inox 300", cantidad: cantInox300 },
      { nombre: "Inox 250", cantidad: cantInox250 },
      { nombre: "Inox ECO", cantidad: cantInoxECO },
      { nombre: "Pintada 330", cantidad: cantPintada330 },
      { nombre: "Pintada 300", cantidad: cantPintada300 },
    ].filter((producto) => producto.cantidad > 0);

    try {
      // Enviar los datos al backend
      const response = await fetch("http://localhost:5000/api/pedidosMarcelo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: nombreCliente,
          productos,
          fechaEntrega: fecha,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Pedido guardado exitosamente");

        // Crear la tarjeta del pedido en el frontend
        const nuevaTarjeta = crearTarjetaPedido({
          cliente: nombreCliente,
          fechaEntrega: fecha,
          productos,
        });
        contenedorPedidos.appendChild(nuevaTarjeta);
      } else {
        alert("Error al guardar el pedido: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }

    // Limpiar el formulario
    document.getElementById("para").value = "";
    document
      .querySelectorAll(".numPedido")
      .forEach((input) => (input.value = ""));
    document.getElementById("fecha").value = "";

    setTimeout(() => {
      document.getElementById("para").focus();
    }, 0);

  });
}

module.exports = { pedidosGrandes };
