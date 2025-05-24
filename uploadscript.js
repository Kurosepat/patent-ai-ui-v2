document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const shoinId = document.getElementById('shoin_id').value.trim();
  const seiriNo = document.getElementById('seiri_no').value.trim();
  const meisaishoFile = document.getElementById('meisaisho_file').files[0];
  const zumenFile = document.getElementById('zumen_file').files[0];

  if (!shoinId || !seiriNo || !meisaishoFile) {
    alert('必須項目（所員ID・整理番号・明細書ファイル）をすべて入力してください。');
    return;
  }

  const formData = new FormData();
  formData.append('shoin_id', shoinId);
  formData.append('seiri_no', seiriNo);
  formData.append('meisaisho_file', meisaishoFile);
  if (zumenFile) formData.append('zumen_file', zumenFile);
  formData.append('date', new Date().toISOString().slice(0, 10));

  try {
    const response = await fetch('https://hook.us2.make.com/ggm2mlmimmrpnwyz5p21mhhd0dmk29p7', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('アップロードが成功しました。AIチェックを実行中です。');
      document.getElementById('uploadForm').reset();
    } else {
      alert('アップロードに失敗しました。しばらくしてから再試行してください。');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('エラーが発生しました。ネットワーク接続をご確認ください。');
  }
});
