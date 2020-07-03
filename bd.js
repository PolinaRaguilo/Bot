const pg = require("pg")
const connectionString = "YOUR URL";
const client = new pg.Client(connectionString);
client.connect();

client.query('Select fio_sotrudnik from employees', (err,res)=>{
  console.log(err, res)
  client.end()
})
