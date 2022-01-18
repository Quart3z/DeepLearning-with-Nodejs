const tf = require('@tensorflow/tfjs-node')
const fs = require('fs');
const { normalize } = require('path');
const nn = require('./neuralNetowrk.js');

async function getModel(path) {

    model = await tf.loadLayersModel(path)

    return model;
};

function train(x, c, action) {

    // load trained model 
    const modelPath = "./model/prediction-model/model.json";

    // load data from csv
    const trainingData = tf.data.csv("file://./sample.csv", {
        columnConfigs: {
            y: {
                isLabel: true
            }
        }
    })

    const convertedData = trainingData.map(({
        xs,
        ys
    }) => {
        return {
            xs: Object.values(xs),
            ys: Object.values(ys)
        };
    }).batch(2)


    if (action == "predict") {
        console.log("exists")

        return getModel("file://" + modelPath).then(function (model) {

            var result = model.predict(tf.tensor([
                [parseFloat(x), parseFloat(c)]
            ]), [1, 2]); 

            return result.dataSync()[0];
        });

    } else {

        model = nn.neural_network(2, 1)

        return model.fitDataset(convertedData, {
            shuffle: true,
            epochs: 10,

        }).then(function () {
            var result = model.predict(tf.tensor([
                [parseFloat(x), parseFloat(c)]
            ]), [1, 2]); 

            model.save("file://./model/prediction-model");
            return result.dataSync()[0];

        })
        // }

    }
}
module.exports.train = train