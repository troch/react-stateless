'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createClass = createClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function createClass(specification) {
    if (!specification instanceof Function && specification.render === undefined) {
        throw new Error('[ReactStateless.createClass(specification)] Not render function found. "specification" should be a render function or contain a render function.');
    }

    var render = function render() {
        return specification instanceof Function ? specification(this.props) : specification.render(this.props);
    };

    var displayName = undefined;
    if (specification instanceof Function) displayName = specification.name || undefined;
    if (specification.render instanceof Function) displayName = specification.render.name || undefined;

    var supportedLifecycleMethods = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

    var supportedProperties = ['propTypes', 'defaultProps', 'getDefaultProps', 'displayName'];

    var componentSpecification = { displayName: displayName };

    supportedLifecycleMethods.filter(function (method) {
        return specification[method] !== undefined;
    }).forEach(function (method) {
        componentSpecification[method] = function () {
            var args = [this.props].concat(arguments[0] === undefined ? [] : arguments[0]).concat(this.refs);
            return specification[method].apply(null, args);
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

