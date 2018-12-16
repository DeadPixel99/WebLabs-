try {
    require("express");
} catch (e) {
    console.log('App requires express framework. Please use "npm install" or "npm install express" in project root');
    process.exit(-1);
}

const express = require("express");
const app     = express();
const path    = require("path");

const clocks = [];


app.get('/',function(req,res){
    res.sendFile(path.resolve('./lab2.html'));

});

app.get('/api', function (req, res) {
    if(req.query['task']) {
        console.log(`Task: ${req.query['task']}, Time: ${req.query['time']}`);
        switch (req.query['task']) {
            case 'addclock': { if(clocks.indexOf(req.query['time']) == -1)clocks.push(req.query['time']); break; }
            case 'rmclock': { clocks.splice(clocks.indexOf(req.query['time']), 1); break; }
            case 'clientInit' : {
                console.log('Sending clocks to client...');
                res.write(clocks.join(';'));
                res.end();
            }
        }
    }
    outClocks();
    res.end();
});


app.listen(1337);

function outClocks() {
    console.log('Current clocks:');
    clocks.forEach(e=>{
        let data = e.split(',');
        console.log('* ' + `Hours: ${data[0]}, Minutes: ${data[1]}, Year: ${data[2]}, Month: ${data[3]}, Day: ${data[4]}`);
    })
}


console.log("Running at localhost:1337");