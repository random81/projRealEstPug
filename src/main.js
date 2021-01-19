// load all scripts to be bundled and css export to dist for front end
// import $ from 'jquery';
import jQuery from 'jquery';

window.$ = jQuery;
window.axios = require('axios');

import '../public/js/calculator_es6';
import '../public/js/ajaxZilloe_es6';
import '../public/css/main.css';
