var bodyParser = require('body-parser');
var mongoose = require('mongoose');

console.log('your crap website is now awesome');

//Connect to db
mongoose.connect('mongodb://test:testtest@ds031965.mlab.com:31965/todo');

//Create schema - this is like a blueprint for what MongoDB is going to expect
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'eat sushi'}, {item: 'play with Sophie'}, {item: 'stuff'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

//Render a view when user makes request
app.get('/todo', function(req, res){
	//get data from mongodb and pass it to view
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	});
});

app.post('/todo', urlencodedParser, function(req, res){
	//get data from the view and add it to mongodb
	var newTodo = Todo(req.body).save(function(err,data){
		if (err) throw err;
		res.json(data);
	});
});

app.delete('/todo/:item', function(req, res){
	//delete from mongodb
	Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
		if (err) throw err;
		res.json(data);
	});
	});
};
