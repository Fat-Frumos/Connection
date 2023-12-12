## Milestone 5. Logout

**Score:** 40

User can terminate current session. Successful sign out process removes token for
http-request and application should wipe out all relative browser
data (`localStorage` | `sessionStorage` | `cookies`).

If action succeed user supposed to be redirected into [Login page](./milestone_2.login.md).

### Visualization

Special button `Logout` should be places on the [Profile page](#milestone-3-profile) in the top
right corner.
Button can be pressed once and button should be disabled until previous http-request is completed.

### Endpoint

> `DELETE` https://tasks.app.rs.school/angular/logout

Removes session data for the user.

#### Response

_status code_ **200**

## Examination

### Profit

- clicking on `Logout` button the http-request is sent
  with `DELETE` method: **10 points**
- user is redirected to Sign-In page after successful logout process: **10 points**
- all data in `cookies`, `localStorage` is deleted: **10 points**
- [toast messages](../README.md#toast) with appropriate text are displayed if http-request fails or
  succeed: **10 points**
