var admin = require("firebase-admin");
// const tinyurl = require('tinyurl');
var serviceAccount = require("../config/firebase_key.json");

const BUCKET_URL = "biskato-557d0.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const bucket = admin.storage().bucket();

const uploadFile = (req, res, next) => {
  if (!req.file) return next();

  const file = req.file;
  const nameFile = Date.now() + "." + file.originalname.split(".").pop();

  const file_bucket = bucket.file(nameFile);

  const stream = file_bucket.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error("error in firebase.js : ", e);
  });

  stream.on("finish", async () => {
    // tornar o arquivo publico
    await file_bucket.makePublic();

    // obter a url publico do arquivo
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`;
    next();
  });

  stream.end(file.buffer);
};

// const uploadArrayFiles = (req, res, next) => {
//   if (!req.files) return next();

//   // req.files é um array de objetos, cada um contendo informações sobre um arquivo enviado
//   const urls = [];
//   for (const file of req.files) {
//     const nameFile = Date.now() + "." + file.originalname.split(".").pop();
//     const blob = bucket.file(nameFile);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });
//     blobStream.on('error', (err) => {
//       console.error("error in upload array files firebase.js : ", err);
//     });
//     blobStream.on('finish', async () => {
//       // O arquivo foi enviado para o Firebase Storage, agora vamos criar uma URL pública para ele
//       const publicUrl = await blob.getSignedUrl({ action: 'read', expires: '03-09-2491' });
//       // urls.push(publicUrl[0]);
//       const shortUrl = await tinyurl.shorten(publicUrl[0]);
//       urls.push(shortUrl);
//       if (urls.length === req.files.length) {
//         // res.send(urls);  // Retorne as URLs quando todos os arquivos forem enviados
//         req.files.firebaseUrl = urls
//         console.log(' urls array files : ',  urls);
//         next()
//       }
//     });
//     blobStream.end(file.buffer);
//   }

// };

module.exports = uploadFile;
// module.exports = { uploadFile, uploadArrayFiles };
