## Milestone 6.2. People list

**Score:** 60

User can observe all list of registered participants and make the individual conversation with any
of them.

There are 2 endpoints:

_/users_  
Retrieves list of all registered is the system participants. This list should be rendered excluding
yourself.

_/conversations/list_  
Retrieves list of active individual conversations with unique id. This list used to mark list items
with special color and not to re-create already existing conversation.

### Visualization

Right half of the primary page consist of:

**_Update_ button**  
_Update_ button refreshes the people list by sending http-request and renders obtained list.

User can update the list no more than once a minute! Countdown must be present near the _Update_
button till the next update is possible. If time is out countdown disappears.
This state should be preserved even after transition to other pages and countdown

**List of people**  
Simple list with **clickable items as a link** of all members. If user has the conversation with
someone
created earlier, its list item should have different background light color.

Clicking on item user is redirected to dedicated page with
routing `/conversation/{:conversationID}`.

> [!WARNING] Technically application should create
> conversation via special http-request (below) before user is redirected to the dialog page if
> there is no
> already created conversation with unique id. If any errors occur during conversation creation user
> have to see [toast](../README.md#toast) danger message and redirection is canceled.

_rough example of people list_:  
`-----------------------`  
`|`
Sofía&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `|`  
`-----------------------`  
`|`
Nicolás&nbsp;&nbsp;`********`&nbsp; `|`  
`-----------------------`  
`|`
Mateo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `|`  
`-----------------------`

### Endpoint

> `GET` https://tasks.app.rs.school/angular/users

Retrieves list of participants.

#### Request headers

| Header          | Type     | Description                                                                               |
| --------------- | -------- | ----------------------------------------------------------------------------------------- |
| `rs-uid`        | `string` | user identifier received after successful authentication                                  |
| `rs-email`      | `string` | user email                                                                                |
| `Authorization` | `string` | `Bearer <TOKEN>`, where `<TOKEN>` is token value received after successful authentication |

#### Response

_status code_ **200**  
_json_ format

```json
{
  "Count": "number",
  "Items": [
    {
      "name": {
        "S": "string"
      },
      "uid": {
        "S": "string"
      }
    }
  ]
}
```

#### Exceptions

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

---

> `GET` https://tasks.app.rs.school/angular/conversations/list

Retrieves list of active conversations of current user.

#### Request headers

| Header          | Type     | Description                                                                               |
| --------------- | -------- | ----------------------------------------------------------------------------------------- |
| `rs-uid`        | `string` | user identifier received after successful authentication                                  |
| `rs-email`      | `string` | user email                                                                                |
| `Authorization` | `string` | `Bearer <TOKEN>`, where `<TOKEN>` is token value received after successful authentication |

#### Response

_status code_ **200**  
_json_ format

```json
{
  "Count": "number",
  "Items": [
    {
      "id": {
        "S": "string"
      },
      "companionID": {
        "S": "string"
      }
    }
  ]
}
```

#### Exception

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

---

> `POST` https://tasks.app.rs.school/angular/conversations/create

Creates conversation with the user.

#### Request headers

| Header          | Type     | Description                                                                               |
| --------------- | -------- | ----------------------------------------------------------------------------------------- |
| `rs-uid`        | `string` | user identifier received after successful authentication                                  |
| `rs-email`      | `string` | user email                                                                                |
| `Authorization` | `string` | `Bearer <TOKEN>`, where `<TOKEN>` is token value received after successful authentication |

#### Request body

| Property    | Type     | Description     |
| ----------- | -------- | --------------- |
| `companion` | `string` | user identifier |

#### Response

_status code_ **201**  
_json_ format

```json
{
  "conversationID": "string"
}
```

#### Exception

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

###### Companion identifier is not defined

_status code_ **400**

```json
{
  "type": "InvalidFormDataException",
  "message": "Parameter \"companion\" should be defined."
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
