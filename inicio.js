const { llenarProcesosDropdown, mostrarSeleccion, cargarPiezas } = require("./js/principio");
const {mostrar, mostrarTabla, limpiarCampos} = require('./js/agregar')
const {mostrarbtn,  box} = require('./js/mecanizado')
const {mostrarContenido} = require("./js/provedores")
const {boxArmado} = require("./js/armado")
const {controlCalidad} = require("./js/control")
const {panel} = require("./js/panel")


fetch("http://localhost:5000/api/auth/user", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const nombreUsuarioElement = document.getElementById("nombre_id");
    if (nombreUsuarioElement) {
      nombreUsuarioElement.innerHTML = `Bienvenido, ${data.username}`;
    }
  })
  .catch((error) => {
    console.error("Error al obtener los datos del usuario:", error);
  });

async function loadSection(section) {
  const contentDiv = document.getElementById("content");
  try {
    const response = await fetch(`./view/${section}.html`); // Asegúrate de que la ruta sea correcta
    
    if (!response.ok) throw new Error("Error al cargar la sección");
    const html = await response.text();
    contentDiv.innerHTML = html;

    // Lógica adicional para inicializar scripts según la sección
    if (section === "principio") {
      llenarProcesosDropdown();
      mostrarSeleccion();
      cargarPiezas();
    } else if (section === "agregar") {
      mostrar(),
      limpiarCampos()
      mostrarTabla("aluminio")
    } else if (section === 'mecanizado'){
      mostrarbtn()
      box()
    }else if (section === "provedores"){
      mostrarContenido("Soldador")
    }else if (section === "armado"){
      boxArmado()
    }else if(section === "control"){
      controlCalidad()
    }else if (section === "panel"){
      panel()
    }

  } catch (error) {
    console.error("Error:", error);
    contentDiv.innerHTML = `<p>Error al cargar la sección "${section}"</p>`;
  }
}

window.loadSection = loadSection;
window.onload = () => loadSection("armado");
// Tema oscuro/claro
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggleBtn.textContent = "Cambiar a Modo Claro";
  } else {
    body.classList.remove("dark-mode");
    themeToggleBtn.textContent = "Cambiar a Modo Oscuro";
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "Cambiar a Modo Claro";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggleBtn.textContent = "Cambiar a Modo Oscuro";
      localStorage.setItem("theme", "light");
    }
  });
});