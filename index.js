const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const PORT = process.env.PORT || 3050;

 
const app = express();
const expressJson = express.json(); 
const bodyParser  = express.urlencoded({extended: true});

//Headers
app.use(express.urlencoded({extended:true, limit: "50mb"}));
app.use(express.json());
app.use(morgan('dev'))


app.use([expressJson, bodyParser])


//Rutas
app.get('/', (req, res) => {
    res.send('wellcome to my api')
});

app.get("/cards", async(req, res) => {
    try{
    const cards = await axios.get('https://proxy.royaleapi.dev/v1/cards', {
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + API_KEY}
    });
  
    res.send(cards.data)
} catch (error) {
    console.log(error);
}
}
)

//control de errores



//Servidor
app.listen(PORT, () => 
console.log(`Servidor corriendo en el puerto ${PORT}`));


