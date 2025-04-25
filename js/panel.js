let tabla;
let datosPiezas = []; // todas las piezas desde MongoDB

function panel() {
  const columnas = [
    { title: "Nombre", field: "nombre", width: 220 },
    { title: "Tipo", field: "tipo_material", width: 110 },
  ];

  async function cargarPiezasDesdeServidor() {
    try {
      const res = await fetch("http://localhost:5000/api/piezaPanel");
      datosPiezas = await res.json();
      console.log(datosPiezas);

      if (tabla) tabla.destroy();

      tabla = new Tabulator("#miTabla", {
        height: 400,
        data: datosPiezas,
        columns: columnas,
        layout: "fitColumns",
        initialSort: [{ column: "nombre", dir: "asc" }],
      });

      tabla.on("rowClick", function (e, row) {
        const selectData = row.getData();
        mostrarDetalles(selectData);
      });

      crearBotonesDeFiltro();

      // Comprobamos si hay cambios en las piezas cada 5 segundos
      setInterval(async () => {
        const res = await fetch("http://localhost:5000/api/piezaPanel");
        const datosActualizados = await res.json();
        if (JSON.stringify(datosPiezas) !== JSON.stringify(datosActualizados)) {
          datosPiezas = datosActualizados;
          tabla.setData(datosPiezas);
          console.log("Datos actualizados en tiempo real");
        }
      }, 10000); // Actualización cada 5 segundos
    } catch (err) {
      console.error("Error al cargar piezas:", err);
    }
  }

  function mostrarDetalles(selectData) {
    try {
      let piezaSeleccionadaInfo = `
        <b>Seleccionaste:</b> ${selectData.nombre} <br>
        <b>Tipo:</b> ${selectData.tipo_material} <br>
        <b>Detalles Generales:</b> ${selectData.detallesGeneral || "No disponible"
        } <br>
      `;

      if (selectData.nombre === "Aro Numerador") {
        piezaSeleccionadaInfo += crearContenedorAroNumerador(selectData);
      } else if (selectData.nombre === "Base Afilador 250") {
        piezaSeleccionadaInfo += crearContenedorBaseAfiladores250(selectData);
      } else if (selectData.nombre === "Base Afilador 300") {
        piezaSeleccionadaInfo += crearContenedorBaseAfiladores300(selectData);
      } else if (selectData.nombre === "Base Afilador 330") {
        piezaSeleccionadaInfo += crearContenedorBaseAfiladores330(selectData);
      } else if (selectData.nombre === "Brazo 250") {
        piezaSeleccionadaInfo += crearContenedorBrazo250(selectData);
      } else if (selectData.nombre === "Brazo 300") {
        piezaSeleccionadaInfo += crearContenedorBrazo300(selectData);
      } else if (selectData.nombre === "Brazo 330") {
        piezaSeleccionadaInfo += crearContenedorBrazo330(selectData);
      } else if (selectData.nombre === "Caja 250") {
        piezaSeleccionadaInfo += crearContenedorCaja250(selectData);
      } else if (selectData.nombre === "Caja 300") {
        piezaSeleccionadaInfo += crearContenedorCaja300(selectData);
      } else if (selectData.nombre === "Caja 330") {
        piezaSeleccionadaInfo += crearContenedorCaja330(selectData);
      } else if (selectData.nombre === "Carcaza Afilador") {
        piezaSeleccionadaInfo += crearContenedorCarcazaAfilador(selectData);
      } else if (selectData.nombre === "Cubrecuchilla 250") {
        piezaSeleccionadaInfo += crearContenedorCubrecuchilla250(selectData);
      } else if (selectData.nombre === "Cubrecuchilla 300") {
        piezaSeleccionadaInfo += crearContenedorCubrecuchilla300(selectData);
      } else if (selectData.nombre === "Cubrecuchilla 330") {
        piezaSeleccionadaInfo += crearContenedorCubrecuchilla330(selectData);
      } else if (selectData.nombre === "Eje") {
        piezaSeleccionadaInfo += crearContenedorEje(selectData);
      } else if (selectData.nombre === "Eje 250") {
        piezaSeleccionadaInfo += crearContenedorEje250(selectData);
      } else if (selectData.nombre === "Manchon") {
        piezaSeleccionadaInfo += crearContenedorManchon(selectData);
      } else if (selectData.nombre === "Manchon 250") {
        piezaSeleccionadaInfo += crearContenedorManchon250(selectData);
      } else if (selectData.nombre === "Tapa Afilador") {
        piezaSeleccionadaInfo += crearContenedorTapaAfilador(selectData);
      } else if (selectData.nombre === "Tapa Afilador 250") {
        piezaSeleccionadaInfo += crearContenedorTapaAfilador250(selectData);
      } else if (selectData.nombre === "Tapa Afilador Eco") {
        piezaSeleccionadaInfo += crearContenedorTapaAfiladorECO(selectData);
      } else if (selectData.nombre === "Teletubi 330") {
        piezaSeleccionadaInfo += crearContenedorTeletubi330(selectData);
      } else if (selectData.nombre === "Teletubi 300") {
        piezaSeleccionadaInfo += crearContenedorTeletubi300(selectData);
      } else if (selectData.nombre === "Teletubi 250") {
        piezaSeleccionadaInfo += crearContenedorTeletubi250(selectData);
      } else if (selectData.nombre === "Velero") {
        piezaSeleccionadaInfo += crearContenedorVelero(selectData);
      } else if (selectData.nombre === "Bandeja 330") {
        piezaSeleccionadaInfo += crearContenedorBandeja330(selectData);
      } else if (selectData.nombre === "Bandeja 300") {
        piezaSeleccionadaInfo += crearContenedorBandeja300(selectData);
      } else if (selectData.nombre === "Cable 220w") {
        piezaSeleccionadaInfo += crearContenedorCable220w(selectData);
      } else if (selectData.nombre === "Cable Corto Eco") {
        piezaSeleccionadaInfo += crearContenedorCableCortoEco(selectData);
      } else if (selectData.nombre === "Cable Eco 220w") {
        piezaSeleccionadaInfo += crearContenedorCableEco220W(selectData);
      } else if (selectData.nombre === "Calco Tensor Correa") {
        piezaSeleccionadaInfo += crearContenedorCalcoTenserCorrea(selectData);
      } else if (selectData.nombre === "Calco verde eco") {
        piezaSeleccionadaInfo += crearContenedorCalcoVerdeEco(selectData);
      } else if (selectData.nombre === "Capacitores") {
        piezaSeleccionadaInfo += crearContenedorCapacitores(selectData);
      } else if (selectData.nombre === "Capacitores 250") {
        piezaSeleccionadaInfo += crearContenedorCapacitores250(selectData);
      } else if (selectData.nombre === "Circulo argentina") {
        piezaSeleccionadaInfo += crearContenedorCirculoArgentina(selectData);
      } else if (selectData.nombre === "Conector Hembra") {
        piezaSeleccionadaInfo += crearContenedorConectorHembra(selectData);
      } else if (selectData.nombre === "Correa Eco") {
        piezaSeleccionadaInfo += crearContenedorCorreaEco(selectData);
      } else if (selectData.nombre === "Cuchilla 250") {
        piezaSeleccionadaInfo += crearContenedorCuchilla250(selectData);
      } else if (selectData.nombre === "Cuchilla 300") {
        piezaSeleccionadaInfo += crearContenedorCuchilla300(selectData);
      } else if (selectData.nombre === "Cuchilla 330") {
        piezaSeleccionadaInfo += crearContenedorCuchilla330(selectData);
      } else if (selectData.nombre === "Etiqueta Cable") {
        piezaSeleccionadaInfo += crearContenedorEtiquetaCable(selectData);
      } else if (selectData.nombre === "Etiqueta Peligro") {
        piezaSeleccionadaInfo += crearContenedorEtiquetaPeligro(selectData);
      } else if (selectData.nombre === "F circulo") {
        piezaSeleccionadaInfo += crearContenedorFcirculo(selectData);
      } else if (selectData.nombre === "F Cuadrado") {
        piezaSeleccionadaInfo += crearContenedorFCuadrado(selectData);
      } else if (selectData.nombre === "Fadeco 250 2estrella") {
        piezaSeleccionadaInfo += crearContenedorFadeco2502estrella(selectData);
      } else if (selectData.nombre === "Fadeco 300 3estrella") {
        piezaSeleccionadaInfo += crearContenedorFadeco3003estrella(selectData);
      } else if (selectData.nombre === "Fadeco 300 4estrella") {
        piezaSeleccionadaInfo += crearContenedorFadeco3004estrella(selectData);
      } else if (selectData.nombre === "Fadeco 330 3estrella") {
        piezaSeleccionadaInfo += crearContenedorFadeco3303estrella(selectData);
      } else if (selectData.nombre === "Fadeco 330 4estrella") {
        piezaSeleccionadaInfo += crearContenedorFadeco3304estrella(selectData);
      } else if (selectData.nombre === "Garantia") {
        piezaSeleccionadaInfo += crearContenedorGarantia(selectData);
      } else if (selectData.nombre === "Manual Instruciones") {
        piezaSeleccionadaInfo += crearContenedorManualInstruciones(selectData);
      } else if (selectData.nombre === "Motor 220w") {
        piezaSeleccionadaInfo += crearContenedorMotor220w(selectData);
      } else if (selectData.nombre === "Motor ECO 220w") {
        piezaSeleccionadaInfo += crearContenedorMotorECO220w(selectData);
      } else if (selectData.nombre === "Oring") {
        piezaSeleccionadaInfo += crearContenedorOring(selectData);
      } else if (selectData.nombre === "Patas") {
        piezaSeleccionadaInfo += crearContenedorPatas(selectData);
      } else if (selectData.nombre === "Piedra Afilador") {
        piezaSeleccionadaInfo += crearContenedorPiedraAfilador(selectData);
      } else if (selectData.nombre === "Polea Chica") {
        piezaSeleccionadaInfo += crearContenedorPoleaChica(selectData);
      } else if (selectData.nombre === "Polea Grande") {
        piezaSeleccionadaInfo += crearContenedorPoleaGrande(selectData);
      } else if (selectData.nombre === "Resorte Brazo") {
        piezaSeleccionadaInfo += crearContenedorResorteBrazo(selectData);
      } else if (selectData.nombre === "Resorte Carro") {
        piezaSeleccionadaInfo += crearContenedorResorteCarro(selectData);
      } else if (selectData.nombre === "Motor250 220w") {
        piezaSeleccionadaInfo += crearContenedorMotor250220w(selectData);
      } else if (selectData.nombre === "Resorte Empuje") {
        piezaSeleccionadaInfo += crearContenedorResorteEmpuje(selectData);
      } else if (selectData.nombre === "Resorte Movimiento") {
        piezaSeleccionadaInfo += crearContenedorResorteMovimiento(selectData);
      } else if (selectData.nombre === "Resorte Palanca") {
        piezaSeleccionadaInfo += crearContenedorResortePalanca(selectData);
      } else if (selectData.nombre === "Ruleman6000") {
        piezaSeleccionadaInfo += crearContenedorRuleman6000(selectData);
      } else if (selectData.nombre === "Ruleman6004") {
        piezaSeleccionadaInfo += crearContenedorRuleman6004(selectData);
      } else if (selectData.nombre === "Ruleman6005") {
        piezaSeleccionadaInfo += crearContenedorRuleman6005(selectData);
      } else if (selectData.nombre === "Ruleman608") {
        piezaSeleccionadaInfo += crearContenedorRuleman608(selectData);
      } else if (selectData.nombre === "Ruleman6204") {
        piezaSeleccionadaInfo += crearContenedorRuleman6204(selectData);
      } else if (selectData.nombre === "Ruleman6205") {
        piezaSeleccionadaInfo += crearContenedorRuleman6205(selectData);
      } else if (selectData.nombre === "RulemanR6") {
        piezaSeleccionadaInfo += crearContenedorRulemanR6(selectData);
      } else if (selectData.nombre === "Seguer") {
        piezaSeleccionadaInfo += crearContenedorSeguer(selectData);
      } else if (selectData.nombre === "Sinfin") {
        piezaSeleccionadaInfo += crearContenedorSinfin(selectData);
      } else if (selectData.nombre === "Tecla") {
        piezaSeleccionadaInfo += crearContenedorTecla(selectData);
      } else if (selectData.nombre === "Tornillo guia") {
        piezaSeleccionadaInfo += crearContenedorTornilloguia(selectData);
      } else if (selectData.nombre === "Tornillo Teletubi Eco") {
        piezaSeleccionadaInfo += crearContenedorTornilloTeletubiEco(selectData);
      } else if (selectData.nombre === "Carros") {
        piezaSeleccionadaInfo += crearContenedorCarros(selectData);
      } else if (selectData.nombre === "Carros 250") {
        piezaSeleccionadaInfo += crearContenedorCarros250(selectData);
      } else if (selectData.nombre === "Movimiento") {
        piezaSeleccionadaInfo += crearContenedorMovimientos(selectData);
      } else if (selectData.nombre === "Capuchon 250") {
        piezaSeleccionadaInfo += crearContenedorCapuchon250(selectData);
      } else if (selectData.nombre === "Capuchon Afilador") {
        piezaSeleccionadaInfo += crearContenedorCapuchonAfilador(selectData);
      } else if (selectData.nombre === "Capuchon Motor Dodo") {
        piezaSeleccionadaInfo += crearContenedorCapuchonMotorDodo(selectData);
      } else if (selectData.nombre === "Corona 250") {
        piezaSeleccionadaInfo += crearContenedorCorona250(selectData);
      } else if (selectData.nombre === "Corona 300") {
        piezaSeleccionadaInfo += crearContenedorCorona300(selectData);
      } else if (selectData.nombre === "Corona 330") {
        piezaSeleccionadaInfo += crearContenedorCorona330(selectData);
      } else if (selectData.nombre === "Cubre Motor Cuadrado") {
        piezaSeleccionadaInfo += crearContenedorCubreMotorCuadrado(selectData);
      } else if (selectData.nombre === "Cubre Motor Rectangulo") {
        piezaSeleccionadaInfo +=
          crearContenedorCubreMotorRectangulo(selectData);
      } else if (selectData.nombre === "Espiral") {
        piezaSeleccionadaInfo += crearContenedorEspiral(selectData);
      } else if (selectData.nombre === "Perilla Afilador") {
        piezaSeleccionadaInfo += crearContenedorPerillaAfilador(selectData);
      } else if (selectData.nombre === "Perilla Brazo") {
        piezaSeleccionadaInfo += crearContenedorPerillaBrazo(selectData);
      } else if (selectData.nombre === "Perilla Cubrecuchilla") {
        piezaSeleccionadaInfo +=
          crearContenedorPerillaCubrecuchilla(selectData);
      } else if (selectData.nombre === "Perilla Numerador") {
        piezaSeleccionadaInfo += crearContenedorPerillaNumerador(selectData);
      } else if (selectData.nombre === "Pipas") {
        piezaSeleccionadaInfo += crearContenedorPipas(selectData);
      } else if (selectData.nombre === "Pitito Teletubi Eco") {
        piezaSeleccionadaInfo += crearContenedorPititoTeletubiEco(selectData);
      } else if (selectData.nombre === "Rectangulo Plastico Eco") {
        piezaSeleccionadaInfo +=
          crearContenedorRectanguloPlasticoEco(selectData);
      } else if (selectData.nombre === "Rueditas") {
        piezaSeleccionadaInfo += crearContenedorRueditas(selectData);
      } else if (selectData.nombre === "Tapa Correa Eco") {
        piezaSeleccionadaInfo += crearContenedorTapaCorreaEco(selectData);
      } else if (selectData.nombre === "Tapita Perilla") {
        piezaSeleccionadaInfo += crearContenedorTapitaPerilla(selectData);
      } else if (selectData.nombre === "Ventilador 250") {
        piezaSeleccionadaInfo += crearContenedorVentilador250(selectData);
      } else if (selectData.nombre === "Ventilador Motor") {
        piezaSeleccionadaInfo += crearContenedorVentiladorMotor(selectData);
      } else if (selectData.nombre === "Bandeja Cabezal Inox") {
        piezaSeleccionadaInfo += crearContenedorBandejaCabezalInox(selectData);
      } else if (selectData.nombre === "Bandeja Cabezal Inox 250") {
        piezaSeleccionadaInfo +=
          crearContenedorBandejaCabezalInox250(selectData);
      } else if (selectData.nombre === "Bandeja Cabezal Pintada") {
        piezaSeleccionadaInfo +=
          crearContenedorBandejaCabezalPintada(selectData);
      } else if (selectData.nombre === "Chapa CubreCabezal inox") {
        piezaSeleccionadaInfo +=
          crearContenedorChapaCubreCabezalinox(selectData);
      } else if (selectData.nombre === "Chapa CubreCabezal inox 250") {
        piezaSeleccionadaInfo +=
          crearContenedorChapaCubreCabezalinox250(selectData);
      } else if (selectData.nombre === "Chapa CubreCabezal Pintada") {
        piezaSeleccionadaInfo +=
          crearContenedorChapaCubreCabezalPintada(selectData);
      } else if (selectData.nombre === "Chapa U inox") {
        piezaSeleccionadaInfo += crearContenedorChapaUinox(selectData);
      } else if (selectData.nombre === "Chapa U inox 250") {
        piezaSeleccionadaInfo += crearContenedorChapaUinox250(selectData);
      } else if (selectData.nombre === "Chapa U Pintada") {
        piezaSeleccionadaInfo += crearContenedorChapaUPintada(selectData);
      } else if (selectData.nombre === "ChapaBase 250Inox") {
        piezaSeleccionadaInfo += crearContenedorChapaBase250Inox(selectData);
      } else if (selectData.nombre === "ChapaBase 300Inox") {
        piezaSeleccionadaInfo += crearContenedorChapaBase300Inox(selectData);
      } else if (selectData.nombre === "ChapaBase 300Pintada") {
        piezaSeleccionadaInfo += crearContenedorChapaBase300Pintada(selectData);
      } else if (selectData.nombre === "ChapaBase 330Inox") {
        piezaSeleccionadaInfo += crearContenedorChapaBase330Inox(selectData);
      } else if (selectData.nombre === "ChapaBase 330Pintada") {
        piezaSeleccionadaInfo += crearContenedorChapaBase330Pintada(selectData);
      } else if (selectData.nombre === "Lateral i250 contecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali250contecla(selectData);
      } else if (selectData.nombre === "Lateral i250 sintecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali250sintecla(selectData);
      } else if (selectData.nombre === "Lateral i300 contecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali300contecla(selectData);
      } else if (selectData.nombre === "Lateral i300 sintecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali300sintecla(selectData);
      } else if (selectData.nombre === "Lateral i330 contecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali330contecla(selectData);
      } else if (selectData.nombre === "Lateral i330 eco") {
        piezaSeleccionadaInfo += crearContenedorLaterali330eco(selectData);
      } else if (selectData.nombre === "Lateral i330 sintecla") {
        piezaSeleccionadaInfo += crearContenedorLaterali330sintecla(selectData);
      } else if (selectData.nombre === "Lateral p300 contecla") {
        piezaSeleccionadaInfo += crearContenedorLateralp300contecla(selectData);
      } else if (selectData.nombre === "Lateral p300 sintecla") {
        piezaSeleccionadaInfo += crearContenedorLateralp300sintecla(selectData);
      } else if (selectData.nombre === "Lateral p330 contecla") {
        piezaSeleccionadaInfo += crearContenedorLateralp330contecla(selectData);
      } else if (selectData.nombre === "Lateral p330 sintecla") {
        piezaSeleccionadaInfo += crearContenedorLateralp330sintecla(selectData);
      } else if (selectData.nombre === "Media Luna") {
        piezaSeleccionadaInfo += crearContenedorMediaLuna(selectData);
      } else if (selectData.nombre === "Pieza Caja Eco") {
        piezaSeleccionadaInfo += crearContenedorPiezaCajaEco(selectData);
      } else if (selectData.nombre === "Pinche Frontal") {
        piezaSeleccionadaInfo += crearContenedorPincheFrontal(selectData);
      } else if (selectData.nombre === "Pinche Frontal 250") {
        piezaSeleccionadaInfo += crearContenedorPincheFrontal250(selectData);
      } else if (selectData.nombre === "Pinche lateral") {
        piezaSeleccionadaInfo += crearContenedorPinchelateral(selectData);
      } else if (selectData.nombre === "Pinche lateral 250") {
        piezaSeleccionadaInfo += crearContenedorPinchelateral250(selectData);
      } else if (selectData.nombre === "Planchada 250") {
        piezaSeleccionadaInfo += crearContenedorPlanchada250(selectData);
      } else if (selectData.nombre === "Planchada 300") {
        piezaSeleccionadaInfo += crearContenedorPlanchada300(selectData);
      } else if (selectData.nombre === "Planchada 330") {
        piezaSeleccionadaInfo += crearContenedorPlanchada330(selectData);
      } else if (selectData.nombre === "Vela 250") {
        piezaSeleccionadaInfo += crearContenedorVela250(selectData);
      } else if (selectData.nombre === "Vela 300") {
        piezaSeleccionadaInfo += crearContenedorVela300(selectData);
      } else if (selectData.nombre === "Vela 330") {
        piezaSeleccionadaInfo += crearContenedorVela330(selectData);
      } else if (selectData.nombre === "Afilador") {
        piezaSeleccionadaInfo += crearContenedorAfilador(selectData);
      } else if (selectData.nombre === "baseInox250") {
        piezaSeleccionadaInfo += crearContenedorbaseInox250(selectData);
      } else if (selectData.nombre === "baseInox300") {
        piezaSeleccionadaInfo += crearContenedorbaseInox300(selectData);
      } else if (selectData.nombre === "baseInox330") {
        piezaSeleccionadaInfo += crearContenedorbaseInox330(selectData);
      } else if (selectData.nombre === "baseInoxECO") {
        piezaSeleccionadaInfo += crearContenedorbaseInoxECO(selectData);
      } else if (selectData.nombre === "basePintada300") {
        piezaSeleccionadaInfo += crearContenedorbasePintada300(selectData);
      } else if (selectData.nombre === "basePintada330") {
        piezaSeleccionadaInfo += crearContenedorbasePintada330(selectData);
      } else if (selectData.nombre === "BasePreArmada_Inox250") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_Inox250(selectData);
      } else if (selectData.nombre === "BasePreArmada_Inox300") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_Inox300(selectData);
      } else if (selectData.nombre === "BasePreArmada_Inox330") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_Inox330(selectData);
      } else if (selectData.nombre === "BasePreArmada_InoxECO") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_InoxECO(selectData);
      } else if (selectData.nombre === "BasePreArmada_Pintada300") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_Pintada300(selectData);
      } else if (selectData.nombre === "BasePreArmada_Pintada330") {
        piezaSeleccionadaInfo +=
          crearContenedorBasePreArmada_Pintada330(selectData);
      } else if (selectData.nombre === "Buje Eje Eco") {
        piezaSeleccionadaInfo += crearContenedorBujeEjeEco(selectData);
      } else if (selectData.nombre === "Caja Soldada Eco") {
        piezaSeleccionadaInfo += crearContenedorCajaSoldadaEco(selectData);
      } else if (selectData.nombre === "CajaMotor_250") {
        piezaSeleccionadaInfo += crearContenedorCajaMotor_250(selectData);
      } else if (selectData.nombre === "CajaMotor_300") {
        piezaSeleccionadaInfo += crearContenedorCajaMotor_300(selectData);
      } else if (selectData.nombre === "CajaMotor_330") {
        piezaSeleccionadaInfo += crearContenedorCajaMotor_330(selectData);
      } else if (selectData.nombre === "CajaMotor_ECO") {
        piezaSeleccionadaInfo += crearContenedorCajaMotor_ECO(selectData);
      } else if (selectData.nombre === "Cuadrado Regulador") {
        piezaSeleccionadaInfo += crearContenedorCuadradoRegulador(selectData);
      } else if (selectData.nombre === "Eje Corto") {
        piezaSeleccionadaInfo += crearContenedorEjeCorto(selectData);
      } else if (selectData.nombre === "Eje Largo") {
        piezaSeleccionadaInfo += crearContenedorEjeLargo(selectData);
      } else if (selectData.nombre === "Eje Rectificado") {
        piezaSeleccionadaInfo += crearContenedorEjeRectificado(selectData);
      } else if (selectData.nombre === "Guia U") {
        piezaSeleccionadaInfo += crearContenedorGuiaU(selectData);
      } else if (selectData.nombre === "Palanca Afilador") {
        piezaSeleccionadaInfo += crearContenedorPalancaAfilador(selectData);
      } else if (selectData.nombre === "Planchuela 250") {
        piezaSeleccionadaInfo += crearContenedorPlanchuela250(selectData);
      } else if (selectData.nombre === "Planchuela 300") {
        piezaSeleccionadaInfo += crearContenedorPlanchuela300(selectData);
      } else if (selectData.nombre === "Planchuela 330") {
        piezaSeleccionadaInfo += crearContenedorPlanchuela330(selectData);
      } else if (selectData.nombre === "Planchuela Inferior") {
        piezaSeleccionadaInfo += crearContenedorPlanchuelaInferior(selectData);
      } else if (selectData.nombre === "Planchuela Interna") {
        piezaSeleccionadaInfo += crearContenedorPlanchuelaInterna(selectData);
      } else if (selectData.nombre === "PortaEje") {
        piezaSeleccionadaInfo += crearContenedorPortaEje(selectData);
      } else if (selectData.nombre === "Teletubi Eco") {
        piezaSeleccionadaInfo += crearContenedorTeletubiEco(selectData);
      } else if (selectData.nombre === "Tubo Manija") {
        piezaSeleccionadaInfo += crearContenedorTuboManija(selectData);
      } else if (selectData.nombre === "Tubo Manija 250") {
        piezaSeleccionadaInfo += crearContenedorTuboManija250(selectData);
      } else if (selectData.nombre === "Varilla 330") {
        piezaSeleccionadaInfo += crearContenedorVarilla330(selectData);
      } else if (selectData.nombre === "Varilla 300") {
        piezaSeleccionadaInfo += crearContenedorVarilla300(selectData);
      } else if (selectData.nombre === "Varilla 250") {
        piezaSeleccionadaInfo += crearContenedorVarilla250(selectData);
      } else if (selectData.nombre === "Varilla Brazo 250") {
        piezaSeleccionadaInfo += crearContenedorVarillaBrazo250(selectData);
      } else if (selectData.nombre === "Varilla Brazo 300") {
        piezaSeleccionadaInfo += crearContenedorVarillaBrazo300(selectData);
      } else if (selectData.nombre === "Varilla Brazo 330") {
        piezaSeleccionadaInfo += crearContenedorVarillaBrazo330(selectData);
      } else if (selectData.nombre === "CabezalInox") {
        piezaSeleccionadaInfo += crearContenedorCabezalInox(selectData);
      } else if (selectData.nombre === "CabezalPintada") {
        piezaSeleccionadaInfo += crearContenedorCabezalPintada(selectData);
      } else if (selectData.nombre === "Cabezal250") {
        piezaSeleccionadaInfo += crearContenedorCabezal250(selectData);
      } else if (selectData.nombre === "Inox_330") {
        piezaSeleccionadaInfo += crearContenedorInox330(selectData);
      } else if (selectData.nombre === "Inox_ECO") {
        piezaSeleccionadaInfo += crearContenedorInoxECO(selectData);
      } else if (selectData.nombre === "Inox_250") {
        piezaSeleccionadaInfo += crearContenedorInox250(selectData);
      } else if (selectData.nombre === "Inox_300") {
        piezaSeleccionadaInfo += crearContenedorInox300(selectData);
      } else if (selectData.nombre === "Pintada_330") {
        piezaSeleccionadaInfo += crearContenedorPintada330(selectData);
      } else if (selectData.nombre === "Pintada_300") {
        piezaSeleccionadaInfo += crearContenedorPintada300(selectData);
      } else {
        piezaSeleccionadaInfo += `
          <b>Detalles:</b> ${selectData.detallesGeneral || "No disponible"}
        `;
      }

      document.getElementById("piezaSeleccionada").innerHTML =
        piezaSeleccionadaInfo;


      // Agregar el evento de clic en el botón de actualizar bruto

      const btnActualizarBruto = document.getElementById(
        `btnActualizarBruto_${selectData._id}`);
      if (btnActualizarBruto) {
        btnActualizarBruto.addEventListener("click", async () => {
          const cantidadBruto = document.getElementById(
            `inputCantidadBruto_${selectData._id}`
          ).value;
          const stockDeseadoBruto = document.getElementById(
            `inputStockDeseadoBruto_${selectData._id}`
          ).value;

          try {
            // Hacer la solicitud PUT al backend para actualizar la pieza
            const response = await fetch(
              `http://localhost:5000/api/piezasBrutoActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto,
                  stockDeseadoBruto,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje); // Mostrar mensaje de éxito
              // Actualizar la tabla en tiempo real tras la actualización
              cargarPiezasDesdeServidor(); // Vuelve a cargar los datos actualizados
            } else {
              alert(result.mensaje); // Mostrar mensaje de error si la pieza no se encuentra
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas augeriado
      const btnActualizarAugeriado = document.getElementById(
        `btnActualizarAugeriado_${selectData._id}`);
      if (btnActualizarAugeriado) {
        btnActualizarAugeriado.addEventListener("click", async () => {
          const cantidadAugeriado = document.getElementById(
            `inputCantidadAugeriado_${selectData._id}`
          ).value;
          const stockDeseadoAugeriado = document.getElementById(
            `inputStockDeseadoAugeriado_${selectData._id}`
          ).value;

          try {
            // Hacer la solicitud PUT al backend para actualizar la pieza augeriado
            const response = await fetch(
              `http://localhost:5000/api/piezasAugeriadoActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadAugeriado,
                  stockDeseadoBruto: stockDeseadoAugeriado,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje); // Mostrar mensaje de éxito
              // Acá podés actualizar la tabla o lo que quieras
            } else {
              alert(result.mensaje); // Mostrar mensaje de error si no se encuentra
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas corte
      const btnActualizarCorte = document.getElementById(
        `btnActualizarCorte_${selectData._id}`);
      if (btnActualizarCorte) {
        btnActualizarCorte.addEventListener("click", async () => {
          const cantidadCorte = document.getElementById(
            `inputCantidadCorte_${selectData._id}`
          ).value;
          const stockDeseadoCorte = document.getElementById(
            `inputStockDeseadoCorte_${selectData._id}`
          ).value;

          try {
            // Hacer la solicitud PUT al backend para actualizar la pieza corte
            const response = await fetch(
              `http://localhost:5000/api/piezasCorteActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadCorte,
                  stockDeseadoBruto: stockDeseadoCorte,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje); // Mostrar mensaje de éxito
              // Acá podés actualizar la tabla o lo que quieras
            } else {
              alert(result.mensaje); // Mostrar mensaje de error si no se encuentra
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas balancin
      const btnActualizarBalancin = document.getElementById(
        `btnActualizarBalancin_${selectData._id}`);
      if (btnActualizarBalancin) {
        btnActualizarBalancin.addEventListener("click", async () => {
          const cantidadBalancin = document.getElementById(
            `inputCantidadBalancin_${selectData._id}`
          ).value;
          const stockDeseadoBalancin = document.getElementById(
            `inputStockDeseadoBalancin_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasBalancinActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadBalancin,
                  stockDeseadoBruto: stockDeseadoBalancin,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
              // Actualización visual si es necesario
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas torno
      const btnActualizarTorno = document.getElementById(
        `btnActualizarTorno_${selectData._id}`);
      if (btnActualizarTorno) {
        btnActualizarTorno.addEventListener("click", async () => {
          const cantidadTorno = document.getElementById(
            `inputCantidadTorno_${selectData._id}`
          ).value;
          const stockDeseadoTorno = document.getElementById(
            `inputStockDeseadoTorno_${selectData._id}`
          ).value;

          try {
            // Hacer la solicitud PUT al backend para actualizar la pieza torno
            const response = await fetch(
              `http://localhost:5000/api/piezasTornoActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadTorno,
                  stockDeseadoBruto: stockDeseadoTorno,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje); // Mostrar mensaje de éxito
              // Acá podés actualizar la tabla o lo que quieras
            } else {
              alert(result.mensaje); // Mostrar mensaje de error si no se encuentra
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas plegadora
      const btnActualizarPlegadora = document.getElementById(
        `btnActualizarPlegadora_${selectData._id}`);
      if (btnActualizarPlegadora) {
        btnActualizarPlegadora.addEventListener("click", async () => {
          const cantidadPlegadora = document.getElementById(
            `inputCantidadPlegadora_${selectData._id}`
          ).value;
          const stockDeseadoPlegadora = document.getElementById(
            `inputStockDeseadoPlegadora_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasPlegadoraActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadPlegadora,
                  stockDeseadoBruto: stockDeseadoPlegadora,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas plasma
      const btnActualizarPlasma = document.getElementById(
        `btnActualizarPlasma_${selectData._id}`
      );
      if (btnActualizarPlasma) {
        btnActualizarPlasma.addEventListener("click", async () => {
          const cantidadPlasma = document.getElementById(
            `inputCantidadPlasma_${selectData._id}`
          ).value;
          const stockDeseadoPlasma = document.getElementById(
            `inputStockDeseadoPlasma_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasPlasmaActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadPlasma,
                  stockDeseadoBruto: stockDeseadoPlasma,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas Fresa
      const btnActualizarFresa = document.getElementById(
        `btnActualizarFresa_${selectData._id}`);
      if (btnActualizarFresa) {
        btnActualizarFresa.addEventListener("click", async () => {
          const cantidadFresa = document.getElementById(
            `inputCantidadFresa_${selectData._id}`
          ).value;
          const stockDeseadoFresa = document.getElementById(
            `inputStockDeseadoFresa_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasFresaActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadFresa,
                  stockDeseadoBruto: stockDeseadoFresa,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas Soldador
      const btnActualizarSoldador = document.getElementById(
        `btnActualizarSoldador_${selectData._id}`);
      if (btnActualizarSoldador) {
        btnActualizarSoldador.addEventListener("click", async () => {
          const cantidadSoldador = document.getElementById(
            `inputCantidadSoldador_${selectData._id}`
          ).value;
          const stockDeseadoSoldador = document.getElementById(
            `inputStockDeseadoSoldador_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasSoldarActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadSoldador,
                  stockDeseadoBruto: stockDeseadoSoldador,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }

      // Agregar el evento de clic en el botón de actualizar piezas Pulido

      const btnActualizarPulido = document.getElementById(
        `btnActualizarPulido_${selectData._id}`
      );
      if (btnActualizarPulido) {
        btnActualizarPulido.addEventListener("click", async () => {
          const cantidadPulido = document.getElementById(
            `inputCantidadPulido_${selectData._id}`
          ).value;
          const stockDeseadoPulido = document.getElementById(
            `inputStockDeseadoPulido_${selectData._id}`
          ).value;

          try {
            const response = await fetch(
              `http://localhost:5000/api/piezasPulidoActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadPulido,
                  stockDeseadoBruto: stockDeseadoPulido,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje);
            } else {
              alert(result.mensaje);
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }


      // Agregar el evento de clic en el botón de actualizar piezas terminadas
      const btnActualizarTerminado = document.getElementById(
        `btnActualizarTerminado_${selectData._id}`);
      if (btnActualizarTerminado) {
        btnActualizarTerminado.addEventListener("click", async () => {
          const cantidadTerminado = document.getElementById(
            `inputCantidadTerminado_${selectData._id}`
          ).value;
          const stockDeseadoTerminado = document.getElementById(
            `inputStockDeseadoTerminado_${selectData._id}`
          ).value;

          try {
            // Hacer la solicitud PUT al backend para actualizar la pieza terminada
            const response = await fetch(
              `http://localhost:5000/api/piezasTerminadoActualizar/nombre/${selectData.nombre}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidadBruto: cantidadTerminado,
                  stockDeseadoBruto: stockDeseadoTerminado,
                }),
              }
            );

            const result = await response.json();
            if (response.ok) {
              alert(result.mensaje); // Mostrar mensaje de éxito
              // Aquí puedes actualizar la tabla o la interfaz si es necesario
            } else {
              alert(result.mensaje); // Mostrar mensaje de error si la pieza no se encuentra
            }
          } catch (err) {
            console.error("Error al actualizar la pieza:", err);
            alert("Error al actualizar la pieza");
          }
        });
      }
    } catch (err) {
      console.error("Error al obtener datos de la fila seleccionada:", err);
    }
  }

  ///////////////////////////////////// Aluminio

  function crearContenedorAroNumerador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  ///////
  function crearContenedorBaseAfiladores250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBaseAfiladores300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBaseAfiladores330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  /////
  function crearContenedorBrazo250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>



      
    `;
  }
  function crearContenedorBrazo300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>



      
    `;
  }
  function crearContenedorBrazo330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>



      
    `;
  }
  /////
  function crearContenedorCaja250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>

        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>

      
    `;
  }
  function crearContenedorCaja300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>

      
    `;
  }
  function crearContenedorCaja330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>



      
    `;
  }
  ////
  function crearContenedorCarcazaAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>
        
      </div>
      </div>


    `;
  }
  ///
  function crearContenedorCubrecuchilla250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCubrecuchilla300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>

      
    `;
  }
  function crearContenedorCubrecuchilla330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  /////
  function crearContenedorEje(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>

      </div>
      </div>

      
    `;
  }
  function crearContenedorEje250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
    
      </div>
      </div>

      
    `;
  }
  /////
  function crearContenedorManchon(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>

      </div>
      </div>

      
    `;
  }
  function crearContenedorManchon250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
    
      </div>
      </div>

      
    `;
  }
  /////
  function crearContenedorTapaAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTapaAfilador250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTapaAfiladorECO(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>

      
    `;
  }
  ////
  function crearContenedorTeletubi250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTeletubi300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>
        

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
      </div>

      
    `;
  }
  function crearContenedorTeletubi330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  /////
  function crearContenedorVelero(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }

  //////////////////////////////////////// Chapa

  function crearContenedorBandeja330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

    `;
  }
  function crearContenedorBandeja300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }

  //////////////////////////////////////// Shop
  function crearContenedorCable220w(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCableCortoEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCableEco220W(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCalcoTenserCorrea(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCalcoVerdeEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCapacitores(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCapacitores250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCirculoArgentina(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorConectorHembra(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCorreaEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCuchilla250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCuchilla300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCuchilla330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorEtiquetaCable(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorEtiquetaPeligro(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFcirculo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFCuadrado(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFadeco2502estrella(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFadeco3003estrella(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFadeco3004estrella(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFadeco3303estrella(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorFadeco3304estrella(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorGarantia(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorManualInstruciones(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorMotor220w(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorMotor250220w(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorMotorECO220w(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorOring(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPatas(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPiedraAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPoleaChica(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPoleaGrande(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorResorteBrazo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorResorteCarro(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorResorteEmpuje(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorResorteMovimiento(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorResortePalanca(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman6000(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman6004(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman6005(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman608(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman6204(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRuleman6205(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRulemanR6(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorSeguer(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorSinfin(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTornilloguia(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>


      </div>
    `;
  }
  function crearContenedorTornilloTeletubiEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>



      </div>
    `;
  }

  ////////////////////////////////////////

  function crearContenedorCarros(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>

      </div>
      </div>

      
    `;
  }
  function crearContenedorCarros250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>

      </div>
      </div>

      
    `;
  }
  function crearContenedorMovimientos(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>

      </div>
      </div>

      
    `;
  }

  ////////////////////////////////////////// Plastico
  function crearContenedorCapuchon250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCapuchonAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCapuchonMotorDodo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCorona250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCorona300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCorona330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCubreMotorCuadrado(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCubreMotorRectangulo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorEspiral(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPerillaAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPerillaBrazo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPerillaCubrecuchilla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPerillaNumerador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPipas(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPititoTeletubiEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRectanguloPlasticoEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorRueditas(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTapaCorreaEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTapitaPerilla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorVentilador250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorVentiladorMotor(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorBandejaCabezalInox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

        
      </div>
      </div>


    `;
  }
  function crearContenedorBandejaCabezalInox250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

        
      </div>
      </div>


    `;
  }
  function crearContenedorBandejaCabezalPintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>


    `;
  }

  function crearContenedorChapaCubreCabezalinox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>
        </div>

    `;
  }
  function crearContenedorChapaCubreCabezalinox250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>
        </div>

    `;
  }
  function crearContenedorChapaCubreCabezalPintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>
        </div>

    `;
  }


  function crearContenedorChapaUinox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

        
      </div>


    `;
  }
  function crearContenedorChapaUinox250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

        
      </div>


    `;
  }
  function crearContenedorChapaUPintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Balancín:</b>
    <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Balancín:</b>
    <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
    <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

        
      </div>


    `;
  }

  function crearContenedorChapaBase250Inox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plasma:</b>
    <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plasma:</b>
    <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
    <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorChapaBase300Inox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plasma:</b>
    <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plasma:</b>
    <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
    <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorChapaBase300Pintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plasma:</b>
    <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plasma:</b>
    <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
    <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorChapaBase330Inox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plasma:</b>
    <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plasma:</b>
    <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
    <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorChapaBase330Pintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plasma:</b>
    <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plasma:</b>
    <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
    <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
  </div>
</div>


      </div>
    `;
  }

  function crearContenedorLaterali250contecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali250sintecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali300contecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali300sintecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali330contecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali330eco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLaterali330sintecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLateralp300contecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLateralp300sintecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLateralp330contecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorLateralp330sintecla(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorMediaLuna(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        


      </div>
    `;
  }
  function crearContenedorPiezaCajaEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

        


      </div>
    `;
  }
  function crearContenedorPincheFrontal(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPincheFrontal250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPinchelateral(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPinchelateral250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorPlanchada250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorPlanchada300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorPlanchada330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Plegadora</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Plegadora:</b>
    <input type="number" min="0" id="inputCantidadPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Plegadora:</b>
    <input type="number" min="0" id="inputStockDeseadoPlegadora_${selectData._id}" value="${selectData.cantidad.plegadora.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.plegadora.img}" alt="Imagen Aro Plegadora" style="max-width: 70px;">
    <button id="btnActualizarPlegadora_${selectData._id}">Actualizar Plegadora</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorVela330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorVela300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorVela250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr ; gap: 20px;">
    

      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
      <p style="margin-bottom: 10px;"><b>Datos Plasma</b></p>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Cantidad Plasma:</b>
        <input type="number" min="0" id="inputCantidadPlasma_${selectData._id}" value="${selectData.cantidad.plasma.cantidad}" style="width: 70px;">
      </div>
    
      <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
        <b style="min-width: 130px;">Stock Deseado Plasma:</b>
        <input type="number" min="0" id="inputStockDeseadoPlasma_${selectData._id}" value="${selectData.cantidad.plasma.stock_deseado}" style="width: 70px;">
      </div>
    
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
        <img src="${selectData.cantidad.plasma.img}" alt="Imagen Aro Plasma" style="max-width: 70px;">
        <button id="btnActualizarPlasma_${selectData._id}">Actualizar Plasma</button>
      </div>
    </div>

    <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Fresa</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Fresa:</b>
    <input type="number" min="0" id="inputCantidadFresa_${selectData._id}" value="${selectData.cantidad.fresa.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Fresa:</b>
    <input type="number" min="0" id="inputStockDeseadoFresa_${selectData._id}" value="${selectData.cantidad.fresa.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.fresa.img}" alt="Imagen Fresa" style="max-width: 70px;">
    <button id="btnActualizarFresa_${selectData._id}">Actualizar Fresa</button>
  </div>
</div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

 <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>

      </div>
    `;
  }

  function crearContenedorAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbaseInox250(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbaseInox300(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
        
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbaseInox330(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
        
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbaseInoxECO(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
        
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbasePintada300(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
        
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorbasePintada330(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>
        
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorBasePreArmada_Inox250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBasePreArmada_Inox300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBasePreArmada_Inox330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBasePreArmada_InoxECO(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBasePreArmada_Pintada300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBasePreArmada_Pintada330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorBujeEjeEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Torno</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Torno:</b>
                <input type="number" min="0" id="inputCantidadTorno_${selectData._id}" value="${selectData.cantidad.torno.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Torno:</b>
                <input type="number" min="0" id="inputStockDeseadoTorno_${selectData._id}" value="${selectData.cantidad.torno.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.torno.img}" alt="Imagen Aro Torno" style="max-width: 70px;">
                <button id="btnActualizarTorno_${selectData._id}">Actualizar Torno</button>
            </div>
        </div>

      </div>
    `;
  }
  function crearContenedorCajaSoldadaEco(selectData) {
    return `

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>



      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCajaMotor_250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCajaMotor_300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCajaMotor_330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCajaMotor_ECO(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Afilador" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCuadradoRegulador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Soldador:</b>
                <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Soldador:</b>
                <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
            <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
        </div>
  


      </div>
    `;
  }
  function crearContenedorEjeCorto(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorEjeLargo(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorEjeRectificado(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>







      </div>
    `;
  }

  function crearContenedorGuiaU(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPalancaAfilador(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorPlanchuela250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPlanchuela300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPlanchuela330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorPlanchuelaInferior(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

      </div>
    `;
  }
  function crearContenedorPlanchuelaInterna(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

      </div>
    `;
  }
  function crearContenedorPortaEje(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Augeriado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Augeriado:</b>
                <input type="number" min=0 id="inputCantidadAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Augeriado:</b>
                <input type="number" min=0 id="inputStockDeseadoAugeriado_${selectData._id}" value="${selectData.cantidad.augeriado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.augeriado.img}" alt="Imagen Aro Augeriado" style="max-width: 70px;">
                <button id="btnActualizarAugeriado_${selectData._id}">Actualizar Augeriado</button>
            </div>
        </div>

        

      </div>
    `;
  }
  function crearContenedorTeletubiEco(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Balancín</b></p>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Balancín:</b>
                <input type="number" min="0" id="inputCantidadBalancin_${selectData._id}" value="${selectData.cantidad.balancin.cantidad}" style="width: 70px;">
            </div>

            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Balancín:</b>
                <input type="number" min="0" id="inputStockDeseadoBalancin_${selectData._id}" value="${selectData.cantidad.balancin.stock_deseado}" style="width: 70px;">
            </div>

            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.balancin.img}" alt="Imagen Balancín" style="max-width: 70px;">
                <button id="btnActualizarBalancin_${selectData._id}">Actualizar Balancín</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>


      </div>
    `;
  }

  function crearContenedorTuboManija(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Corte:</b>
    <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Corte:</b>
    <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
    <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
  </div>
</div>



        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorTuboManija250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Corte:</b>
    <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Corte:</b>
    <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
    <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
  </div>
</div>



        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorVarilla330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorVarilla300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>


      </div>
    `;
  }
  function crearContenedorVarilla250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
          <p style="margin-bottom: 10px;"><b>Datos Corte</b></p>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Cantidad Corte:</b>
            <input type="number" min="0" id="inputCantidadCorte_${selectData._id}" value="${selectData.cantidad.corte.cantidad}"style="width: 70px;">
          </div>

          <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
            <b style="min-width: 130px;">Stock Deseado Corte:</b>
            <input type="number" min="0" id="inputStockDeseadoCorte_${selectData._id}" value="${selectData.cantidad.corte.stock_deseado}"style="width: 70px;">
          </div>

          <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
            <img src="${selectData.cantidad.corte.img}" alt="Imagen Corte" style="max-width: 70px;">
            <button id="btnActualizarCorte_${selectData._id}">Actualizar Corte</button>
          </div>
        </div>


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>


      </div>
    `;
  }

  function crearContenedorVarillaBrazo250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorVarillaBrazo300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorVarillaBrazo330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin: 5px;"><b>Datos Bruto</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Bruto:</b>
                <input type="number" min=0 id="inputCantidadBruto_${selectData._id}" value="${selectData.cantidad.bruto.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Bruto:</b>
                <input type="number" min=0 id="inputStockDeseadoBruto_${selectData._id}" value="${selectData.cantidad.bruto.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.bruto.img}" alt="Imagen Aro Bruto" style="max-width: 70px;">
                <button id="btnActualizarBruto_${selectData._id}">Actualizar Bruto</button>
            </div>
        </div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }

  function crearContenedorCabezalInox(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr ; gap: 20px;">
    


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin: 5px;"><b>Datos Pulido</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Pulido:</b>
    <input type="number" min="0" id="inputCantidadPulido_${selectData._id}" value="${selectData.cantidad.pulido.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Pulido:</b>
    <input type="number" min="0" id="inputStockDeseadoPulido_${selectData._id}" value="${selectData.cantidad.pulido.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.pulido.img}" alt="Imagen Pulido" style="max-width: 70px;">
    <button id="btnActualizarPulido_${selectData._id}">Actualizar Pulido</button>
  </div>
</div>



      </div>
    `;
  }
  function crearContenedorCabezalPintada(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr ; gap: 20px;">
    


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>


        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorCabezal250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr ; gap: 20px;">
    


<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin-bottom: 10px;"><b>Datos Soldador</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Soldador:</b>
    <input type="number" min="0" id="inputCantidadSoldador_${selectData._id}" value="${selectData.cantidad.soldador.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Soldador:</b>
    <input type="number" min="0" id="inputStockDeseadoSoldador_${selectData._id}" value="${selectData.cantidad.soldador.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.soldador.img}" alt="Imagen Soldador" style="max-width: 70px;">
    <button id="btnActualizarSoldador_${selectData._id}">Actualizar Soldador</button>
  </div>
</div>

<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
  <p style="margin: 5px;"><b>Datos Pulido</b></p>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Cantidad Pulido:</b>
    <input type="number" min="0" id="inputCantidadPulido_${selectData._id}" value="${selectData.cantidad.pulido.cantidad}" style="width: 70px;">
  </div>

  <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
    <b style="min-width: 130px;">Stock Deseado Pulido:</b>
    <input type="number" min="0" id="inputStockDeseadoPulido_${selectData._id}" value="${selectData.cantidad.pulido.stock_deseado}" style="width: 70px;">
  </div>

  <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
    <img src="${selectData.cantidad.pulido.img}" alt="Imagen Pulido" style="max-width: 70px;">
    <button id="btnActualizarPulido_${selectData._id}">Actualizar Pulido</button>
  </div>
</div>


      </div>
    `;
  }


  function crearContenedorInox330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorInoxECO(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorInox250(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorInox300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPintada330(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }
  function crearContenedorPintada300(selectData) {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

        <div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px;">
            <p style="margin-bottom: 10px;"><b>Datos Terminado</b></p>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Cantidad Terminado:</b>
                <input type="number" min=0 id="inputCantidadTerminado_${selectData._id}" value="${selectData.cantidad.terminado.cantidad}" style="width: 70px;">
            </div>
        
            <div style="margin-bottom: 5px; display: flex; flex-direction: row; align-items: center; gap: 10px;">
                <b style="min-width: 130px;">Stock Deseado Terminado:</b>
                <input type="number" min=0 id="inputStockDeseadoTerminado_${selectData._id}" value="${selectData.cantidad.terminado.stock_deseado}" style="width: 70px;">
            </div>
        
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                <img src="${selectData.cantidad.terminado.img}" alt="Imagen Aro Terminado" style="max-width: 70px;">
                <button id="btnActualizarTerminado_${selectData._id}">Actualizar Terminado</button>
            </div>
        </div>
      </div>
    `;
  }


  //////////////////////////////////////////////////////////

  function abrirVentana() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '300px';
    modal.style.padding = '25px';
    modal.style.backgroundColor = '#2c3e50';
    modal.style.border = '2px solid #34495e';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    modal.style.zIndex = '1000';
    modal.style.textAlign = 'center';
    modal.style.color = '#ecf0f1';
    modal.style.fontFamily = 'Arial, sans-serif';

    // Contenido del modal con tres botones
    modal.innerHTML = `
      <h3 style="margin-top: 0; margin-bottom: 20px; color: #f1c40f;">Descargar Historiales</h3>
      
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button id="descargarBtnAgregar" style="
          padding: 10px 15px; 
          background: #27ae60;
          color: white; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        ">
          Historial Agregar
        </button>
        
        <button id="descargarBtnMecanizado" style="
          padding: 10px 15px; 
          background: #2980b9;
          color: white; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        ">
          Historial Mecanizado
        </button>
        
        <button id="descargarBtnProvedores" style="
          padding: 10px 15px; 
          background: #8e44ad;
          color: white; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        ">
          Historial Proveedores
        </button>

        <button id="descargarBtnPedidos" style="
          padding: 10px 15px; 
          background: #007BFF;
          color: white; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
        ">
          Historial Pedidos
        </button>
      </div>
      
      <br>
      <button onclick="this.parentElement.remove()" style="
        padding: 8px 15px; 
        margin-top: 15px;
        background: #e74c3c;
        color: white; 
        border: none; 
        border-radius: 5px; 
        cursor: pointer;
        transition: all 0.3s;
      ">
        Cerrar
      </button>
    `;

    // Efectos hover para los botones
    const buttons = modal.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.onmouseenter = () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        };
        btn.onmouseleave = () => {
            btn.style.transform = 'none';
            btn.style.boxShadow = 'none';
        };
    });

    // Evento para el botón de Historial Agregar
    modal.querySelector('#descargarBtnAgregar').onclick = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/historiales/descargar/txt');
        if (!response.ok) throw new Error('Error al descargar');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'stock_cargaIncial.txt';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    // Evento para el botón de Historial Proveedores
    modal.querySelector('#descargarBtnProvedores').onclick = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/descargar/historial/provedores');
        
        if (!response.ok) {
          throw new Error('Error al descargar el archivo');
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'historialProvedores.txt';
        link.click();
        URL.revokeObjectURL(url);
        
      } catch (error) {
        alert('Error al descargar: ' + error.message);
      }
    };

    modal.querySelector('#descargarBtnMecanizado').onclick = async () => {
      try {
          const response = await fetch('http://localhost:5000/guardar/descargar/historial/mecanizado');
          
          if (!response.ok) {
              throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          
          // Crear blob y descargar
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'historial_mecanizados.txt'; 
          document.body.appendChild(a);
          a.click();
          
          // Limpieza
          setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
          }, 100);
          
      } catch (error) {
          console.error('Error:', error);
          alert('Error al descargar: ' + error.message);
      }
  };

  modal.querySelector('#descargarBtnPedidos').onclick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pedidosMarcelo/descargar/pedidos');
      if (!response.ok) throw new Error('Error al descargar');
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pedidos.txt'; // Nombre del archivo descargado
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

    // Evento para el botón de Historial Mecanizado - Versión definitiva


    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);
}

  function crearBotonesDeFiltro() {
    const filtros = ["Aluminio", "Chapa", "Shop", "Plastico", "Hierro", "all"];
    const contenedor = document.getElementById("filtros");
    contenedor.innerHTML = "";

    filtros.forEach((tipo) => {
      const btn = document.createElement("button");
      btn.textContent = tipo;
      btn.style.padding = "5px 10px";
      btn.style.margin = "5px";
      btn.style.cursor = "pointer";
      btn.style.borderRadius = "6px";

      btn.addEventListener("click", () => {
        if (tipo === "all") {
          tabla.setData(datosPiezas);
        } else {
          const filtradas = datosPiezas.filter((p) => p.tipo_material === tipo);
          tabla.setData(filtradas);
        }
      });

      contenedor.appendChild(btn);
    });
  }

  document
    .getElementById("btnMostrarTabla")
    .addEventListener("click", cargarPiezasDesdeServidor);

  cargarPiezasDesdeServidor()

  document.getElementById("Abrirventana").addEventListener('click', abrirVentana)


}


module.exports = { panel };
