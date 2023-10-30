# Podcast

## Youtube client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Check eslint .

use in CLI  `npx eslint .`

### Check the implementation in the prod mode

ng serve --configuration production

[Figma mockup](https://www.figma.com/file/tS3Zqk138yXUmRxSWKDv4r/YouTube-client?node-id=0%3A1)

[demo](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/main.jpg)

[task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/angular)

[intro](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/intro.md)

[pipes](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/components-directives-pipes.md)

[module](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/modules-services-routing.md)

[dashboard](https://app.rs.school/course/schedule?course=angular-2023Q4)

[deploy](https://angular-podcast.netlify.app/)

#### Functional requirements
- **404 page**
  - If the user entered an incorrect URL which is missing in the router configuration, the app should redirect him to the 404 page
- **Login page**
  - When the user isn't logged in, the app should prevent him/her from navigating to any pages other than the login page. A router guard would be helpful to implement such behavior.
  - There’s no user validation at this stage. You can enter arbitrary credentials and invoke login using an appropriate service.
  - Create a login service to enable the required login functionality.
  - Once the user has submitted the form, an appropriate method should be called in the login service that saves a fake auth token in *localStorage*. Then, the user should be redirected to the **Main page**. If the user gets logged out, he/she should be redirected to the initial login page and the auth token should be deleted from *localStorage*.
  - The login button in the Header component could remain inactive for now, because implementing its functionality requires some RxJS-based features (we’ll deal with it in the upcoming lesson and corresponding task). In order to implement the logout functionality, you can create a separate button that calls the logout method of the login service.
- **Main page**
  - Move the state and its methods from the Board component to a dedicated service.
  - By clicking the *More* button, the **Detailed information** page should appear
- **Detailed information page**
  - Should contain information about the selected video.
  - To determine which video is selected, pass its id as a route param

#### Optional task (without points)
- Develop two logger services to handle logging differently for development and production modes. Use the logger service to log the message in the console after the user is logged in
  - DevLoggerService: This service should log messages with a [DEV] prefix. Example: *[DEV]: App is running in the development mode*
  - ProdLoggerService: This service should log messages with a [PROD] prefix. Example: *[PROD]: App is running in the production mode*
- You could place this services in the **CoreModule**
- For better implementation you could create an abstract class LoggerService with a method logMessage that takes in a message and logs it. Both DevLoggerService and ProdLoggerService should extend this abstract class, providing their own prefix values.
- Provide one of the logger services for the entire app based on the mode it's running in.

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


