import { showHistory } from './history.js';

// Render table with History buttons
export function renderTable(data) {
  const tbody = document.getElementById('data-body');

  tbody.innerHTML = data
    .map(
      item => `
      <tr>
        <td>${item.kodebarang}</td>
        <td>${item.lokasi}</td>
        <td>${new Date(item.updated).toLocaleString()}</td>
        <td><button class="history-btn" onclick="showHistory('${item.kodebarang}')">History</button></td>
      </tr>`
    )
    .join('');
}

// Clear input fields after save
export function clearInputs() {
  document.getElementById('kodebarang').value = "";
  document.getElementById('lokasi').value = "";
}