//********************************* */
// Puerto
//********************************* */

process.env.PORT = process.env.PORT || 3000;


//********************************* */
// Entorno
//********************************* */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//********************************* */
// Vencimiento del token
//********************************* */
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60*60*24*30;

//********************************* */
// SEED de autenticacion
//********************************* */
process.env.SEED_TOKEN = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//********************************* */
// DB
//********************************* */
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB='mongodb://localhost:27017/cafe'
}else{
    urlDB=process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//********************************* */
// Google client id
//********************************* */
process.env.CLIENT_ID = process.env.CLIENT_ID || '991859409430-niet61vms54s049pb6p3pna0mrto40l7.apps.googleusercontent.com';