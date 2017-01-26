var selenium = require('selenium-standalone');

var drivers = {
    chrome: {
        // check for more recent versions of chrome driver here:
        // https://chromedriver.storage.googleapis.com/index.html
        version: '2.27',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    ie: {
        // check for more recent versions of internet explorer driver here:
        // https://selenium-release.storage.googleapis.com/index.html
        version: '2.53.1',
        arch: process.arch,
        baseURL: 'https://selenium-release.storage.googleapis.com'
    }
};

selenium.install({
    // check for more recent versions of selenium here:
    // https://selenium-release.storage.googleapis.com/index.html
    version: '2.53.1',
    baseURL: 'https://selenium-release.storage.googleapis.com',
    drivers,
    logger: function(message) {
        console.log(`LOG: ${message}`);
    },
    progressCb: function(totalLength, progressLength, chunkLength) {
        console.log(
            `Progress: totalLength=${totalLength}, progressLength=${progressLength}, chunkLength=${chunkLength}`
        );
    }
}, () => {
    console.log('Finished!');
    selenium.start({ drivers }, function(err, child) {
        if (err) {
            return console.error(err);
        }
        child.stderr.on('data', function(data) {
            console.log(data.toString());
        });
    });
});
