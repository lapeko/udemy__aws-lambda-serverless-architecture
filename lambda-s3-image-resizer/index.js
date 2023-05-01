const AWS = require('aws-sdk');
const sharp = require('sharp');
const S3 = new AWS.S3();

exports.handler = async (event) => {
    const promises = event.Records.map(async ({s3}) => {
        const {object: {key}, bucket: {name}} = s3;
        const s3Object = await S3.getObject({Bucket: name, Key: key}).promise();
        const resizedImg = await sharp(s3Object.Body).resize(150).toBuffer();
        await S3.upload({
            Bucket: `${name}-dist`,
            Key: key,
            Body: resizedImg,
        }).promise();
    });
    await Promise.all(promises);
    return 'Ok';
};
