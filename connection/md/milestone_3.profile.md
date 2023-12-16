## Milestone 3. Profile

**Score:** 40

Information on this page should be loaded **only once** when user visit this page first time.

### Visualization

Page with certain routing `/profile` should contain:

- user id
- email address
- human-readable profile creation time
- user name

### Endpoint

> `GET` https://tasks.app.rs.school/angular/profile

#### Response

_status code_ **200**  
_json_ format

```json
{
  "email": {
    "S": "string"
  },
  "name": {
    "S": "string"
  },
  "uid": {
    "S": "string"
  },
  "createdAt": {
    "S": "string"
  }
}
```

## Examination

### Profit

- `user id`, `email`, `creation time`, `user name` data of current user is displayed
  on the page: **30 points**
- error message with appropriate text are displayed on the page if loading http-request fails
  (for instance, if internet connection is lost): **10 points**

### Fines

- `/profile` http-request is sent every time if user opens profile page: **-15 points**
