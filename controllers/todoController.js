var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Connect to db
mongoose.connect('mongodb://test:testtest@ds031965.mlab.com:31965/todo');

//Create schema - this is like a blueprint for what MongoDB is going to expect
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});

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

app.delete('/todo/:item', function(req, res){
	data = data.filter(function(todo){
		return todo.item.replace(/ /g, '-') !== req.params.item;
	});
	res.json(data);
});
};