var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var should = chai.should();
chai.use(sinonChai);
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var dom = new JSDOM('<!doctype html><html><body><div id="chart-container"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;
var $ = require('jquery');
require('../../src/js/jquery.orgchart');

describe('orgchart -- integration tests', function () {

  var $container = $('#chart-container'),
  ds = {
    'id': 'n1',
    'name': 'Lao Lao',
    'children': [
      { 'id': 'n2', 'name': 'Bo Miao' },
      { 'id': 'n3', 'name': 'Su Miao' }
    ]
  },
  fragment = '<div class="orgchart"><table><tr><td colspan="4"><div id="n1" class="node">' +
    '<div class="title"><i class="fa fa-users symbol"></i>Lao Lao</div><i class="edge verticalEdge bottomEdge fa"></i></div>' +
    '</td></tr><tr class="lines"><td colspan="4"><div class="downLine"></div></td></tr>' +
    '<tr class="lines"><td class="rightLine"></td><td class="leftLine topLine"></td>' +
    '<td class="rightLine topLine"></td><td class="leftLine"></td></tr><tr class="nodes"><td colspan="2"><table><tr><td>' +
    '<div id="n2" data-parent="n1" class="node"><div class="title">Bo Miao</div><i class="edge verticalEdge topEdge fa"></i>' +
    '<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i></div></td></tr></table></td>' +
    '<td colspan="2"><table><tr><td><div id="n3" data-parent="n1" class="node"><div class="title">Su Miao</div>' +
    '<i class="edge verticalEdge topEdge fa"></i><i class="edge horizontalEdge rightEdge fa"></i>' +
    '<i class="edge horizontalEdge leftEdge fa"></i></div></td></tr></table></td></tr></table></div>',
  oc = {},
  server;

  // before(function () {
  //   server = sinon.fakeServer.create();
  // });

  // after(function () {
  //   server.restore();
  // });
    
  afterEach(function () {
    $laolao = $bomiao = $sumiao = null;
    $container.empty();
  });

  describe('init()', function () {
    it('initialize chart with json datasource', function () {
      oc = $container.orgchart({
        'data': ds
      });
      $container.html().should.equal(fragment);
    });

    it('initialize chart with <ul> datasource', function () {
      var $ul = $(
        '<ul id="ul-data">' +
          '<li data-id="n1">Lao Lao' +
            '<ul>' +
              '<li data-id="n2">Bo Miao</li>' +
              '<li data-id="n3">Su Miao</li>' +
              '</ul>' +
          '</li>' +
        '</ul>'
      );
      $('body').append($ul);
      oc = $container.orgchart({
        'data': $('#ul-data')
      });
      $container.html().should.equal(fragment);
      $ul.remove();
    });

    // it('calls callback with deserialized data', function () {
    //   server.respondWith('/aa/bb', [ 200, { "Content-Type": "application/json" }, JSON.stringify([ds]) ]);
    //   oc = $container.orgchart({
    //     'data': '/aa/bb'
    //   });
    //   server.respond();
    //   $container.html().should.equal(fragment);
    // });

    it('initialize chart with default className', function () {
      oc = $container.orgchart({
        'data': ds,
        'chartClass': 'demo'
      });
      oc.$chart.is('.demo').should.be.true;
    });

    it('initialize chart with export button', function () {
      oc = $container.orgchart({
        'data': ds,
        'exportButton': true
      });
      $container.children('button').prop('outerHTML').should.equal('<button class="oc-export-btn">Export</button>');
    });

    it('initialize chart with "bottom to top" direction', function () {
      oc = $container.orgchart({
        'data': ds,
        'direction': 'b2t'
      });
      oc.$chart.is('.b2t').should.be.true;
    });
  });

});