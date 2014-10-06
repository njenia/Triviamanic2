var Quiz = rekuire('Quiz');
var Category = rekuire('Category');
var path = rekuire('path');

app.get('/api/quizzes', function (req, res) {
    Quiz.find(function (err, quizzes) {
        if (err) {
            res.send(err);
        }

        res.json(quizzes);
    });
});

app.get('/api/quizzes/:id', function (req, res) {
    Quiz.findById(req.param('id'), function (err, quiz) {
        if (err) {
            res.send(err);
        }

        res.json(quiz);
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

app.post('/api/quizzes/:id/categories', function (req, res) {

    Quiz.findByIdAndUpdate(req.param('id'), {
            $push: {
                categories: {}
            }
        },
        {safe: true},
        function (err, quiz) {
            if (err) {
                res.send(err);
            } else {
                res.json(quiz);
            }
        });
});

    app.get('/', function (req, res) {
        console.log('global route');
        res.sendfile(path.resolve('../public/index.html'));
    });