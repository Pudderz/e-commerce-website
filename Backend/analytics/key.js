function checkKeyFile(){
    if (!fs.existsSync("../key.json")) {
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
 
     fs.writeFileSync("key.json", data);
   } 
 }
 
 
 module.exports = { checkKeyFile };
 