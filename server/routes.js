var Quiz = rekuire('Quiz');
var path = rekuire('path');

app.get('/api/quizzes', function (req, res) {
    Quiz.find(function (err, quizzes) {
        if (err) {
            res.send(err);
        }

        res.json(quizzes);
    });
});

app.post('/api/quizzes', function (req, res) {
    console.log('post request body: ' + req.body);
    Quiz.create({
        text: req.body.text
    }, function (err, quiz) {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
});

app.get('/', function (req, res) {
    console.log('global route');
    res.sendfile(path.resolve('../public/index.html'));
});