export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };

    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = (base64Data) => {
  const contentType = base64Data.substring(
    base64Data.indexOf(':') + 1,
    base64Data.indexOf(';')
  );
  const byteCharacters = atob(
    base64Data.substring(base64Data.indexOf(',') + 1)
  );
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};
