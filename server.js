const express = require("express");
const cors = require("cors");

const app = express();

const sa = require('superagent');

// const corsOptions = {
//     origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req,res) => {
    res.json({ message: "Base route active"});
});

app.get("/test", (req,res) => {
    getAppDetails().then((response)=>{
        res.json({ message: "test successful"});
    })
    
});


require("./app/routes/orders.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/items.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


function getAppDetails() {
	return new Promise((resolve, reject) => {
        sa.get("htpps://likita.org/api/v1/teleconsult/appointment/5")
        .then((res) => {
            console.log('appointment response string ' + JSON.stringify(res.body));
            resolve(res.body);
        })
        .catch((error) => {
            console.log('error getting appointment details ' + error);
            reject(error);
        });
    })
}