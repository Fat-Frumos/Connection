## Milestone 6.1. Group list

**Score:** 100

Each of users can observe all available groups to broadcast messages. There is no private groups!
Also, user can create new one that will be visible for all other users.

### Visualization

Left half of the primary page consist of:

**_Update_ button**  
_Update_ button refreshes the group list by sending http-request and renders obtained list.

User can update the list no more than once a minute! Countdown must be present near the _Update_
button till the next update is possible. If time is out countdown disappears.
This state should be preserved even after transition to other pages and back.

**_Create_ button**  
_Create_ button opens modal window with a reactive form where user can enter `name`. Using
endpoint (below) application creates new group and append it into the list **without** retrieving
all group list with http-request again.

Form validation:

- `name` is not more than 30 symbols;
- `name` contains only letters, digits or spaces;

**List of groups**  
Simple list with **clickable items as a link** and extra delete button at the right of the name for
the groups were created by current user.

Clicking on item user is redirected to dedicated page with routing `/group/{:groupID}`

Confirmation modal window appears after clicking on delete group icon. If confirmation was accepted
using http-request the group is deleted and group is being removed from the list **without**
obtaining all group list with http-request again.

_rough example of group list_:  
`---------------------------------`  
`|` Someone's Group name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `|`  
`---------------------------------`  
`|` My Group
name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10006; `|`  
`---------------------------------`  
`|` Someone's Group name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `|`  
`---------------------------------`

### Endpoint

> `GET` https://tasks.app.rs.school/angular/groups/list

Retrieves list of available groups which can be used to broadcast messages.

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
      "name": {
        "S": "string"
      },
      "createdAt": {
        "S": "string"
      },
      "createdBy": {
        "S": "string"
      }
    }
  ]
}
```

---

> `POST` https://tasks.app.rs.school/angular/groups/create

Creates new group with specific name. Owner will be able to delete created group.


#### Request body

| Property | Type     | Description    |
| -------- | -------- | -------------- |
| `name`   | `string` | new group name |

#### Response

_status code_ **201**  
_json_ format

```json
{
  "groupID": "y5kse1rcgh"
}
```

---

> `DELETE` https://tasks.app.rs.school/angular/groups/delete?groupID={:groupID}

Deletes group by owner.

#### Request query

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `groupID` | `string` | unique group identifier |

#### Response

_status code_ **200**

