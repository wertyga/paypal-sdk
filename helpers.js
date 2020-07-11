"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statuses = exports.authGateway = exports.payPalGateway = void 0;
var payPalGateway = process.env.NODE_ENV !== 'production' ? 'https://api.sandbox.paypal.com' : 'https://api.paypal.com';
exports.payPalGateway = payPalGateway;
var authGateway = process.env.NODE_ENV !== 'production' ? 'https://api.sandbox.paypal.com/v1/oauth2/token' : 'https://api.paypal.com/v1/oauth2/token';
exports.authGateway = authGateway;
