const pg = require("pg")
const connectionString = "pg://postgres:Root.2020@localhost:5432/BarberShop";
const client = new pg.Client(connectionString);
client.connect();

client.query('Select fio_sotrudnik from employees', (err,res)=>{
  console.log(err, res)
  client.end()
})