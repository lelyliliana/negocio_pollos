function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  // Calcular la diferencia en milisegundos
  let diferenciaMs = hoy - nacimiento; 

  // Calcular las semanas, con 604800000 milisegundos por semana
  let semanas = Math.floor(diferenciaMs / 604800000); 

  return `${semanas} semanas`; 
}

// ... (resto del código)

// Función para cargar y mostrar los pollos registrados
async function cargarPollos() {
  try {
    const response = await fetch('http://localhost:3000/pollos/todos');
    const pollos = await response.json();

    const tablaPollos = document.getElementById('tablaPollos');
    tablaPollos.innerHTML = `
        <tr>
            <th>Peso</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
            <th>Raza</th>
            <th>Estado de Salud</th>
            <th>Acciones</th> 
        </tr>
    `;

    pollos.forEach(pollo => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${pollo.peso}</td>
          <td>${calcularEdad(pollo.fecha_nacimiento)}</td>
          <td>${new Date(pollo.fecha_nacimiento).toLocaleDateString()}</td>
          <td>${pollo.raza}</td>
          <td>${pollo.estado_salud}</td>
          <td><button class="eliminarPollo" data-id="${pollo._id}">Eliminar</button></td> 
      `;
      tablaPollos.appendChild(fila);
    });

    // Agregar event listeners a los botones "Eliminar"
    const botonesEliminar = document.querySelectorAll('.eliminarPollo');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', eliminarPollo);
    });
  } catch (error) {
    console.error('Error al cargar los pollos:', error);
  }
}

// Función para eliminar un pollo
async function eliminarPollo(event) {
  const polloId = event.target.dataset.id;

  try {
    const response = await fetch(`/pollos/${polloId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Actualizar la tabla de pollos después de eliminar
      cargarPollos();
    } else {
      console.error('Error al eliminar el pollo:', response.status);
      // Mostrar un mensaje de error al usuario
    }
  } catch (error) {
    console.error('Error al eliminar el pollo:', error);
    // Mostrar un mensaje de error al usuario
  }
}

// Función para cargar y mostrar las ventas registradas
async function cargarVentas() {
  try {
      const response = await fetch('http://localhost:3000/ventas');
      const ventas = await response.json();

      const tablaVentas = document.getElementById('tablaVentas');
      tablaVentas.innerHTML = `
          <tr>
              <th>Cliente</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
              <th>Fecha de Venta</th>
          </tr>
          ${ventas.map(venta => ` 
              <tr>
                  <td>${venta.cliente}</td>
                  <td>${venta.cantidad}</td>
                  <td>${venta.precio_total}</td>
                  <td>${new Date(venta.fecha_venta).toLocaleDateString()}</td>
              </tr>
          `).join('')} 
      `; 

  } catch (error) {
      console.error('Error al cargar las ventas:', error);
  }
}

async function registrarVenta(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe de forma normal

  const cliente = document.getElementById('cliente').value;
  const cantidad = document.getElementById('cantidad').value;
  const precio_total = document.getElementById('precio_total').value;

  try {
    const response = await fetch('/ventas/nueva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cliente, cantidad, precio_total }),
    });

    if (response.ok) {
      // Actualizar la tabla de ventas
      cargarVentas(); 
    } else {
      console.error('Error al registrar la venta:', response.status);
      // Mostrar un mensaje de error al usuario
    }
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    // Mostrar un mensaje de error al usuario
  }
}

// Llamar a las funciones de carga al abrir la página
document.addEventListener('DOMContentLoaded', () => {
  cargarPollos();
  cargarVentas(); 
});