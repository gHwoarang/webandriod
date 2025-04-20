const express = require('express');
const cors = require('cors');
const { Client } = require('pg');  // PostgreSQL bağlantısı için 'pg' modülünü kullanıyoruz
const app = express();

const port = 5000;
// PostgreSQL veritabanı bağlantısı
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kayitdb',
  password: '',  // PostgreSQL şifrenizi buraya yazmalısınız
  port: 5432
});

client.connect();

// CORS ayarları
app.use(cors());
app.use(express.json());

// POST isteği ile gelen veriyi alıp veritabanına kaydediyoruz
app.post('/api/kayit', (req, res) => {
  const { name, email } = req.body;

  // SQL sorgusu ile veriyi kaydet
  const query = 'INSERT INTO kayitlar (name, email) VALUES ($1, $2)';
  const values = [name, email];

  client.query(query, values)
    .then(result => {
      res.json({ message: 'Kayıt başarılı!' });
    })
    .catch(err => {
      console.error('Veritabanı hatası:', err);
      res.status(500).json({ message: 'Veritabanı hatası!' });
    });
});

// Sunucu çalıştırma
app.listen(port, '0.0.0.0', () => {  // '0.0.0.0' ile sunucu, tüm yerel ağdan erişilebilir olacak
  console.log(`✅ Sunucu çalışıyor: http://0.0.0.0:${port}`);
});
