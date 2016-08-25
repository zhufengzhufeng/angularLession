var express =require('express');
var app = express();
app.listen(8080);
var books = [
    {name:'nodejs',price:20,count:1,id:1},
    {name:'vuejs',price:20,count:1,id:2},
    {name:'angular',price:20,count:1,id:3},
    {name:'react',price:20,count:1,id:4},
];
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(__dirname));

app.get('/',function (req,res) {
    res.sendFile('./bookstore.html',{root:__dirname});
});
app.get('/book',function (req,res) {
    res.send(books);
})
app.delete('/book/:id',function (req,res) {
   var id = req.params.id;
    books = books.filter(function (item) {
        return item.id != id;
    });
    res.send({'success':'成功'});//成功后继续查询
})

app.put('/book/:id',function (req,res) {
    var id = req.params.id;
    var book = req.body.data;
    books = books.map(function (item) {
        if(item.id == id){
            return book;
        }else{
            return item
        }
    });
    console.log(books);
    res.send({success:'修改成功'});
})
