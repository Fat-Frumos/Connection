# Connections [![Angular CI](https://github.com/Fat-Frumos/angular-service/actions/workflows/npm.yml/badge.svg)](https://github.com/Fat-Frumos/angular-service/actions/workflows/npm.yml)  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.4.

## Task [Final task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/connections)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run ` npm run test:coverage` to generate a new coverage.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Run `npx eslint .` to check

Application represents the platform to allow users to communicate via public text messages. Before
starting to use the service a guest must register and sign in, after that all http-requests have to
contain `rs-email`, `rs-uid` and `Authorization` headers.

Authorized user can see vertically divided main page, where left side is a list of public group and
right side is a list of people including personal conversations. Each user can create own public
group and broadcast messages there or use existing group along with other participants.

Personal information can be viewed on a special profile page, where it can be immediately edited.

Detailed information about each part of the application is presented in the sections:

1. [Registration](md/milestone_1.registration.md) 60 points
2. [Login](md/milestone_2.login.md) 70 points
3. [Profile](md/milestone_3.profile.md) 40 points
4. [Update profile](md/milestone_4.profile_update.md) 55 points
5. [Logout](md/milestone_5.logout.md) 40 points
6. [People and group sections](md/milestone_6.people_groups.md) 175 points
7. [Group dialog](md/milestone_7.group_dialog.md) 140 points
8. [People conversation](md/milestone_8.conversation.md) 140 points
9. [404 page](md/milestone_9.404_page.md) 30 points
10. Bonus: [Style theme](./milestone_10.theme.md) 50 points

Total score: **800 points**

# Examination

Each milestone has relative score. Each milestone has number of points for successful result.

But in case if some common violation is present the project is losing **additional** points:

- any uncaught errors: **-100 points** for an error in console
- used `any` instead of dedicated interface/type: **-100 points**
- used some additional production npm package (except NgRx): **-100 points**

### Url navigation

#### Guest

Pages available only for users before authorization. That pages are not available for users after
successful authorization and protected by _Guards_.

_`/signup` (registration)_  
Page to create new account.

_`/signin` (login)_  
Page where user can enter email and password to enter the platform. **Default page** for
non-authorized users.

#### Member

That pages allowed only for authorized users. Should be protected by _Guards_.

_`/` (main page)_  
Page with group list and people list.**Default page** for authorized users.

_`/profile` (user profile)_  
User's information with the ability to edit it.

_`/group/{:groupID}` (broadcast page)_  
where, `:groupID` is unique group identifier;  
Page where user can send message to all participants.

_`/conversation/{:conversationID}` (person dialog)_  
where, `:conversationID` is unique user identifier to speak with;

## Declarations

### Toast

It is a discrete and ephemeral notification presented to users on a graphical user interface.
conveys concise information, notifications, or feedback in a visually unobtrusive manner. These
messages are designed to appear momentarily and autonomously vanish without necessitating user
intervention, thereby minimizing disruption to the user's ongoing tasks.

The nomenclature "toast" in this context draws an analogy from the culinary practice where a toaster
pops up, signifying the completion of the toasting process. Analogously, a toast message emerges on
the user interface, delivering pertinent information and subsequently dissipating after a brief
period.
