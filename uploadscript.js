window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("today-date").value = new Date().toISOString().split('T')[0];

  setupDropZone('docxZone', 'meisai_file', 'docx-name', 'remove-docx', 'docx-display');
  setupDropZone('pdfZone', 'zumen_file', 'pdf-name', 'remove-pdf', 'pdf-display');
});

function setupDropZone(zoneId, inputId, nameId, removeId, displayId) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  const name = document.getElementById(nameId);
  const remove = document.getElementById(removeId);
  const display = document.getElementById(displayId);
  const placeholder = zone.querySelector('.placeholder');

  function updateDisplay() {
    if (input.files.length > 0) {
      name.textContent = input.files[0].name;
      display.style.display = 'flex';
      placeholder.style.display = 'none';
    } else {
      display.style.display = 'none';
      placeholder.style.display = 'block';
    }
  }

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.backgroundColor = '#444';
  });
  zone.addEventListener('dragleave', () => {
    zone.style.backgroundColor = '#333';
  });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.style.backgroundColor = '#333';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      input.files = dt.files;
    }
    updateDisplay();
  });

  input.addEventListener('change', updateDisplay);
  remove.addEventListener('click', () => {
    input.value = '';
    updateDisplay();
  });
}

// ✅ メイン関数（クリック時に呼び出される）
function startAnalysis() {
  const shoinId = document.getElementById('shoin_id').value.trim();
  const seiriNo = document.getElementById('seiri_no').value.trim();
  const meisaishoFile = document.getElementById('meisai_file').files[0];
  const zumenFile = document.getElementById('zumen_file').files[0];
  const date = new Date().toISOString().slice(0, 10);

  if (!shoinId || !seiriNo || !meisaishoFile) {
    alert('❗ 必須項目（所員ID・整理番号・明細書ファイル）をすべて入力してください。');
    return;
  }

  const query = new URLSearchParams();
  query.append("shoin_id", shoinId);
  query.append("seiri_no", seiriNo);
  query.append("date", date);

  // ⚠️ ファイルは直接渡せないので、result.html で再アップロードが必要（または中継サーバーで一時保存）

  location.href = "result.html?" + query.toString();
}
