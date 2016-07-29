'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('gpx2geojson service', function() {
  it('registered the gpx2geojsons service', () => {
    assert.ok(app.service('gpx2geojsons'));
  });
});
