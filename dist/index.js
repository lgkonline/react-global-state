'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.gs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var state = function () {
	function state() {
		_classCallCheck(this, state);

		this.state = {};
		this.subscriptions = [];
	}

	_createClass(state, [{
		key: 'subscribe',
		value: function subscribe(cb) {
			this.subscriptions.push(cb);
			return this.subscriptions.lastIndexOf(cb);
		}
	}, {
		key: 'unsubscribe',
		value: function unsubscribe(handle) {
			delete this.subscriptions[handle];
		}
	}, {
		key: 'setState',
		value: function setState(obj) {
			this.state = Object.assign({}, this.state, obj);
			this.subscriptions.forEach(function (cb) {
				if (cb) {
					cb();
				}
			});
		}
	}]);

	return state;
}();

var globState = new state();

var gs = function gs(Component) {
	return function (_React$Component) {
		_inherits(GlobalState, _React$Component);

		function GlobalState(props) {
			_classCallCheck(this, GlobalState);

			var _this = _possibleConstructorReturn(this, (GlobalState.__proto__ || Object.getPrototypeOf(GlobalState)).call(this, props));

			_this.state = {
				state: {}
			};
			return _this;
		}

		_createClass(GlobalState, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.subsHandle = globState.subscribe(this.handleChange.bind(this));
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				globState.unsubscribe(this.subsHandle);
			}
		}, {
			key: 'handleChange',
			value: function handleChange() {
				this.setState({ state: globState.state });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(Component, _extends({}, this.props, { state: this.state.state, setState: globState.setState.bind(globState) }));
			}
		}]);

		return GlobalState;
	}(_react2.default.Component);
};

exports.gs = gs;