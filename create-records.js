const fs = require('fs-extra');
const Promise = require('bluebird');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    endpoint: 'https://s3.ap-south-1.amazonaws.com'
});

const config = require('./load-config.js');

const BUCKET_NAME = 'wkdevtest';

const getParams = (dataObject) => {
    return ({
        Bucket: BUCKET_NAME, 
        Key: JSON.stringify(dataObject.id),
        Body: JSON.stringify(dataObject)
    });
}

const uploadObject = (dataObject) => {
    return new Promise((resolve, reject) => {
        s3.putObject(getParams(dataObject), (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const createRecords = () => {
    return fs.readJson(config.dataFile)
    .then((records) => {
        return Promise.each(records, (record) => {
            return uploadObject(record);
        });
    })
    .then(() => {
        console.log('All records uploaded');
    });
}

createRecords().then(Function.prototype);


