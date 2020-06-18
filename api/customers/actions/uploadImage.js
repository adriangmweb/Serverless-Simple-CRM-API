const aws = require('aws-sdk')
const { bucketName } = require('../../../config')

module.exports = async (streamData, filePath, contentType) => {
  const s3 = new aws.S3()

  return s3.upload({
    Bucket: bucketName,
    Key: filePath,
    Body: streamData,
    ContentType: contentType,
    ACL: 'public-read'
  }).promise()
}