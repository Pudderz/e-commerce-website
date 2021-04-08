const { Storage } = require("@google-cloud/storage");

const gc = new Storage({
  keyFilename: path.join(__dirname, "../key.json"),
  projectId: "e-commerce-web-project",
});

// gc.getBuckets().then(x=>console.log(x));
const projectImages = gc.bucket("e-commerce-image-storage-202");

module.exports = { projectImages };
