"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Paypal = function Paypal(options) {
  var _this = this;

  _classCallCheck(this, Paypal);

  _defineProperty(this, "_getAuthToken", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _yield$axios, access_token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _axios["default"])({
              method: 'POST',
              url: _helpers.authGateway,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              auth: {
                username: _this._clientID,
                password: _this._secret
              },
              params: {
                grant_type: 'client_credentials'
              }
            });

          case 3:
            _yield$axios = _context.sent;
            access_token = _yield$axios.data.access_token;
            process.env.PAYPAL_AUTH_TOKEN = access_token;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  })));

  _defineProperty(this, "_withAuth", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(method) {
      var PAYPAL_AUTH_TOKEN, _this$_getErrorMeta, status;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              PAYPAL_AUTH_TOKEN = process.env.PAYPAL_AUTH_TOKEN;

              if (PAYPAL_AUTH_TOKEN) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return _this._getAuthToken();

            case 5:
              return _context2.abrupt("return", method());

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              _this$_getErrorMeta = _this._getErrorMeta(_context2.t0), status = _this$_getErrorMeta.status;

              if (!(status === 401)) {
                _context2.next = 23;
                break;
              }

              _context2.prev = 12;
              _context2.next = 15;
              return _this._getAuthToken();

            case 15:
              return _context2.abrupt("return", method());

            case 18:
              _context2.prev = 18;
              _context2.t1 = _context2["catch"](12);
              throw _context2.t1;

            case 21:
              _context2.next = 24;
              break;

            case 23:
              throw _context2.t0;

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8], [12, 18]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "_getErrorMeta", function (e) {
    var _e$response = e.response;
    _e$response = _e$response === void 0 ? {} : _e$response;
    var respStatus = _e$response.status;
    var _e$response2 = e.response;
    _e$response2 = _e$response2 === void 0 ? {} : _e$response2;
    var _e$response2$data = _e$response2.data;
    _e$response2$data = _e$response2$data === void 0 ? {} : _e$response2$data;
    var respMessage = _e$response2$data.message;
    var status = respStatus || e.status;
    var message = respMessage || e.message;
    return {
      status: status,
      message: message
    };
  });

  _defineProperty(this, "_paymentData", function (_ref3) {
    var payersName = _ref3.payersName,
        email_address = _ref3.email_address,
        _ref3$currency_code = _ref3.currency_code,
        currency_code = _ref3$currency_code === void 0 ? 'USD' : _ref3$currency_code,
        _ref3$amount = _ref3.amount,
        amount = _ref3$amount === void 0 ? 1 : _ref3$amount;
    var return_url = _this.return_url,
        cancel_url = _this.cancel_url,
        brand_name = _this.brand_name;
    return {
      application_context: {
        payer: {
          name: {
            given_name: payersName
          },
          email_address: email_address
        },
        brand_name: brand_name,
        return_url: return_url,
        cancel_url: cancel_url
      },
      purchase_units: [{
        amount: {
          currency_code: currency_code,
          value: amount
        }
      }]
    };
  });

  _defineProperty(this, "sendPayment", function (data) {
    return _this._withAuth( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var email_address, payersName, currency_code, amount, _yield$axios2, _yield$axios2$data, links, id, _ref5, approveHref;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              email_address = data.email_address, payersName = data.payersName, currency_code = data.currency_code, amount = data.amount;

              if (!(!payersName || !email_address)) {
                _context3.next = 4;
                break;
              }

              throw new Error('Need provided require fields');

            case 4:
              _context3.next = 6;
              return (0, _axios["default"])({
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(process.env.PAYPAL_AUTH_TOKEN)
                },
                url: "".concat(_helpers.payPalGateway, "/v2/checkout/orders"),
                data: _objectSpread({
                  intent: 'CAPTURE'
                }, _this._paymentData({
                  email_address: email_address,
                  payersName: payersName,
                  currency_code: currency_code,
                  amount: amount
                }))
              });

            case 6:
              _yield$axios2 = _context3.sent;
              _yield$axios2$data = _yield$axios2.data;
              links = _yield$axios2$data.links;
              id = _yield$axios2$data.id;
              _ref5 = links.find(function (_ref6) {
                var rel = _ref6.rel;
                return rel === 'approve';
              }) || {}, approveHref = _ref5.href;

              if (approveHref) {
                _context3.next = 13;
                break;
              }

              throw {
                response: {
                  message: 'Error in payments',
                  status: 400
                }
              };

            case 13:
              return _context3.abrupt("return", {
                approveHref: approveHref,
                id: id
              });

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    })));
  });

  _defineProperty(this, "captureOrder", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(orderId) {
      var _yield$axios3, data;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (orderId) {
                _context4.next = 2;
                break;
              }

              throw new Error('orderId need to provide');

            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return (0, _axios["default"])({
                method: 'post',
                url: "".concat(_helpers.payPalGateway, "/v2/checkout/orders/").concat(orderId, "/capture"),
                headers: {
                  'Authorization': "Bearer ".concat(process.env.PAYPAL_AUTH_TOKEN),
                  'Content-Type': 'application/json'
                }
              });

            case 5:
              _yield$axios3 = _context4.sent;
              data = _yield$axios3.data;
              return _context4.abrupt("return", data);

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](2);
              throw _context4.t0;

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 10]]);
    }));

    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }());

  var clientID = options.clientID,
      secret = options.secret,
      _return_url = options.return_url,
      _cancel_url = options.cancel_url,
      _brand_name = options.brand_name;
  this._clientID = clientID;
  this._secret = secret;
  this._return_url = _return_url;
  this._cancel_url = _cancel_url;
  this._brand_name = _brand_name;
};

exports["default"] = Paypal;
;