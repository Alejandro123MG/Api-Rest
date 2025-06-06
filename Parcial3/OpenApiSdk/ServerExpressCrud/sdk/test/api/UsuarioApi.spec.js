/**
 * API Usuarios
 * Documentación de la API de Usuarios
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: alejandromonsivais367@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.ApiUsuarios);
  }
}(this, function(expect, ApiUsuarios) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new ApiUsuarios.UsuarioApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('UsuarioApi', function() {
    describe('usuarioDelete', function() {
      it('should call usuarioDelete successfully', function(done) {
        //uncomment below and update the code to test usuarioDelete
        //instance.usuarioDelete(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('usuarioGet', function() {
      it('should call usuarioGet successfully', function(done) {
        //uncomment below and update the code to test usuarioGet
        //instance.usuarioGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('usuarioPost', function() {
      it('should call usuarioPost successfully', function(done) {
        //uncomment below and update the code to test usuarioPost
        //instance.usuarioPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
