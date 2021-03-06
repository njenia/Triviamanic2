var Quiz = rekuire('Quiz');
var Category = rekuire('Category');
var Question = rekuire('Question');
var path = rekuire('path');
var express = require('express');
var _ = require('lodash');

app.use('/public', express.static(__dirname + '/../public'));

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send(401);
    }
}

app.get('/api/quizzes', isAuthenticated, function (req, res) {
    Quiz.find(function (err, quizzes) {
        if (err) {
            res.send(err);
        }

        res.json(quizzes);
    });
});

app.get('/api/quizzes/:id', function (req, res) {
    var quizQuery = Quiz.findById(req.param('id'));
    if (req.query.withQuestions) {
        quizQuery = quizQuery.populate({
            path: 'categories.questions',
            model: 'Question'
        })
    }
    quizQuery.exec(function (err, quiz) {
        if (err) {
            res.send(err);
        } else {
            res.json(quiz);
        }
    });
});

app.get('/api/questions/:id', function (req, res) {
    Question.findById(req.param('id'), function (err, question) {
        if (err) {
            res.send(err);
        } else {
            res.json(question);
        }
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
                res.json(_.last(quiz.categories));
            }
        });
});

app.put('/api/quizzes/:id/categories/:categoryId', function (req, res) {
    Quiz.findById(req.param('id'))
        .populate({
            path: 'categories.questions',
            model: 'Question'
        })
        .exec(function (err, quiz) {
        if (err) {
            res.send(err);
        } else {
            var category = quiz.categories.id(req.body._id);
            category.name = req.body.name;
            category.questions = req.body.questions;
            category.questions.forEach(function (question) {
                Question.findByIdAndUpdate(question._id, {points: question.points}, function (err, question) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(question);
                    }
                });
            });
            quiz.save();
            res.send(category);
        }
    });
});

app.post('/api/quizzes/:quizId/categories/:categoryId/questions', function (req, res) {
    Question.create(req.body, function (err, question) {
        if (err) {
            res.send(err);
        } else {
            Quiz.findById(req.param('quizId'), function (err, quiz) {
                if (err) {
                    res.send(err);
                } else {
                    var category = quiz.categories.id(req.param('categoryId'));
                    category.questions.push(question);
                    quiz.save();
                    res.send(question);
                }
            });
        }
    });
});

app.post('/api/questions/:questionId/questionImages', function (req, res) {
    Question.findById(req.param('questionId'), function (err, question) {
        if (err) {
            res.send(err);
        } else {
            question.images.push(req.body);
            question.save();
            res.send(req.body);
        }
    });
});

app.all('/*', function (req, res) {
    res.sendfile("index.html", { root: __dirname + "/../public" });
});
