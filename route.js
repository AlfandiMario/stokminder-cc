const express = require('express'); 
  
const app = express(); 
const PORT = 3000; 
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) ;
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 

app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

app.get('/addItems', (req, res)=>{ 
    res.status(200); 
    res.send("Route untuk menambah inventory"); 
}); 

app.get('/recapSales', (req, res)=>{ 
    res.status(200); 
    res.send("Route untuk mengurangi inventory atau menambah penjualan"); 
}); 

app.get('/predict', (req, res)=>{ 
    res.status(200); 
    res.send("Route untuk mengarahkan ke model ML"); 
}); 