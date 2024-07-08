
// uploadFunction.js
const path = require('path');

const uploadFunction = async (id,files, permitedExtensions = ['jpg', 'png', 'webp']) => {
  if (!files || Object.keys(files).length === 0) {
    return { status: 400, msg: 'No files were uploaded.' };
  }

  const { file1 } = files;
  const cutName = file1.name.split('.');
  const extension = cutName[cutName.length - 1];

  if (!permitedExtensions.includes(extension)) {
    return { status: 400, msg: `The extension ${extension} is not permitted` };
  }

  const newName = `${id}.${extension}`;

  const uploadPath = path.join(__dirname, '..', 'uploads', newName);

  return new Promise((resolve, reject) => {
    file1.mv(uploadPath, (err) => {
      if (err) {
        reject({ status: 400, msg: err.message });
      } else {
        resolve({ newName, extension });
      }
    });
  });
};

module.exports = { uploadFunction };