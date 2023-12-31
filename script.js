/*
Integrantes:
- Johanna Keira Badilla Zavala
- Hania Gutierrez Vargas
- Mauricio Posadas Rodríguez
- Erick Eduardo Ramos Contreras
*/
// Espera a que el contenido de la página se cargue antes de ejecutar el código Javascript
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencia a los elementos del DOM
  const searchInput = document.querySelector('input[name="search"]');
  const searchForm = document.querySelector('form');
  const actionSelect = document.querySelector('select[name="action"]');
  const filterSelect = document.querySelector('select[name="filter"]');
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tbody tr');

  // Función para filtrar por palabra de búsqueda 
  function filterBySearch(searchTerm) {
    rows.forEach(row => {
      const title = row.querySelector('td:nth-child(3)').textContent;
      if(!title.includes(searchTerm)) {
        row.style.display = 'none'; 
      } else {
        row.style.display = '';
      }
    });
  }

  // Función para filtrar por género
  function filterByGenre(genre) {
    rows.forEach(row => {
      const rowGenre = row.querySelector('td:nth-child(6)').textContent;
      if(rowGenre !== genre) {
        row.style.display = 'none';
      } else {
        row.style.display = ''; 
      }
    });
  }


  // Eliminar fila seleccionada  
  function deleteRow(checkbox) {
    const row = checkbox.parentNode.parentNode;
    row.remove();
  }

  // Función para abrir la ventana modal y llenarla con la información del registro
  function openModal(checkbox) {
    // Crear la ventana modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Crear el contenido de la ventana modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    // Obtener la fila y los datos del registro
    const row = checkbox.parentNode.parentNode;
    const data = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
    
 // Llenar la ventana modal con un formulario que contiene los datos del registro
    modalContent.innerHTML = `
      <form id="editForm">
        <label>
          Título
          <input type="text" name="title" value="${data[2]}">
        </label>
        <label>
          Artista
          <input type="text" name="artist" value="${data[3]}">
        </label>
        <label>
          Año
          <input type="text" name="year" value="${data[4]}">
        </label>
        <label>
          Género
          <input type="text" name="genre" value="${data[5]}">
        </label>
        <button type="submit">Actualizar</button>
      </form>`;

    // Agregar la ventana modal al body
    document.body.appendChild(modal);

    // Agregar un listener al formulario para actualizar los datos cuando se envíe
    document.querySelector('#editForm').addEventListener('submit', e => {
      e.preventDefault();

      // Obtener los nuevos datos del formulario
      const title = document.querySelector('input[name="title"]').value;
      const artist = document.querySelector('input[name="artist"]').value;
      const year = document.querySelector('input[name="year"]').value;
      const genre = document.querySelector('input[name="genre"]').value;

      // Verificar si la fila existe antes de intentar acceder a sus elementos
      if (row) {
        // Actualizar los datos en la fila
        row.querySelector('td:nth-child(3)').textContent = title;
        row.querySelector('td:nth-child(4)').textContent = artist;
        row.querySelector('td:nth-child(5)').textContent = year;
        row.querySelector('td:nth-child(6)').textContent = genre;
      }

      // Cerrar la ventana modal
      document.body.removeChild(modal);
    });
  }

  // Agregar listener al formulario para filtrar al enviar
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    filterBySearch(searchTerm);
  });

  // Agregar listener a selects para filtrar
  actionSelect.addEventListener('change', e => {
    const action = e.target.value;
    if(action === '2') { 
      // Eliminar fila seleccionada
      const checked = document.querySelector('input[name="index[]"]:checked');
      if(checked) {
        deleteRow(checked);
      }
    } 
  });

  filterSelect.addEventListener('change', e => {
    const genre = e.target.value;
    filterByGenre(genre);
  });

  // Agregar listeners a los botones de editar para abrir la ventana modal
  Array.from(document.querySelectorAll('button')).forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const row = e.target.parentNode.parentNode.parentNode; // Obtener la fila
      openModal(row); // Pasar la fila al método openModal
    });
  });
});
