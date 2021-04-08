const fs = require('fs');
const path = require("path");
function checkKeyFile(){
  console.log('checking file');
    if (!fs.existsSync(path.join(__dirname, "../googleKey.json"))) {
      console.log('file does not exists');
     //create json file for analytics
     let data = {
     "type": "service_account",
     "project_id": "e-commerce-web-project",
     "private_key_id": process.env.GA_PRIVATE_KEY_ID ,
     "private_key": process.env.GA_PRIVATE_KEY,
     "client_email": process.env.GA_CLIENT_EMAIL,
     "client_id": process.env.GA_CLIENT_ID ,
     "auth_uri": process.env.GA_AUTH_URI ,
     "token_uri": process.env.GA_TOKEN_URI ,
     "auth_provider_x509_cert_url": process.env.GA_PROVIDER_CERT,
     "client_x509_cert_url": process.env.GA_CLIENT_CERT_URL,
   }
     data = JSON.stringify(data);
     console.log(data);
     console.log(data.private_key)
    //  replaces all //n with /n in json data without breaking json. This is needed otherwise the private key is not accepted
     data = data.replace(/\\\\n/g,'\\n');
     console.log(data);
  //   console.log('writing file');
      fs.writeFileSync(path.join(__dirname, "../googleKey.json"), data);
   } else{
     console.log('file does exist');
   }
 }
 
 
 module.exports = { checkKeyFile };
 