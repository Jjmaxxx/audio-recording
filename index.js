const express = require('express');
const app = express();
const port = 3000;

app.set('view-engine', 'pug');
app.use(express.static("public"));
app.listen(port, ()=>{
    console.log("app started");
})
app.get('/', (request,response)=>{
    response.render('index.pug');
})
