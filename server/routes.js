var Quiz = rekuire('Quiz').Quiz;

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

app.get('*', function (req, res) {
    res.sendfile('../public/index.html');
});