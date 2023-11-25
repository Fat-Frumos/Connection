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

[http](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/forms.md)

[ngrx](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/NgRX.md)

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

#### Functional requirements

- **Login block**
  - implement login form
  - add validation rules for input fields:
    - login
      - required (message: "Please enter a login email")
      - valid email (message: "The login email is invalid")
    - password
      - required (message: "Please enter a password")
      - add a custom validator that will check how strong a password is. 
        the following checks should be applied (message: 
        "Your password isn't strong enough" + recommendations below):
        - at least 8 characters
        - a mixture of both uppercase and lowercase letters
        - a mixture of letters and numbers
        - inclusion of at least one special character, "! @ # ?" ]

- **Admin page**
  - implement card creation form
  - add validation rules for input fields:
    - title
      - required (message: "Please enter a title")
      - min length: 3 (message: "The title is too short")
      - max length: 20 (message: "The title is too long")
    - description
      - optional
      - max length: 255 (message: "The description is too long")
    - link to the image cover
      - required (message: "Please enter a link to the image")
    - link to the video
      - required (message: "Please enter a link to the video")
    - creation date
      - required (message: "Please enter a creation date")
      - an entered date should not be in the future (message: "The date is invalid")
  - implement "Tags" sub-form:
    - initially a single "Tag" input is present
    - click "Add tag" button to add an extra input
    - each tag input should be required
    - form can have up to five "Tag" inputs
  - implement "Reset" button
    - when clicked all inputs should be reset to their initial values and the 
      "Tags" sub-form should return to having only a single (empty) input

- The application should prevent user from submitting the form if at least one of the described validation rules didn't pass
- If the user has entered invalid data into an input, its border should be colored in red
- To indicate which rule fails, an appropriate message under an invalid input field should be displayed.

### Task1. Admin page

1. [Install NgRx package](https://ngrx.io/guide/store/install) and create a storage (state);
2. Generate appropriate reducers, selectors, actions to creating, obtaining and deleting custom cards;
3. Make **pagination\*** for video list on _List Page_ of **20 items** per page;
4. Combine common YouTube videos with _Custom Cards_ so that custom cards are first in the list and common videos
   follow them;
5. Add _delete button_\* on _Custom Cards_ in video list and on the _View Page_ for _Custom Card_ to delete item;


#### Requirements

1. NgRx storage must contain:
   - list of custom cards;
   - list of videos from API YouTube.
2. NgRx`s storage must only be changed in the following cases:
   - new response from the YouTube API is received;
   - new card is added using _Admin Page_.
3. _Custom Cards_ must contain the following information:
   - title
   - description
   - link to the image
   - link to video
   - creation date (current date)
4. Information about _Custom Cards_ must be saved until your application is reloaded even if you perform requests to
   YouTube API. In other words, all custom cards are one-off session data and suppose to be saved in localStorage.

#### Expected behavior

1. User can see only 20 items per page on _List Page_ with the ability to change the current page number for new items;
2. All _Custom Cards_ are prepended (to the beginning) to the video list and form single stream.
   Common YouTube videos follow them;

> **Hint!**<br>
> Current page number is saved in store alongside the page tokens for other pages. The good way
> to update video information via API is NgRx Effects.

### Task2. Favorite Page\*

1. Generate appropriate module and page with respective url;
2. Add icon-link (heart icon, for example) in site header to new page;
3. Create feature slice for the store with reducers, actions and selectors;
4. Display the list of favorite videos from the store using selectors on the new page\*;
5. Add _favorite button_\* (heart sign) into each video item card on _List Page_ and _View Page_ that toggles favorite
   status;

#### Requirements

1. The crucial moment for that task is to use **single store source** of common YouTube videos
   for _List Page_ and _Favorite Page_. NgRx store should be constructed with single video set and different sequence:
   1. Video from YouTube saved as object where key - some unique video identifier, value - video data;
   2. One array of video identifiers for _Video List_ (the result is generated by selector);
   3. Second array of video identifiers for _Favorite List_ (another selector for the result);
2. User can mark **only** ordinary video as favorite on _List Page_ but not _Custom Card_; _Custom Card_ should not
   contain corresponding button;
3. _Favorite Page_ is the same as _List Page_ in appearance (because it's the same content);

#### Expected behavior

1. Heart button (_favorite button_)\* clicking alternately changes the state of video. Favorite video should have filled
   favorite icon, default state is represented by outline favorite button (or any other visually different versions);
2. If user click favorite button on _Favorite Page_ then video is no longer favorite and removes from list immediately;

### Evaluation criteria

Maximum score - **100**

- [ ] _Admin Page_ is generated (**+5**)
- [ ] _Favorite Page_ is generated (**+5**)
- [ ] NgRx package is used and storage is created (**+5**)
- [ ] _Custom Cards_ are saved in the store (**+10**)
- [ ] Videos (with _favorite button_) from the YouTube API received via Effects are saved in store (**+20**)
- [ ] _Custom Cards_ (without _favorite button_) are displayed on _List Page_ combined with YouTube videos (**+20**)
- [ ] _Favorite Page_ displays all marked videos from _List Page_ or _View Page_ (**+10**)
- [ ] Clicking the _favorite button_ on the card on _Favorite Page_ removes item from the store and from the page
  immediately (**+15**)
- [ ] _List Page_ displays 20 items with pagination and _Custom Cards_ are added to the beginning of the list on 1
  page (**+10**)

Maximum score - **100**

- [ ] **Login block** is implemented as reactive form (**+10**)
- [ ] Validation rules are applied to the **Login block**. Form submission is possible only if all inputs are valid (**+15**)
- [ ] The application indicates which inputs are invalid on the **Login block** with appropriate styles and messages (**+15**)
- [ ] **Admin page** is implemented as reactive form (**+10**)
- [ ] Validation rules are applied to the **Admin page**. Form submission is possible only if all inputs are valid (**+15**)
- [ ] The application indicates which inputs are invalid on the **Admin page** with appropriate styles and messages (**+15**)
- [ ] "Tags" sub-form is implemented using `FormArray`. "Add tag" button works correctly (**+15**)
- [ ] "Reset" button functionality is fully implemented (**+5**)

Fines

- [ ] Failure to submit on time may lead to points lose 
- [ ] The app doesn't work or has console errors (**-20**)
- [ ] ESLint's warnings or errors are present (**-15**)
- [ ] Using the `Any` type. (**-20**)
- [ ] Mandatory flags `noImplicitAny: true` and `strict: true` are not set in the TypeScript configuration file. (**-10**)
- [ ] The ESLint configuration file does not include the `no-explicit-any` rule. (**-10**)
- [ ] `UntypedFormGroup` or other `Untyped` form controls are used at any point of the task. Usage of `any` type is considered equivalent to using `Untyped` forms. (**-15**)
- [ ] Failure to meet when creating a `Pull Request`. (**-10**)
- [ ] Non-compliance with commit history and commit message  (**-10**)

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
- [ ] ESLint's warnings or errors are present (**-15**)
- [ ] Using the `Any` type. (**-20**)
- [ ] Mandatory flags `noImplicitAny: true` and `strict: true` are not set in the TypeScript configuration file. (**-10**)
- [ ] The ESLint configuration file does not include the `no-explicit-any` rule. (**-10**)
- [ ] Failure to meet when creating a `Pull Request`. (**-10**)
- [ ] Non-compliance with commit history and commit message(**-10**)
