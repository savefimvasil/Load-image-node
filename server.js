let Express = require('express');
let multer = require('multer');
let bodyParser = require('body-parser');
let app = Express();
app.use(bodyParser.json());

let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({ storage: Storage }).array("imgUploader", 3);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

let images = []

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        let [file] = req.files
        images.push(file)
        return res.end("File uploaded sucessfully!.");
    });
});

app.get("/api/result", (req, res) => {
    res.send(images);
})

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});
