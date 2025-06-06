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


import ApiClient from './ApiClient';
import Usuario from './model/Usuario';
import UsuarioGet200Response from './model/UsuarioGet200Response';
import UsuarioInput from './model/UsuarioInput';
import UsuarioApi from './api/UsuarioApi';


/**
* Documentación de la API de Usuarios.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var ApiUsuarios = require('index'); // See note below*.
* var xxxSvc = new ApiUsuarios.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new ApiUsuarios.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new ApiUsuarios.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new ApiUsuarios.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Usuario model constructor.
     * @property {module:model/Usuario}
     */
    Usuario,

    /**
     * The UsuarioGet200Response model constructor.
     * @property {module:model/UsuarioGet200Response}
     */
    UsuarioGet200Response,

    /**
     * The UsuarioInput model constructor.
     * @property {module:model/UsuarioInput}
     */
    UsuarioInput,

    /**
    * The UsuarioApi service constructor.
    * @property {module:api/UsuarioApi}
    */
    UsuarioApi
};
