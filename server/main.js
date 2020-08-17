const express = require("express")
const bodyParser = require("body-parser")
var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require("fs")
const app = express();
app.use(busboy());
app.use(express.static("public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
)

app.route('/save')
    .post(function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            var filePath = __dirname + "/saves/save" + Date().toLocaleString().replace(/ /gi, '_').replace(/:/gi, '.').replace(/\//gi,'-') + ".zip"
            fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
                fs.copyFile(filePath, __dirname + "/lastSave.zip",()=>console.log("done"))
            });
        });
    })

app.get("/dl",(req,res)=>{
    console.log("req")
    try{
        res.download(__dirname + "/lastSave.zip")
    }catch{
        console.log("erreur lors du download")
    }
})



app.post("/gitChange",(req,res)=>{

})

app.listen("7412",()=>console.log("listening"))