'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _supportJs = require('./support.js');

var _supportJs2 = _interopRequireDefault(_supportJs);

var roundToNearest = function roundToNearest(size, precision) {
  return precision * Math.ceil(size / precision);
};

var defaultMap = {
  width: 'defaultWidth',
  height: 'defaultHeight'
};

var findSizeForDimension = function findSizeForDimension(dim) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (props[dim]) {
    return props[dim];
  } else if (props.fluid && state[dim]) {
    return roundToNearest(state[dim], props.precision);
  } else if (props[defaultMap[dim]]) {
    return props[defaultMap[dim]];
  } else {
    return 1;
  }
};

var ReactImgix = (function (_Component) {
  _inherits(ReactImgix, _Component);

  function ReactImgix() {
    var _this = this;

    _classCallCheck(this, ReactImgix);

    _get(Object.getPrototypeOf(ReactImgix.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      width: null,
      height: null,
      mounted: false
    };

    this.componentDidMount = function () {
      var node = _reactDom2['default'].findDOMNode(_this);
      _this.setState({
        width: node.scrollWidth,
        height: node.scrollHeight,
        mounted: true
      });
    };

    this._findSizeForDimension = function (dim) {
      return findSizeForDimension(dim, _this.props, _this.state);
    };
  }

  _createClass(ReactImgix, [{
    key: 'render',
    value: function render() {
      var src = '';
      var srcSet = '';
      var component = this.props.component;

      var width = this._findSizeForDimension('width');
      var height = this._findSizeForDimension('height');

      var crop = false;
      if (this.props.faces) crop = 'faces';
      if (this.props.entropy) crop = 'entropy';

      var fit = false;
      if (this.props.entropy) fit = 'crop';
      if (this.props.fit) fit = this.props.fit;

      if (this.state.mounted || this.props.aggresiveLoad) {
        var srcOptions = _extends({
          auto: this.props.auto
        }, this.props.customParams, {
          crop: crop,
          fit: fit,
          width: width,
          height: height
        });

        src = (0, _supportJs2['default'])(this.props.src, srcOptions);
        var dpr2 = (0, _supportJs2['default'])(this.props.src, _extends({}, srcOptions, { dpr: 2 }));
        var dpr3 = (0, _supportJs2['default'])(this.props.src, _extends({}, srcOptions, { dpr: 3 }));
        srcSet = dpr2 + ' 2x, ' + dpr3 + ' 3x';
      }

      var childProps = _extends({}, this.props);

      if (this.props.bg) {
        if (!this.props.component) {
          component = 'div';
        }
        childProps.style = _extends({
          backgroundSize: 'cover'
        }, childProps.style, {
          backgroundImage: 'url(' + src + ')'
        });
        delete childProps.src;
        delete childProps.srcSet;
      } else {
        if (!this.props.component) {
          component = 'img';
        }

        if (component === 'img' && this.props.generateSrcSet) {
          childProps.srcSet = srcSet;
        }

        childProps.src = src;
      }
      return _react2['default'].createElement(component, childProps, this.props.children);
    }
  }], [{
    key: 'propTypes',
    value: {
      src: _react.PropTypes.string.isRequired,
      className: _react.PropTypes.string,
      bg: _react.PropTypes.bool,
      component: _react.PropTypes.string,
      fit: _react.PropTypes.string,
      auto: _react.PropTypes.array,
      faces: _react.PropTypes.bool,
      aggresiveLoad: _react.PropTypes.bool,
      fluid: _react.PropTypes.bool,
      children: _react.PropTypes.any,
      customParams: _react.PropTypes.object,
      entropy: _react.PropTypes.bool,
      generateSrcSet: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      precision: 100,
      bg: false,
      fluid: true,
      aggresiveLoad: false,
      faces: true,
      fit: 'crop',
      entropy: false,
      auto: ['format'],
      generateSrcSet: true
    },
    enumerable: true
  }]);

  return ReactImgix;
})(_react.Component);

exports['default'] = ReactImgix;
module.exports = exports['default'];