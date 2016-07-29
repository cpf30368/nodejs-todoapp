module.exports = function(app){

//Render a view when user makes request
app.get('/todo', function(req, res){
	res.render('todo');
});

app.post('/todo', function(req, res){


});

app.delete('/todo', function(req, res){


});
};