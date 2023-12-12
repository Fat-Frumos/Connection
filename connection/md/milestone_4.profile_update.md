## Milestone 4. Profile updating

**Score:** 55

User can change and save his name. Application **should not** perform _get_ http-request `/profile`
again to retrieve saved data, if _put_ http-request succeed the data from the form is being
persisted in @ngrx/store and is used on Profile page instantly.

### Visualization

The button _Edit_ should be present on the page. Clicking on the button field `name` becomes
editable, _Save_ button appears to save new data on the server via http-request, _Cancel_ button
appears to revert back state to static form without modifications.

Form field `name` should obey the same validation rules as on Registration page.

### Endpoint

> `PUT` https://tasks.app.rs.school/angular/profile

Edit profile data of current user.


#### Request body

| Property | Type     | Description   |
| -------- | -------- | ------------- |
| `name`   | `string` | new user name |

#### Response

_status code_ **201**

## Examination

### Profit

- button _Edit_ makes `name` field editable: **10 points**
- button _Cancel_ returns initial state: **5 points**
- button _Save_ sends new http-request to save new data and update @ngrx/store: **20 points**
- buttons _Cancel_ and _Save_ is visible ony for editable
  form: **5 points**
- button _Edit_ is visible only for static page: **5 points**
- [toast messages](../README.md#toast) with appropriate text are displayed if http-request fails or
  succeed: **10 points**

### Fines

- http-request to retrieve profile data is sent: **-20 points**
- data in the @ngrx/store is updated even if http-request fails: **-20 points**
