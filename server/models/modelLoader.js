function loadModels(mongoose) {
    console.log('Starting to load models');
    rekuire('User');
    rekuire('Quiz');
    console.log('Finished loading models');
}

module.exports.loadModels = loadModels;