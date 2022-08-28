# Employee Polls

## About
A sample project which lets Employees of an organisation create & manage Polls

## Installation
```
yarn
```

## How to Start Dev Server?
```
yarn dev
```

## Login Credentials
Login credentials for existing users:
| Username |   Password    |
|----------|:-------------:|
| tylermcginnis | abc321 |
| mtsamis | xyz123 |
| zoshikanlu | pass246 |
| t |  t  |

## Functional flow
Existing users can:
1. View existing polls
  i. View polls already answered by the user
  ii. View polls not yet answered by the user
2. only answer the Poll once and cannot change it. Given answers can be viewed however in read only mode.
3. Create new polls
4. View Leaderboard which summarises all the polls asked and answered by other users.

Ability to create new users has not yet been created.

## Mock Data
Mock Data available from https://github.com/udacity/nd0191-c2-React-Redux-project-starter/blob/main/_DATA.js has been distributed in the application in following files:
1. Users Data: https://github.com/plug-n-play/employee-polls/blob/main/src/pages/api/auth/index.js
2. Questions: https://github.com/plug-n-play/employee-polls/blob/main/src/features/questions/questionsSlice.js
3. generateUID: https://github.com/plug-n-play/employee-polls/blob/main/src/pages/add.js


## Credits
This project has been bootstrated using the official [Material UI NextJS example](https://github.com/mui/material-ui/tree/master/examples/nextjs)

Sign-in page: https://github.com/mui/material-ui/blob/v5.9.2/docs/data/material/getting-started/templates/sign-in/SignIn.js