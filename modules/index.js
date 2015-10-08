import React from 'react';

export function createClass(specification) {
    if (!specification instanceof Function && specification.render === undefined) {
        throw new Error('[ReactStateless.createClass(specification)] Not render function found. "specification" should be a render function or contain a render function.');
    }

    let render = function() {
        return specification instanceof Function ? specification(this.props) : specification.render(this.props);
    }

    let supportedLifecycleMethods = [
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount'
    ];

    let supportedProperties = [
        'propTypes',
        'defaultProps',
        'getDefaultProps',
        'displayName'
    ];

    let componentSpecification = {};

    supportedLifecycleMethods
        .filter(method => specification[method] !== undefined)
        .forEach(method => {
            componentSpecification[method] = function() {
                return specification[method](this.props, ...arguments);
            };
        });

    supportedProperties
        .filter(prop => specification[prop] !== undefined)
        .forEach(prop => componentSpecification[prop] = specification[prop]);

    componentSpecification.render = render;


    return React.createClass(componentSpecification);
}
