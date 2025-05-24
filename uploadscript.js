window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const shoinId = document.getElementById('shoin_id').value.trim();
    const seiriNo = document.getElementById('seiri_no').value.trim();
    const meisaishoFile = document.getElementById('meisai_file').files[0];
    const zumenFile = document.getElementById('zumen_file').files[0];

    if (!shoinId || !seiriNo || !meisaishoFile) {
      alert('❗ 必須項目（所員ID・整理番号・明細書ファイル）をすべて入力してください。');
      return;
    }

    const formData = new FormData();
    formData.append('shoin_id', shoinId);
    formData.append('seiri_no', seiriNo);
    formData.append('meisai', meisaishoFile);
    if (zumenFile) formData.append('zumen', zumenFile);
    formData.append('date', new Date().toISOString().slice(0, 10));

    try {
      const response = await fetch('https://hook.us2.make.com/7ya79qm3ttvxoq6taks4wvto37hrcfjb', {
        method: 'POST',
        body: formData
      });

      const resultText = await response.text();

      if (response.ok) {
        window.location.href = "https://kurosepat.github.io/spec-check-ver4/result.html?result=" + encodeURIComponent(resultText);
      } else {
        alert('❌ エラーが発生しました（Make側）:\n' + resultText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
      alert('⚠️ ネットワークエラーが発生しました。再度お試しください。');
    }
  });
});