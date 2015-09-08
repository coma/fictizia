var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

process.env['NODE_PATH'] = __dirname + '/../src';
require('module').Module._initPaths();
