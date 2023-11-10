# Podcast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

##  Check eslint .

use in CLI  `npx eslint .`

[Figma mockup](https://www.figma.com/file/tS3Zqk138yXUmRxSWKDv4r/YouTube-client?node-id=0%3A1)

[demo](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/main.jpg)

[task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/angular)

[intro](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/intro.md)

[pipes](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/components-directives-pipes.md)

[rxJS](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/rxjs-observables-http.md)

[dashboard](https://app.rs.school/course/schedule?course=angular-2023Q4)

[deploy](https://angular-podcast.netlify.app/)

#### Functional requirements
- When user opens the app, only the **Header** section should be shown
- After submitting the search form, the **Search results block** appears.
- Show cards of videos populated with mocked data (use data from [response example](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/response.json) file). You can store the mocked data in the **Search results** component
  - The bottom border represents the publication date status. The following border colors should be used:
    - 🟥 if older than 6 months
    - 🟨 if between 1 and 6 months
    - 🟩 if between 7 days and 1 month
    - 🟦 if newer than 7 days
- By clicking the **Settings** button, the **Filtering criteria block** should be toggled on/off
  - It should be possible to sort search results by date or view count
  - Sorting should work in both ascending and descending directions of the values
  - Filter search results by the value that user types in the input

#### Functional requirements

- Global search functionality
  - remove the Search button. Now we're going to invoke the search logic once the user types something
  - in order not to spam our API, create a new Observable in your component and emit changes until the user enters at least 3 characters
  - add debounce functionality to prevent API calls from being performed if the user is still typing.

- Login block
  - create a new Observable in the Login service that will emit a boolean which indicates whether the user is logged in or not.
  - show the "Login" and "Logout" button if the user is logged out / logged in

- HTTP requests and YouTube API
  - remove the mocked response from your project and use a service that is created in the YouTube module.
  - use the HTTP interceptor to shorten request URLs in your services and pass your access token.

#### Evaluation criteria

Maximum score - **100**

- [ ] Search input debounce is implemented (**+15**)
- [ ] Login block reflects the current login state (**+15**)
- [ ] Search functionality is integrated with the YouTube API (**+30**)
- [ ] Detailed information page uses a call to the YouTube API (**+30**)
- [ ] HTTP interceptor is used to pass the token and the base API URL (**+10**)

Fines

- [ ] Failure to submit on time may lead to points lose according to
- [ ] The app still contains mocked data (**-20**)
- [ ] The app doesn't work or has console errors (**-20**)
- [ ] ESLint warnings or errors are present (**-15**)
- [ ] Using the `Any` type. (**-20**)
- [ ] Mandatory flags `noImplicitAny: true` and `strict: true` are not set in the TypeScript configuration file. (**-10**)
- [ ] The ESLint configuration file does not include the `no-explicit-any` rule. (**-10**)
- [ ] Failure to meet the [requirements](https://docs.rs.school/#/en/pull-request-review-process?id=pull-request-requirements-pr) when creating a `Pull Request`. (**-10**)
- [ ] Non-compliance with commit history and commit message [guidelines](https://docs.rs.school/#/en/git-convention?id=commit-requirements). (**-10**)
