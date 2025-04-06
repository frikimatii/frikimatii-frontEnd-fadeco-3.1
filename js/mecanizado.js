function box() {
  ///mostar plegadora bruto, terminado
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

      const piezaPorCategoria = {
        bruto: [
          "ChapaBase 330Inox",
          "ChapaBase 300Inox",
          "ChapaBase 330Pintada",
          "ChapaBase 300Pintada",
          "ChapaBase 250Inox",
          "Bandeja Cabezal Inox 250",
          "Bandeja Cabezal Pintada",
          "Bandeja Cabezal Inox",
        ],
        plasma: [
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
        balancin: ["Chapa U inox 250", "Chapa U Pintada", "Chapa U inox"],
        fresa: ["Planchada 300", "Planchada 330", "Planchada 250"],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let piezaEncontrada = piezaplegadoras.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            piezaEncontrada &&
            piezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = piezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosPlegadora() {
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
        cantidad: p.cantidad?.plegadora?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasPlegadora(
    piezaSeleccionada,
    cantidadSeleccionada
  ) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/plegadora/${encodeURIComponent(
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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error en el servidor");
      }
      // Obtener la respuesta y manejar el resultado
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  ////

  async function actualizarPiezasPlasma(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/plasma/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }
  async function mostrarTablasPlasma() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/plasma`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplasma = await response.json();

      const piezasPorCategoria = {
        plegadora: [
          "ChapaBase 330Inox",
          "ChapaBase 300Inox",
          "ChapaBase 330Pintada",
          "ChapaBase 300Pintada",
          "ChapaBase 250Inox",
          "Bandeja Cabezal Inox 250",
          "Bandeja Cabezal Pintada",
          "Bandeja Cabezal Inox",
        ],
        bruto: [
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
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
          "Vela 330",
          "Vela 300",
          "Vela 250",
          "Pieza Caja Eco",
          "Media Luna",
        ],
      };

      let datosTabla = [];

      for (let categoria in piezasPorCategoria) {
        piezasPorCategoria[categoria].forEach((nombrePieza) => {
          let piezaEncontrada = piezaplasma.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            piezaEncontrada &&
            piezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = piezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosPlasma() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/plasma`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.plasma?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }

  //////  mostrar corte bruto, terminado
  async function mostrarTablasCorte() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/corte`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaCorte = await response.json();

      const piezaPorCategoria = {
        bruto: [
          "Planchuela 250",
          "Planchuela 300",
          "Planchuela 330",
          "Varilla 300",
          "Varilla 330",
          "Varilla 250",
          "Eje Rectificado",
          "Varilla Brazo 330",
          "Varilla Brazo 300",
          "Varilla Brazo 250",
          "Tubo Manija",
          "Tubo Manija 250",
          "Cuadrado Regulador",
          "Palanca Afilador",
          "Eje Corto",
          "Eje Largo",
          "Buje Eje Eco",
          "Teletubi Eco",
          "Guia U",
          "Chapa CubreCabezal inox",
          "Chapa CubreCabezal Pintada",
          "Chapa CubreCabezal inox 250",
          "Planchuela Inferior",
          "Planchuela Interna",
        ],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezaCorte.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosCorte() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/corte`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.corte?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasCorte(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/corte/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  //////  mostrar augeriado bruto, terminado
  async function mostrarTablasAugeriado() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/augeriado`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaAugeriado = await response.json();

      const piezaPorCategoria = {
        bruto: [
          "Cuadrado Regulador",
          "Brazo 330",
          "Brazo 300",
          "Brazo 250",
          "Caja Soldada Eco",
          "Carcaza Afilador",

        ],
        balancin:[
          "PortaEje",
        ],
        torno:[
          "Tornillo Teletubi Eco",
          "Carros",
          "Carros 250",
          "Movimiento"
        ]
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezaAugeriado.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad ;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosAugeriado() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/augeriado`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.augeriado?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasAugeriado(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/augeriado/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }
  
  /////  mostrar Torno bruto, terminado
  async function mostrarTablasTorno() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/torno`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaCorte = await response.json();

      const piezaPorCategoria = {
        bruto: [
          "Buje Eje Eco",
          "Eje",
          "Eje 250",
          "Manchon",
          "Manchon 250",
          "Rueditas",
          "Tornillo guia",
          "Carros",
          "Carros 250",
          "Movimiento",
          "Caja 300",
          "Caja 330",
          "Caja 250",
          "Cubrecuchilla 300",
          "Teletubi 300",
          "Tornillo Teletubi Eco",
          "Caja 330 Armada",
          "Caja 300 Armada",
          "Caja 250 Armada",
          "Caja eco Armada",
          "Tapa Afilador Eco",
        ],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezaCorte.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad ;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosTorno() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/torno`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.torno?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasTorno(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/torno/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  //// mostrar Fresa bruto, terminado
  async function mostrarTablasFresa() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/fresa`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaFresa = await response.json();

      const piezaPorCategoria = {
        plasma: [
          "Vela 250",
          "Vela 300",
          "Vela 330",
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
        ],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezaFresa.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosFresa() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/fresa`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.fresa?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasFresa(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/fresa/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  ////mostrar augeriado bruto, terminado
  async function mostrarTablasSoldador() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/soldador`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezasoldador = await response.json();

      const piezaPorCategoria = {
        fresa: [
          "Vela 250",
          "Vela 300",
          "Vela 330",
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
        ],
        corte: ["Varilla 330", "Varilla 300", "Varilla 250"],
        augeriado: ["Cuadrado Regulador"],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezasoldador.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosSoldador() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/soldador`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.soldador?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasSoldador(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/soldador/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  /// mostrar augeriado bruto, terminado
  async function mostrarTablasBalancin() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/balancin`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaFresa = await response.json();

      const piezaPorCategoria = {
        corte: [
          "Planchuela 250",
          "Planchuela 300",
          "Planchuela 330",
          "Guia U",
          "Eje Corto",
          "Eje Largo",
          "Teletubi Eco",
        ],
        bruto: [
          "Chapa U Inox",
          "Chapa U Pintada",
          "Chapa U Inox 250",
          "PortaEje",
        ],
      };

      let datosTabla = [];

      for (let categoria in piezaPorCategoria) {
        piezaPorCategoria[categoria].forEach((nombrePieza) => {
          let pieezaEncontrada = piezaFresa.find(
            (p) => p.nombre === nombrePieza
          );

          let cantidad = 0;

          if (
            pieezaEncontrada &&
            pieezaEncontrada.cantidad?.[categoria]?.cantidad
          ) {
            cantidad = pieezaEncontrada.cantidad[categoria].cantidad;
          }

          datosTabla.push({ nombre: nombrePieza, cantidad: cantidad });
        });
      }
      console.log(datosTabla);

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: datosTabla,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.error("Error al Obtener datos", error);
    }
  }
  async function mostrarStockTerminadosBalancin() {
    const TablaMecanizado = document.getElementById("TablaMecanizado");
    if (!TablaMecanizado) {
      console.error("Nos se encontro el elemento ID ");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/balancin`);
      if (!response.ok) throw new Error("Error en responder el servidor");
      const piezaplegadoras = await response.json();
      console.log(piezaplegadoras);
      const tableData = piezaplegadoras.map((p) => ({
        nombre: p.nombre || "sin nombre",
        cantidad: p.cantidad?.balancin?.cantidad || 0,
      }));

      new Tabulator(TablaMecanizado, {
        height: 400,
        layout: "fitColumns",
        data: tableData,
        initialSort: [
          { column: "nombre", dir: "asc" }, // Orden ascendente (A-Z)
        ],
        columns: [
          { title: "Nombre", field: "nombre" },
          { title: "Cantidad", field: "cantidad" },
        ],
      });
    } catch (error) {
      console.log("esto es un erro ", error);
    }
  }
  async function actualizarPiezasBalancin(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/balancin/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  ///mostrar augeriado bruto, terminado
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
  
  async function actualizarPiezasPulido(piezaSeleccionada ,cantidadSeleccionada) { 
    try {
      const response = await fetch(
        `http://localhost:5000/api/piezas/torno/${encodeURIComponent(piezaSeleccionada)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: cantidadSeleccionada }),
        }
      );
  
      if (!response.ok) {
        let errorMessage = "Error en el servidor";
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorMessage;
        } catch (jsonError) {
          console.error("Error al leer el JSON de respuesta:", jsonError);
        }
        throw new Error(errorMessage);
      }
  
      // Obtener la respuesta y manejar el resultado si todo está bien
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error("Error al actualizar la pieza:", error);
      alert(error.message); // Muestra el mensaje de error devuelto por el backend
    }
  }

  const objetosMecanizados = [
    {
      augeriado: {
        piezas: [
          "Cuadrado Regulador",
          "Brazo 330",
          "Brazo 300",
          "Brazo 250",
          "Carros",
          "Carros 250",
          "Movimiento",
          "Tornillo Teletubi Eco",
          "Caja Soldada Eco",
          "Carcaza Afilador",
          "PortaEje",
        ],
        imagen: "https://i.postimg.cc/fyYZgvx6/augeriado.png",
        mecanizado: "augeriado",
        funcion: mostrarTablasAugeriado,
        funcionStock: mostrarStockTerminadosAugeriado,
        actualiarP: "",
      },
      fresa: {
        piezas: [
          "Vela 250",
          "Vela 300",
          "Vela 330",
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
        ],
        imagen: "https://i.postimg.cc/pLWxqzy6/fresado.png",
        mecanizado: "fresa",
        funcion: mostrarTablasFresa,
        funcionStock: mostrarStockTerminadosFresa,
        actualizarP: "",
      },
      pulido: {
        piezas: ["cabezal Inox", "cabezal 250"],
        imagen: "https://i.postimg.cc/2jnDY2Zt/pulido.png",
        mecanizado: "pulido",
        funcion: "",
      },
      plegadora: {
        piezas: [
          "ChapaBase 330Inox",
          "ChapaBase 300Inox",
          "ChapaBase 330Pintada",
          "ChapaBase 300Pintada",
          "ChapaBase 250Inox",
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
          "Bandeja Cabezal Inox 250",
          "Bandeja Cabezal Pintada",
          "Bandeja Cabezal Inox",
          "Chapa U inox 250",
          "Chapa U Pintada",
          "Chapa U inox",
          "Planchada 300",
          "Planchada 330",
          "Planchada 250",
        ],
        imagen: "https://i.postimg.cc/MK8zfhwx/dobladora.png",
        mecanizado: "plegadora",
        funcion: mostrarTablasPlegadora,
        funcionStock: mostrarStockTerminadosPlegadora,
        actualiarP: "",
      },
      plasma: {
        piezas: [
          "ChapaBase 330Inox",
          "ChapaBase 300Inox",
          "ChapaBase 330Pintada",
          "ChapaBase 300Pintada",
          "ChapaBase 250Inox",
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
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
          "Vela 330",
          "Vela 300",
          "Vela 250",
          "Bandeja Cabezal Inox 250",
          "Bandeja Cabezal Pintada",
          "Bandeja Cabezal Inox",
          "Pieza Caja Eco",
          "Media Luna",
        ],
        imagen: "https://i.postimg.cc/W11LMVHR/plasma.png",
        mecanizado: "plasma",
        funcion: mostrarTablasPlasma,
        funcionStock: mostrarStockTerminadosPlasma,
        actualizarP: "",
      },
      corte: {
        piezas: [
          "Planchuela 250",
          "Planchuela 300",
          "Planchuela 330",
          "Varilla 300",
          "Varilla 330",
          "Varilla 250",
          "Eje Rectificado",
          "Varilla Brazo 330",
          "Varilla Brazo 300",
          "Varilla Brazo 250",
          "Tubo Manija",
          "Tubo Manija 250",
          "Cuadrado Regulador",
          "Palanca Afilador",
          "Eje Corto",
          "Eje Largo",
          "Buje Eje Eco",
          "Teletubi Eco",
          "Guia U",
          "Chapa CubreCabezal inox",
          "Chapa CubreCabezal pintada",
          "Chapa CubreCabezal inox 250",
          "Planchuela Inferior",
          "Planchuela Interna",
        ],
        imagen: "https://i.postimg.cc/yYBz8ch8/sierra.png",
        mecanizado: "corte",
        funcion: mostrarTablasCorte,
        funcionStock: mostrarStockTerminadosCorte,
        actualizarP: "",
      },
      balancin: {
        piezas: [
          "Planchuela 250",
          "Planchuela 300",
          "Planchuela 330",
          "PortaEje",
          "Guia U",
          "Teletubi Eco",
          "Chapa U Inox",
          "Chapa U Pintada",
          "Chapa U Inox 250",
          "Eje Corto",
          "Eje Largo",
        ],
        imagen: "https://i.postimg.cc/1RF9tyLJ/balancin.png",
        mecanizado: "balancin",
        funcion: mostrarTablasBalancin,
        funcionStock: mostrarStockTerminadosBalancin,
        actualizarP: "",
      },
      torno: {
        piezas: [
          "Buje Eje Eco",
          "Eje",
          "Eje 250",
          "Manchon",
          "Manchon 250",
          "Rueditas",
          "Tornillo guia",
          "Carros",
          "Carros 250",
          "Movimiento",
          "Caja 300",
          "Caja 330",
          "Caja 250",
          "Cubrecuchilla 300",
          "Teletubi 300",
          "Tornillo Teletubi Eco",
          "Caja 330 Armada",
          "Caja 300 Armada",
          "Caja 250 Armada",
          "Caja eco Armada",
          "Tapa Afilador Eco",
        ],
        imagen: "https://i.postimg.cc/bwVXg57Z/torno.png",
        mecanizado: "torno",
        funcion: mostrarTablasTorno,
        funcionStock: mostrarStockTerminadosTorno,
        actualizarP: "",
      },
      soldador: {
        piezas: [
          "Vela 250",
          "Vela 300",
          "Vela 330",
          "Planchada 330",
          "Planchada 300",
          "Planchada 250",
          "Varilla 330",
          "Varilla 300",
          "Varilla 250",
          "Cuadrado Regulador",
          "cabezal_inox",
          "cabezal_pintada",
          "cabezal_eco",
        ],
        imagen: "https://i.postimg.cc/Nf4v9Fb7/soldador.png",
        mecanizado: "soldador",
        funcion: mostrarTablasSoldador,
        funcionStock: mostrarStockTerminadosSoldador,
        actualizarP: "",
      },
    },
  ];

  const listaDeMecanizado = [
    "plegadora",
    "plasma",
    "corte",
    "augeriado",
    "torno",
    "fresa",
    "soldador",
    "pulido",
    "balancin",
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

          if (
            piezaSeleccionada &&
            cantidadSeleccionada &&
            cantidadSeleccionada > 0
          ) {
            if (mecanizadoId === "plegadora") {
              actualizarPiezasPlegadora(piezaSeleccionada,cantidadSeleccionada);
            } else if (mecanizadoId === "plasma") {
              actualizarPiezasPlasma(piezaSeleccionada,cantidadSeleccionada);
            } else if (mecanizadoId === "corte"){
              actualizarPiezasCorte(piezaSeleccionada,cantidadSeleccionada)
            } else if (mecanizadoId === "augeriado"){
              actualizarPiezasAugeriado(piezaSeleccionada, cantidadSeleccionada)
            } else if (mecanizadoId === "torno"){
              actualizarPiezasTorno(piezaSeleccionada, cantidadSeleccionada)
            } else if (mecanizadoId === "fresa"){
              actualizarPiezasFresa(piezaSeleccionada, cantidadSeleccionada)
            } else if (mecanizadoId === "soldador"){
              actualizarPiezasSoldador(piezaSeleccionada, cantidadSeleccionada)
            } else if (mecanizadoId === "pulido"){
              actualizarPiezasPulido(piezaSeleccionada, cantidadSeleccionada)
            } else if (mecanizadoId === "balancin"){
              actualizarPiezasBalancin(piezaSeleccionada, cantidadSeleccionada)
            }

            console.log(`Mecanizado: ${mecanizadoId}`);
            console.log(`Pieza seleccionada: ${piezaSeleccionada}`);
            console.log(`Cantidad seleccionada: ${cantidadSeleccionada}`);
            // Resetear el input
            inputCantidad.value = "";
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
      const fun2 = mecanizado.funcionStock || ""; // Función de respaldo
      const actualizarpiezas = mecanizado.actualizarP || "";
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
                        <input class="cantidades" type="number" name="cantidad" id="cantidad-${r}" min="0" required>
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
      if (fun2) {
        const stockTerminadoButton = caja.querySelector(`#stockTerminado-${r}`);
        stockTerminadoButton.addEventListener("click", fun2);
      }

      if (actualizarpiezas) {
        const btnActualizar = caja.querySelector(`#accionemecanizado-${r}`);
        btnActualizar.addEventListener("click", actualizarpiezas);
      }

      columna.appendChild(caja);
    });
  }
}

function mostrarbtn() {}

module.exports = { mostrarbtn, box };
