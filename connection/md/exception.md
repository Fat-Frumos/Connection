#### Exception

###### Sent form data is corrupted

_status code_ **400**

```json
{
  "type": "InvalidFormDataException",
  "message": "Invalid multipart/form-data request"
}
```

###### Format of form data is unknown or cannot be read

_status code_ **400**

```json
{
  "type": "InvalidFormDataException",
  "message": "Invalid post data"
}
```

###### Form data should contain required parameters

_status code_ **400**

```json
{
  "type": "InvalidFormDataException",
  "message": "Parameters \"email\", \"name\" and \"password\" are required"
}
```

###### Query string should contain required parameters

_status code_ **400**

```json
{
  "type": "InvalidFormDataException",
  "message": "\"groupID\" parameter should be in query list."
}
```

###### User already exists in the platform

_status code_ **400**

```json
{
  "type": "PrimaryDuplicationException",
  "message": "User {email} already exists"
}
```

###### Conversation already exist

_status code_ **400**

```json
{
  "type": "DuplicationNotAllowedException",
  "message": "Conversation already exists."
}
```

###### User is not found

_status code_ **400**

```json
{
  "type": "NotFoundException",
  "message": "Email and/or password doesn't exist in the system."
}
```

###### Have not passed required headers in http-request

_status code_ **400**

```json
{
  "type": "InvalidUserDataException",
  "message": "Header should contain \"rs-uid\", \"rs-email\" and \"Authorization\" parameters."
}
```

###### Have not passed valid Authorization header parameter

_status code_ **400**

```json
{
  "type": "InvalidTokenException",
  "message": "Header should contain \"Authorization\" parameter with Bearer code."
}
```

###### Passed token is invalid

_status code_ **400**

```json
{
  "type": "InvalidTokenException",
  "message": "Current session token is not valid."
}
```

###### User is not found

_status code_ **400**

```json
{
  "type": "InvalidIDException",
  "message": "User was not found. Check passed identification."
}
```

###### Group does not exist

_status code_ **400**

```json
{
  "type": "InvalidIDException",
  "message": "Group with id \"${groupID}\" does not exist or was removed before."
}
```
