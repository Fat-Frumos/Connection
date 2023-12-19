## Milestone 6. People & Groups

**Score:** 175

The **default page** for authorized user should be the one without extra path (root routing).
Page is split into 2 vertical sections.
Left side is [Group section](./milestone_6_1.people_group.md)
Right side is [People list](./milestone_6_2.people_list.md)

> [!WARNING]
> Please, do not use any timers or intervals to update Group or People list! Only manual triggers
> are allowed.


## Examination

### Profit

- default page for authorized user: **10 points**
- page is divided on 2 vertical sections with independent content: **5 points**

#### Group section (left)

- the list of available groups is loaded if user opens this page first time: **5 points**
- the list item created by current user should contain _Delete_ button: **10 points**
- the confirmation modal appears after clicking on _Delete_ button on list item with _Cancel_,
  _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the
  http-request is sent and item is removed from the list after succeeded response: **15 points**
- clicking on _Update_ button sends corresponding http-request and update group
  list if succeeded: **10 points**
- countdown appears for 1 minute after clicking on _Update_ button
  (except if error occurs): **10 points**
- _Update_ button is disabled after clicking during updating and until the timer
  is active: **5 points**
- clicking on _Create_ button the modal window is opened. There is form with validation and
  submit button: **10 points**
- submit button in modal window should be disabled until form is valid: **5 points**
- clicking on submit button in modal window the appropriate http-request is sent to create new
  group. Modal window is closed only if http-request succeeded: **15 points**
- [toast messages](../README.md#toast) with appropriate text are displayed if http-request fails or
  succeed: **10 points**
- clicking on list item the user is redirected to group dialog page: **5 points**

#### People list (right)

- the list of people is loaded if user opens this page first time: **10 points**
- the list item with which current user already has active conversation has
  special background: **10 points**
- clicking on _Update_ button sends corresponding http-request and update people list
  if succeeded: **10 points**
- countdown appears for 1 minute after clicking on _Update_ button
  (except if error occurs): **10 points**
- _Update_ button is disabled after clicking during updating and until the
  timer is active: **5 points**
- clicking on list item the user is redirected to personal conversation page. New conversation (via
  certain http-request) is created if it has not already created before transition: **15 points**

### Fines

#### Group section

- list of groups via `/groups/list` is automatically loaded more than once during 1 browser
  session (until the user refreshes the page) if user do not click _Update_ button. For instance,
  when user navigates through the pages, sends new messages, deletes or creates
  group(s): **-30 points**

#### People list

- list of conversations via `/conversations/list` is automatically loaded more than once during 1
  browser session (until the user refreshes the page) if user do not click _Update_ button. For
  instance, when user navigates through the pages, sends new messages, deletes or creates
  conversation(s): **-20 points**
- list of users via `/users` is automatically loaded more than once during 1 browser session (until
  the user refreshes the page) if user do not click _Update_ button. For instance, when user
  navigates through the pages, sends new messages, deletes or creates
  conversation(s): **-20 points**

