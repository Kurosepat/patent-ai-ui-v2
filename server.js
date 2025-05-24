const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイル（HTMLやJS）を置いてるフォルダを指定
app.use(express.static(path.join(__dirname)));

// ルートパスにアクセスがあったときに upload.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
