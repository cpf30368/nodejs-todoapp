var bodyParser = require('body-parser');

var data = [{item: 'eat sushi'}, {item: 'play with Sophie'}, {item: 'stuff'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

//Render a view when user makes request
app.get('/todo', function(req, res){
	res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){
	data.push(req.body);
	res.json(data);
});

app.delete('/todo', function(req, res){

});
};