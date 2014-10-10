var Quiz = rekuire('Quiz');
var Category = rekuire('Category');
var path = rekuire('path');
var express = require('express');

app.use('/public', express.static(__dirname + '/../public'));

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
                categories: {
                    name: req.body.name
                }
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

app.put('/api/quizzes/:id/categories/:categoryId', function (req, res) {
    Quiz.findById(req.param('id'), function (err, quiz) {
        if (err) {
            res.send(err);
        } else {
            var category = quiz.categories.id(req.body._id);
            category.name = req.body.name;
            quiz.save();
            res.send(category);
        }
    });
});

app.all('/*', function (req, res) {
    res.sendfile("index.html", { root: __dirname + "/../public" });
});
