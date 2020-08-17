const request = require('request');
const fs = require("fs")
var args = process.argv.slice(2);

var savePath = args[args.findIndex(e=>e=="--path")+1]
if(!fs.existsSync(savePath))return

var ordre = args[args.findIndex(e=>e=="--rs")+1]
if( ordre == "recup")
    recup()
else if(ordre == "save")
    save()


function recup(){
    var filePath = savePath + "/save.zip"
    request
    .get('http://77.151.84.172:7412/dl')
    .on('error', (err)=>console.error(err))
    .pipe(fs.createWriteStream(filePath))
    .on("finish",()=>{
        console.log("dl finit")
    })
}

function save(){
    var req = request.post('http://77.151.84.172:7412/save', function (err, resp, body) {
        if (err) {
          console.log('Error!');
        } else {
          console.log('URL: ' + body);
        }
      });
      var form = req.form();
      form.append('file', fs.createReadStream(savePath + "/save.zip"));
}