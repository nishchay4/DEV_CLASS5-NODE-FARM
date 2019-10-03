var http = require("http");
var fs = require("fs");
var url = require("url");
var modifyOverview=require("./modifyOverview");
var file = JSON.parse(fs.readFileSync("data.json"));

var productpage = fs.readFileSync("product.html");



// console.log(typeof productpage);
// console.log(productpage+" ");

//creating server object

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);  // true to convert the query parameter to object too
    //Routing
    console.log(parsedUrl);

    if (req.url == "/" || parsedUrl.pathname == "/Overview") {
        var overviewPage=fs.readFileSync("overview.html")+"";
        var ovpage=modifyOverview(file);
        overviewPage=overviewPage.replace(/{cardBox}/g,ovpage);
        res.write(overviewPage);
        
    } else if (req.url == "/api") {
        res.write("Response from Node module");
    } else if (parsedUrl.pathname == "/Product") { //pathname property of url contains /Product
        // res.write("Product Page");
        res.writeHead(200,{"Content-type":"text/html"})//status code 200 means success

        var parsedUrl = url.parse(req.url, true);  // true to convert the query parameter to object too
        console.log(parsedUrl);
        var productpage =""+ fs.readFileSync("./product.html");
        productpage = productpage.replace(/{ProductName}/g, file[parsedUrl.query.id].productName);
        productpage = productpage.replace(/{From}/g, file[parsedUrl.query.id].from);
        productpage = productpage.replace(/{Quantity}/g, file[parsedUrl.query.id].quantity);
        productpage = productpage.replace(/{Price}/g, file[parsedUrl.query.id].price);
        productpage = productpage.replace(/{Nutrients}/g, file[parsedUrl.query.id].nutrients);
        productpage = productpage.replace(/{Description}/g, file[parsedUrl.query.id].description);
        productpage = productpage.replace(/{image}/g, file[parsedUrl.query.id].image);
        res.write(productpage);
    } else {
        res.write("Error 404:Page not found");
    }
    res.end();
});

var port=process.env.PORT||3000;
server.listen(port, function () {
    console.log("Server is listening at port no 3000");
});