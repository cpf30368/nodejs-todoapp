var data = [{item: 'eat sushi'}];

module.exports = function(app){

//Render a view when user makes request
app.get('/todo', function(req, res){
	res.render('todo', {todos: data});
});

app.post('/todo', function(req, res){

});

app.delete('/todo', function(req, res){

});
};