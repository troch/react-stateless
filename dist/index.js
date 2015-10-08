'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _slice = Array.prototype.slice;
exports.createClass = createClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function createClass(specification) {
    var render = function render() {
        return specification instanceof Function ? specification(this.props) : specification.render(this.props);
    };

    var supportedLifecycleMethods = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

    var supportedProperties = ['propTypes', 'defaultProps', 'getDefaultProps'];

    var componentSpecification = {};

    supportedLifecycleMethods.filter(function (method) {
        return specification[method] !== undefined;
    }).forEach(function (method) {
        componentSpecification[method] = function () {
            return specification.method.apply(specification, [this.props].concat(_slice.call(arguments)));
        };
    });

    supportedProperties.filter(function (prop) {
        return specification[prop] !== undefined;
    }).forEach(function (prop) {
        return componentSpecification[prop] = specification[prop];
    });

    componentSpecification.render = render;

    return _react2['default'].createClass(componentSpecification);
}

