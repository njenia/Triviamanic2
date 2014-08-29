function loadModels(mongoose) {
    console.log('Starting to load models');
    rekuire('Quiz').defineQuiz(mongoose);
    console.log('Finished loading models');
}

module.exports.loadModels = loadModels;