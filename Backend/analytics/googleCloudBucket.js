const { Storage } = require("@google-cloud/storage");
const path = require("path");

const gc = new Storage({
  keyFilename: path.join(__dirname, "../googleKey.json"),
  projectId: "e-commerce-web-project",
});

// gc.getBuckets().then(x=>console.log(x));
const projectImages = gc.bucket("e-commerce-image-storage-202");

module.exports = { projectImages };
