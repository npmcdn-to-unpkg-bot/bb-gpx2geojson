'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('gpx-to-geojson service', function() {
  it('registered the gpx-to-geojsons service', () => {
    assert.ok(app.service('gpx-to-geojsons'));
  });
});
