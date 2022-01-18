const tf = require('@tensorflow/tfjs')

function neural_network(nInput, nOutput) {

    const model = tf.sequential();

    model.add(tf.layers.dense({
        name: "hidden_layer_1",
        units: 5,
        inputShape: [nInput],
    }));

    // output layer
    model.add(tf.layers.dense({
        name: "output_layer",
        units: nOutput,
        activation: "relu"
    }));

    // optimizer
    model.compile({
        optimizer: tf.train.sgd(0.001),
        loss: 'meanSquaredError',
        metrics: [tf.metrics.meanAbsoluteError]
    });

    return model;
}

module.exports.neural_network = neural_network