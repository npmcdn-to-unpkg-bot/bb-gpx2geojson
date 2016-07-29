'use strict';

const BlobService = require('feathers-blob');

const dauria = require('dauria');
const feathersBlobStore = require('fs-blob-store');
const hooks = require('./hooks');
const jsdom = require('jsdom').jsdom;
const multer = require('multer');
const toGeoJson = require('togeojson');

const passFileToFeathers = function(req, res, next) {
    req.feathers.file = req.file;
    next();
};

module.exports = function(){
  const app = this;
  const blobStorage = feathersBlobStore(app.get('uploadDir'));
  const blobService = BlobService({Model: blobStorage});
  const multipartMiddleware = multer();

  const convertFile = function (req, res, next) {
    blobService.get(res.data.id, null, function (err, data) {
      const gpxContent = dauria.parseDataURI(data.uri);
      const gpxDom = jsdom(gpxContent.text);
      const geoJson = toGeoJson.gpx(gpxDom);

      res.data = geoJson;
      next();
    });
  }

  app.use('/gpx2geojsons',
    multipartMiddleware.single('uri'),
    passFileToFeathers,
    blobService,
    convertFile);

  const gpx2geojsonService = app.service('/gpx2geojsons');

  gpx2geojsonService.before(hooks.before);
  gpx2geojsonService.after(hooks.after);
};

module.exports.Service = BlobService;
