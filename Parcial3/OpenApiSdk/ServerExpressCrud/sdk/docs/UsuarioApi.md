# ApiUsuarios.UsuarioApi

All URIs are relative to *http://localhost:3001*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usuarioDelete**](UsuarioApi.md#usuarioDelete) | **DELETE** /usuario | Elimina un usuario
[**usuarioGet**](UsuarioApi.md#usuarioGet) | **GET** /usuario | Consulta usuario(s)
[**usuarioPost**](UsuarioApi.md#usuarioPost) | **POST** /usuario | Crea un nuevo usuario



## usuarioDelete

> usuarioDelete(usuarioId)

Elimina un usuario

Elimina un usuario específico por ID

### Example

```javascript
import ApiUsuarios from 'api_usuarios';

let apiInstance = new ApiUsuarios.UsuarioApi();
let usuarioId = 56; // Number | ID del usuario a eliminar
apiInstance.usuarioDelete(usuarioId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usuarioId** | **Number**| ID del usuario a eliminar | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usuarioGet

> UsuarioGet200Response usuarioGet(opts)

Consulta usuario(s)

Obtiene un usuario específico por ID o lista todos los usuarios si no se proporciona ID

### Example

```javascript
import ApiUsuarios from 'api_usuarios';

let apiInstance = new ApiUsuarios.UsuarioApi();
let opts = {
  'usuarioId': 56 // Number | ID del usuario a buscar (opcional)
};
apiInstance.usuarioGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usuarioId** | **Number**| ID del usuario a buscar (opcional) | [optional] 

### Return type

[**UsuarioGet200Response**](UsuarioGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usuarioPost

> Usuario usuarioPost(usuarioInput)

Crea un nuevo usuario

Registra un nuevo usuario en el sistema

### Example

```javascript
import ApiUsuarios from 'api_usuarios';

let apiInstance = new ApiUsuarios.UsuarioApi();
let usuarioInput = new ApiUsuarios.UsuarioInput(); // UsuarioInput | 
apiInstance.usuarioPost(usuarioInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usuarioInput** | [**UsuarioInput**](UsuarioInput.md)|  | 

### Return type

[**Usuario**](Usuario.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

