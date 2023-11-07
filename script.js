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
