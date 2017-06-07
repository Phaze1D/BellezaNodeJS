
module.exports = {
  uploadS3: function (body, name) {
    return {
      ACL: 'public-read',
      Body: body,
      Bucket: 'belleza-node',
      CacheControl: 'public, max-age=3153600',
      ContentType: 'image/jpeg',
      Key: name,
    }
  }
}
