
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイル（html, js, css）を公開
app.use(express.static(path.join(__dirname)));

// 明示的に各ページを返すようにする
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/upload.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

app.get('/result.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'result.html'));
});

app.listen(port, () => {
  console.log(`サーバー起動中：http://localhost:${port}`);
});
