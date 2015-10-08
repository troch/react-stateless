import React from 'react';

export function createClass(specification) {
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
    ];

    let componentSpecification = supportedLifecycleMethods
        .filter(method => specification[method] !== undefined)
        .map(method => {
            return function() {
                return specification.method(this.props, ...arguments);
            };
        });

    supportedProperties
        .filter(prop => specification[prop] !== undefined)
        .forEach(prop => componentSpecification[prop] = specification[prop]);

    componentSpecification.render = render;


    return React.createClass(componentSpecification);
}
