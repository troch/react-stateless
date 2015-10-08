var sinon = require('sinon');
var assert = require('assert');
var ReactStateless = require('../dist');
var createClass = ReactStateless.createClass;
var React = require('react');
var ReactDOMServer = require('react-dom/server');

require('mocha');

describe('ReactStateless.createClass()', function() {
    it('should create a Component class from a render function', function() {
        var component = {
            render: function(props) {
                return React.createElement('div', {}, props.colour);
            }
        };

        var spy = sinon.spy(component, 'render');
        var componentClass = createClass(component.render);

        var props = {colour: 'blue'};
        var component = ReactDOMServer.renderToString(React.createElement(componentClass, props));

        assert(spy.calledWith(props));
    });

    it('should create a Component class from an object', function() {
        var component = {
            shouldComponentUpdate: function(props, nextProps) {
                return true;
            },
            render: function(props) {
                return React.createElement('div', {}, props.colour);
            }
        };

        var renderSpy = sinon.spy(component, 'render');
        var shouldUpdateSpy = sinon.spy(component, 'shouldComponentUpdate');

        var componentClass = createClass(component);

        var props = {colour: 'blue'};
        var element = React.createElement(componentClass, props);
        var renderedString = ReactDOMServer.renderToString(element);

        assert(renderSpy.calledWith(props));
    });
});
