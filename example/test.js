var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var sd = require('silly-datetime');
var path = require('path');

var app = express();

app.use('/', express.static('./'));

// app.post('/haha',function(req,res) {
//     console.log(req)
// })


app.post('/postVideo', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "../video/";

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err
        }

        // 时间、随机数、拓展名
        var timestr = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 8999 + 1000);
        var extname = path.extname(files.fileVideo.name);

        // 改名
        var oldpath = __dirname + '/' + files.fileVideo.path;
        var newpath = __dirname + '/../video/' + timestr + ran + extname;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
            // res.writeHead(200, {
            //     'content-type': 'text/plain'
            // });
            // console.log(util.inspect({fields: fields, files: files}))
            // res.send(util.inspect({
            //     fields: fields,
            //     files: files
            // }));
            res.send('success')
        })

    });

})


app.listen(3000, '172.16.33.116')