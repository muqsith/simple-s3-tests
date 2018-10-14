const fs = require('fs');

const S3 = require('aws-sdk/clients/s3');


const BUCKET_NAME = 'wkdevtest';

const s3 = new S3({
    endpoint: 'https://s3.ap-south-1.amazonaws.com'
});

const params = {
    Bucket: BUCKET_NAME, 
    Expression: `SELECT * FROM S3Object s WHERE s.id = '1'`,
    ExpressionType: 'SQL',
    InputSerialization: {
        JSON: {
            Type: 'DOCUMENT'
        }
    },
    Key: '2',
    OutputSerialization: {
        JSON: {
            RecordDelimiter: '\n'
        }
    }
};

s3.selectObjectContent(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});