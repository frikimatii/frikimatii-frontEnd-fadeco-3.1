async function mostrar() {
  try {
    const response = await fetch("http://localhost:5000/api/piezas");
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const piezas = await response.json();
  } catch (error) {
    console.error("Error al cargar las piezas:", error);
  }
}

function limpiarCampos() {
  document
    .querySelectorAll(".form-container input, .form-container textarea")
    .forEach((campo) => {
      campo.value = "";
    });
}

async function mostrarTabla(tabla) {
  document.querySelectorAll(".table-container").forEach((tab) => {
    tab.style.display = "none";
  });

  const tablaSeleccionada = document.getElementById(`tabla-${tabla}`);

  if (tablaSeleccionada) {
    tablaSeleccionada.style.display = "block"

    const tablaContenedor = document.getElementById(
      `tablaDe${tabla.charAt(0).toUpperCase() + tabla.slice(1)}`
    );

    if (tablaContenedor && tablaContenedor._tabulator) {
      tablaContenedor._tabulator.destroy();
    }

    let tableData = [];

    try {
      if (tabla === "aluminio") {
        const response = await fetch("http://localhost:5000/api/aluminio");
        
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const piezas = await response.json();
        tableData = piezas.map((p) => ({
          nombre: p.nombre || "Sin nombre",
          cantidad: p.cantidad?.bruto?.cantidad || 0,
          img: p.cantidad?.bruto?.img || "default-image.png",
          detalle: p.detallesGeneral || "Sin detalles",
          
        }));
      } else if (tabla === "chapa") {
        const response = await fetch("http://localhost:5000/api/chapa");
        if (!response.ok)
          throw new Error("Error en la respuestas del servidor");
        const pieza = await response.json();
        tableData = pieza.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.bruto?.cantidad,
          img: p.cantidad?.bruto?.img,
          detalle: p.detallesGeneral,
        }));
      } else if (tabla === "shop") {
        const response = await fetch("http://localhost:5000/api/shop");
        if (!response.ok)
          throw new Error("Error en la respuestas del servidor");
        const pieza = await response.json();
        tableData = pieza.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.bruto?.cantidad,
          img: p.cantidad?.bruto?.img,
          detalle: p.detallesGeneral,
        }));
      } else if (tabla === "plastico") {
        const response = await fetch("http://localhost:5000/api/plastico");
        if (!response.ok)
          throw new Error("Error en la respuestas del servidor");
        const pieza = await response.json();
        tableData = pieza.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.bruto?.cantidad,
          img: p.cantidad?.bruto?.img,
          detalle: p.detallesGeneral,
        }));
      } else if (tabla === "fundicion") {
        const response = await fetch("http://localhost:5000/api/hierro");
        if (!response.ok)
          throw new Error("Error en la respuestas del servidor");
        const pieza = await response.json();
        tableData = pieza.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad?.bruto?.cantidad,
          img: p.cantidad?.bruto?.img,
          detalle: p.detallesGeneral,
        }));
      }
    } catch (error) {
      console.error(`Error al obtener datos de ${tabla}:`, error);
    }

    if (tablaContenedor) {
      const tablaInstancia = new Tabulator(tablaContenedor, {
        height: 500,
        layout: "fitColumns",
        data: tableData,
        initialSort: [{ column: "nombre", dir: "asc" }],
        columns: [
          { title: "Nombre", field: "nombre" , minWidth: 200},
          { title: "Cantidad", field: "cantidad" , width: 100},
        ],
        selectable: 1,
      });

      // Array para almacenar el historial de cambios
      let historialCambios = [];

      tablaInstancia.on("rowClick", function (e, row) {
        const selectedData = row.getData();
        limpiarCampos();

        try {
          switch (tabla) {
            case "aluminio":
              document.getElementById("pieza-aluminio").value =
                selectedData.nombre;
              document.getElementById("descripcion-aluminio").innerHTML =
                selectedData.detalle;
              document.getElementById("img-aluminio").src = selectedData.img;

              const botonAgregar = document.getElementById(
                "btn-agregar-aluminio"
              );

              if (botonAgregar) {
                botonAgregar.replaceWith(botonAgregar.cloneNode(true));
                const nuevoBotonAgregar = document.getElementById(
                  "btn-agregar-aluminio"
                );

                nuevoBotonAgregar.addEventListener("click", async () => {
                  
                  const nombrePieza =
                    document.getElementById("pieza-aluminio")?.value;
                  let cantidadInput =
                    document.getElementById("cantidad-aluminio");
                  let cantidadPieza = parseInt(cantidadInput?.value) || 0;

                  if (!nombrePieza) {
                    console.error(
                      "No se puede actualizar sin un nombre de pieza."
                    );
                    return;
                  }

                  const cantidadActual = selectedData.cantidad || 0;
                  const nuevaCantidad = cantidadActual + cantidadPieza;

                  try {
                    const response = await fetch(
                      `http://localhost:5000/api/piezas/nombre/${encodeURIComponent(
                        nombrePieza
                      )}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ cantidad: nuevaCantidad }),
                      }
                    );

                    if (!response.ok)
                      throw new Error("Error al actualizar la cantidad.");

                    const resultado = await response.json();
                    console.log("Cantidad actualizada con éxito:", resultado);
                    alert("Cantidad actualizada correctamente");

                    // 🔄 Agregar cambio al historial
                    agregarAlHistorial(nombrePieza, cantidadPieza);

                    // 🔄 Refrescar la tabla
                    await mostrarTabla("aluminio");

                    // 🔄 Limpiar el input y volver a enfocarlo
                    cantidadInput.value = "";
                    cantidadInput.focus();
                  } catch (error) {
                    console.error("Error al actualizar la cantidad:", error);
                    alert("Error al actualizar la cantidad.");
                  }
                  
                });
              } else {
                console.error(
                  "El botón 'agregar-aluminio' no existe en el DOM."
                );
              }
              cargarHistorialAluminio()
              break;
            case "chapa":
              document.getElementById("pieza-chapa").value =
                selectedData.nombre;
              document.getElementById("description-chapa").innerHTML =
                selectedData.detalle;
              document.getElementById("img-chapa").src = selectedData.img;

              const botonAgregarchapa =
                document.getElementById("btn-agregar-chapa");

              if (botonAgregarchapa) {
                botonAgregarchapa.replaceWith(
                  botonAgregarchapa.cloneNode(true)
                );
                const nuevoBottonAgregarchapa =
                  document.getElementById("btn-agregar-chapa");

                nuevoBottonAgregarchapa.addEventListener("click", async () => {
                  const nombrePiezachapa =
                    document.getElementById("pieza-chapa")?.value;
                  let chapaCantidadInput =
                    document.getElementById("cantidad-chapa");
                  let chapaCantidadPieza = parseInt(chapaCantidadInput?.value);

                  if (!nombrePiezachapa) {
                    console.error(
                      "No Se puede Actualizar sin un nommbre de pieza"
                    );
                    return;
                  }

                  const chapaCantidadActual = selectedData.cantidad || 0;
                  const chapaCantidadNueva =
                    chapaCantidadActual + chapaCantidadPieza;

                  try {
                    const response = await fetch(
                      `http://localhost:5000/api/piezas/nombre/${encodeURIComponent(
                        nombrePiezachapa
                      )}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ cantidad: chapaCantidadNueva }),
                      }
                    );
                    if (!response.ok)
                      throw new Error("Error al actualizar la  cantidad");

                    const resultado = await response.json();
                    console.log("Cantidada ACtualizar con exito:", resultado);
                    alert("Cantidad actualizada Correctamente");

                    agregarAlHistorialChapa(
                      nombrePiezachapa,
                      chapaCantidadNueva
                    );
                    

                    await mostrarTabla("chapa");

                    chapaCantidadInput.value = "";
                    chapaCantidadInput.focus();
                  } catch (error) {
                    console.error("Error al acualizar la cantidad", error);
                    alert("Errro al actualizar la cantidad");
                  }
                });
              } else {
                console.error('El Boton "AGREGAR CHAPA NO EXISYE EN EL DOM');
              }
              cargarHistorialchapa()
              break;
            case "shop":
              document.getElementById("pieza-shop").value = selectedData.nombre;
              document.getElementById("description-shop").innerHTML =
                selectedData.detalle;
              document.getElementById("img-shop").src = selectedData.img;

              const botonAgregarshop =
                document.getElementById("btn-agregar-shop");

              if (botonAgregarshop) {
                botonAgregarshop.replaceWith(botonAgregarshop.cloneNode(true));
                const nuevoBottonAgregarshop =
                  document.getElementById("btn-agregar-shop");

                nuevoBottonAgregarshop.addEventListener("click", async () => {
                  const nombrePiezashop =
                    document.getElementById("pieza-shop")?.value;
                  let shopCantidadInput =
                    document.getElementById("cantidad-shop");
                  let shopCantidadPieza = parseInt(shopCantidadInput?.value);

                  if (!nombrePiezashop) {
                    console.error(
                      "No Se puede Actualizar sin un nommbre de pieza"
                    );
                    return;
                  }

                  const shopCantidadActual = selectedData.cantidad || 0;
                  const shopCantidadNueva =
                    shopCantidadActual + shopCantidadPieza;

                  try {
                    const response = await fetch(
                      `http://localhost:5000/api/piezas/nombre/${encodeURIComponent(
                        nombrePiezashop
                      )}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ cantidad: shopCantidadNueva }),
                      }
                    );
                    if (!response.ok)
                      throw new Error("Error al actualizar la  cantidad");

                    const resultado = await response.json();
                    console.log("Cantidada ACtualizar con exito:", resultado);
                    alert("Cantidad actualizada Correctamente");

                    agregarAlHistorialshop(nombrePiezashop, shopCantidadNueva);

                    await mostrarTabla("shop");

                    shopCantidadInput.value = "";
                    shopCantidadInput.focus();
                  } catch (error) {
                    console.error("Error al acualizar la cantidad", error);
                    alert("Errro al actualizar la cantidad");
                  }
                });
              } else {
                console.error('El Boton "AGREGAR shop NO EXISYE EN EL DOM');
              }
              cargarHistorialshop()
              break;
            case "plastico":
              document.getElementById("pieza-plastico").value =
                selectedData.nombre;
              document.getElementById("description-plastico").innerHTML =
                selectedData.detalle;
              document.getElementById("img-plastico").src = selectedData.img;

              const botonAgregarplastico = document.getElementById(
                "btn-agregar-plastico"
              );

              if (botonAgregarplastico) {
                botonAgregarplastico.replaceWith(
                  botonAgregarplastico.cloneNode(true)
                );
                const nuevoBottonAgregarplastico = document.getElementById(
                  "btn-agregar-plastico"
                );

                nuevoBottonAgregarplastico.addEventListener(
                  "click",
                  async () => {
                    const nombrePiezaplastico =
                      document.getElementById("pieza-plastico")?.value;
                    let plasticoCantidadInput =
                      document.getElementById("cantidad-plastico");
                    let plasticoCantidadPieza = parseInt(
                      plasticoCantidadInput?.value
                    );

                    if (!nombrePiezaplastico) {
                      console.error(
                        "No Se puede Actualizar sin un nommbre de pieza"
                      );
                      return;
                    }

                    const plasticoCantidadActual = selectedData.cantidad || 0;
                    const plasticoCantidadNueva =
                      plasticoCantidadActual + plasticoCantidadPieza;

                    try {
                      const response = await fetch(
                        `http://localhost:5000/api/piezas/nombre/${encodeURIComponent(
                          nombrePiezaplastico
                        )}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            cantidad: plasticoCantidadNueva,
                          }),
                        }
                      );
                      if (!response.ok)
                        throw new Error("Error al actualizar la  cantidad");

                      const resultado = await response.json();
                      console.log("Cantidada ACtualizar con exito:", resultado);
                      alert("Cantidad actualizada Correctamente");

                      agregarAlHistorialplastico(
                        nombrePiezaplastico,
                        plasticoCantidadNueva
                      );

                      await mostrarTabla("plastico");

                      plasticoCantidadInput.value = "";
                      plasticoCantidadInput.focus();
                    } catch (error) {
                      console.error("Error al acualizar la cantidad", error);
                      alert("Errro al actualizar la cantidad");
                    }
                  }
                );
              } else {
                console.error('El Boton "AGREGAR plastico NO EXISYE EN EL DOM');
              }
              cargarHistorialplastico()
              break;
            case "fundicion":
              document.getElementById("pieza-fundicion").value =
                selectedData.nombre;
              document.getElementById("description-fundicion").innerHTML =
                selectedData.detalle;
              document.getElementById("img-fundicion").src = selectedData.img;

              const botonAgregarfundicion = document.getElementById(
                "btn-agregar-fundicion"
              );

              if (botonAgregarfundicion) {
                botonAgregarfundicion.replaceWith(
                  botonAgregarfundicion.cloneNode(true)
                );
                const nuevoBottonAgregarfundicion = document.getElementById(
                  "btn-agregar-fundicion"
                );

                nuevoBottonAgregarfundicion.addEventListener(
                  "click",
                  async () => {
                    const nombrePiezafundicion =
                      document.getElementById("pieza-fundicion")?.value;
                    let fundicionCantidadInput =
                      document.getElementById("cantidad-fundicion");
                    let fundicionCantidadPieza = parseInt(
                      fundicionCantidadInput?.value
                    );

                    if (!nombrePiezafundicion) {
                      console.error(
                        "No Se puede Actualizar sin un nommbre de pieza"
                      );
                      return;
                    }

                    const fundicionCantidadActual = selectedData.cantidad || 0;
                    const fundicionCantidadNueva =
                      fundicionCantidadActual + fundicionCantidadPieza;

                    try {
                      const response = await fetch(
                        `http://localhost:5000/api/piezas/nombre/${encodeURIComponent(
                          nombrePiezafundicion
                        )}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            cantidad: fundicionCantidadNueva,
                          }),
                        }
                      );
                      if (!response.ok)
                        throw new Error("Error al actualizar la  cantidad");

                      const resultado = await response.json();
                      console.log("Cantidada ACtualizar con exito:", resultado);
                      alert("Cantidad actualizada Correctamente");

                      agregarAlHistorialfundicion(
                        nombrePiezafundicion,
                        fundicionCantidadNueva
                      );

                      await mostrarTabla("fundicion");

                      fundicionCantidadInput.value = "";
                      fundicionCantidadInput.focus();
                    } catch (error) {
                      console.error("Error al acualizar la cantidad", error);
                      alert("Errro al actualizar la cantidad");
                    }
                  }
                );
              } else {
                console.error('El Boton "AGREGAR fundicion NO EXISYE EN EL DOM');
              }
              cargarHistorialfundicion()
              break;
          }
        } catch (err) {
          console.error(`Error al obtener datos de ${tabla}:`, err);
        }
      });

      function agregarAlHistorialChapa(pieza, cantidad) {
        const timestamp = new Date().toLocaleString();
        const nuevoCambio = `🛠️ ${timestamp}-Se agregaron ${cantidad} unidades a la pieza "${pieza}".`;
        historialCambios.unshift(nuevoCambio);
        if (historialCambios.length > 10) {
          historialCambios.pop();
        }
      
        fetch('http://localhost:5000/api/historiales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pieza: "chapa", cantidad: nuevoCambio }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error('Error al guardar:', err));

          cargarHistorialchapa()
      }
      function cargarHistorialchapa() {
        fetch('http://localhost:5000/api/historiales/chapa')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const historialContainer = document.getElementById("historial-cambios-chapa");
              historialContainer.innerHTML = "";
      
              data.cambios.forEach(cambio => {
                const li = document.createElement("li");
                li.textContent = cambio;
                li.id = "historial-chapa"
                historialContainer.appendChild(li);
              });
            } else {
              console.error("No se pudo cargar el historial");
            }
          })
          .catch(err => {
            console.error('Error al cargar historial:', err);
          });
      }
      function agregarAlHistorialshop(pieza, cantidad) {
        const timestamp = new Date().toLocaleString();
        const nuevoCambio = `🛠️ ${timestamp} - Se agregaron ${cantidad} unidades a la pieza "${pieza}".`;
        historialCambios.unshift(nuevoCambio);

        if (historialCambios.length > 10) {
          historialCambios.pop();
        }
        fetch('http://localhost:5000/api/historiales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pieza: "shop", cantidad: nuevoCambio }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error('Error al guardar:', err));

          cargarHistorialshop()
      }
      function cargarHistorialshop() {
        fetch('http://localhost:5000/api/historiales/shop')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const historialContainer = document.getElementById("historial-cambios-shop");
              historialContainer.innerHTML = "";
      
              data.cambios.forEach(cambio => {
                const li = document.createElement("li");
                li.textContent = cambio;
                li.id = "historial-shop"
                historialContainer.appendChild(li);
              });
            } else {
              console.error("No se pudo cargar el historial");
            }
          })
          .catch(err => {
            console.error('Error al cargar historial:', err);
          });
      }
      function agregarAlHistorialplastico(pieza, cantidad) {
        const timestamp = new Date().toLocaleString();
        const nuevoCambio = `🛠️ ${timestamp} - Se agregaron ${cantidad} unidades a la pieza "${pieza}".`;
        historialCambios.unshift(nuevoCambio);

        if (historialCambios.length > 10) {
          historialCambios.pop();
        }
        fetch('http://localhost:5000/api/historiales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pieza: "plastico", cantidad: nuevoCambio }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error('Error al guardar:', err));

          cargarHistorialplastico()
      }
      function cargarHistorialplastico() {
        fetch('http://localhost:5000/api/historiales/plastico')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const historialContainer = document.getElementById("historial-cambios-plastico");
              historialContainer.innerHTML = "";
      
              data.cambios.forEach(cambio => {
                const li = document.createElement("li");
                li.textContent = cambio;
                li.id = "historial-plastico"
                historialContainer.appendChild(li);
              });
            } else {
              console.error("No se pudo cargar el historial");
            }
          })
          .catch(err => {
            console.error('Error al cargar historial:', err);
          });
      }
      function agregarAlHistorialfundicion(pieza, cantidad) {
        const timestamp = new Date().toLocaleString();
        const nuevoCambio = `🛠️ ${timestamp} - Se agregaron ${cantidad} unidades a la pieza "${pieza}".`;
        historialCambios.unshift(nuevoCambio);

        if (historialCambios.length > 10) {
          historialCambios.pop();
        }
        fetch('http://localhost:5000/api/historiales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pieza: "fundicion", cantidad: nuevoCambio }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error('Error al guardar:', err));

          cargarHistorialfundicion()
      }
      function cargarHistorialfundicion() {
        fetch('http://localhost:5000/api/historiales/fundicion')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const historialContainer = document.getElementById("historial-cambios-fundicion");
              historialContainer.innerHTML = "";
      
              data.cambios.forEach(cambio => {
                const li = document.createElement("li");
                li.textContent = cambio;
                li.id = "historial-fundicion"
                historialContainer.appendChild(li);
              });
            } else {
              console.error("No se pudo cargar el historial");
            }
          })
          .catch(err => {
            console.error('Error al cargar historial:', err);
          });
      }
      function agregarAlHistorial(pieza, cantidad) {
        const timestamp = new Date().toLocaleString(); // Obtener fecha y hora actual
        const nuevoCambio = `🛠️ ${timestamp} - Se agregaron ${cantidad} unidades a la pieza "${pieza}".`;
        historialCambios.unshift(nuevoCambio); // Agregar al inicio del array

        // Limitar historial a los últimos 10 cambios (opcional)
        if (historialCambios.length > 10) {
          historialCambios.pop();
        }

        fetch('http://localhost:5000/api/historiales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pieza: "aluminio", cantidad: nuevoCambio }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error('Error al guardar:', err));

          cargarHistorialAluminio()
      }
      function cargarHistorialAluminio() {
        fetch('http://localhost:5000/api/historiales/aluminio')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const historialContainer = document.getElementById("historial-cambios-aluminio");
              historialContainer.innerHTML = "";
      
              data.cambios.forEach(cambio => {
                const li = document.createElement("li");
                li.textContent = cambio;
                li.id = "historial-aluminio"
                historialContainer.appendChild(li);
              });
            } else {
              console.error("No se pudo cargar el historial");
            }
          })
          .catch(err => {
            console.error('Error al cargar historial:', err);
          });
      }

      // Llamá a esta función cuando cargue la página
      cargarHistorialAluminio()
      cargarHistorialfundicion()
      cargarHistorialplastico()
      cargarHistorialshop()
      cargarHistorialchapa()
    }
  } 


}



module.exports = { mostrar, limpiarCampos, mostrarTabla };