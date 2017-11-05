[![Build Status](https://travis-ci.org/Celoka/post-it-app.svg?branch=chore%2Ffeedback-implementation)](https://travis-ci.org/Celoka/post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/Celoka/post-it-app/badge.svg?branch=chore%2Ffeedback-implementation)](https://coveralls.io/github/Celoka/post-it-app?branch=chore%2Fserver-side-test)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
![hound status](https://img.shields.io/badge/Protected%20by-Hound-green.svg)
# Post-It

Post-It allows for unprecedented interaction and collaboration amongst its users who are within a particular group. It provides REST API for a group messaging system. It also allows for notification so that group members can read a message when a member shares it in the group. 


## Getting Started
* Install NodeJs
* Clone the project from repository `$ git clone https://github.com/Celoka/post-it-app`
* In your terminal, cd into the cloned folder like so `$ cd /post-it-app`
* Run npm install, this installs all the app's dependencies`$ npm install`
* Create a `.env` file in your root directory as described in `.env.sample file`
* Run `npm run start-dev` in your terminal, open your browser and enter `localhost:8000`. 
* Alternatively, you can access the app on [elokat-postit.herokuapp.com](https://eloka-postit.herokuapp.com)


## App Features

* A user can Sign Up
* A user can Sign In
* A user can create a user group
* A user can add other registered users to the group
* A user can post a broadcast message to a user group
* A user can view broadcast messages posted to a user group
* A user can get Email and SMS notification depending on the priority level of the message posted to a user group
* A user can sign in with a Google account
* A user can reset password


## Technology
This application was developed purely with JavaScript using React and Flux Architecture, NodeJs and Express.

**Module Dependencies**
* Firebase
* Nodemailer
* Axios
* Nexmo

## Coding Style
* Airbnb: Airbnb is a coding style guide that guides developers to write clean codes
## Testing
All app components, actions, and stores were tested using [Facebook's Jest](https://facebook.github.io/jest/). The test files can be found in the client folder.
As well, server side test files are contained in the server folder.

* To run the tests, run `npm run client-test` on the command line. This automatically runs jest on all test files for the client side tests.
* You can also run jest directly. However, jest-cli needs to be globally installed on your machine.
* Equally, to run the server side test, run `npm test ` on the command line. 


## Contributing
* Fork this repository.
* Clone it.
* Create your feature branch on your local machine with git checkout -b your-feature-branch
* Push your changes to your remote branch with git push origin your-feature-branch
* Open a pull request to the master branch, and describe how your feature works
* Refer to this wiki for proper [GIT CONVENTION](https://github.com/Celoka/post-it-app/wiki)
* Ensure your codes follow [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

## Limitations
The app is continuously being developed and so far has the listed limitaions:
```
- Users cannot upload their picture
- Users cannot choose to accept or reject an invitation request
- Users cannot leave a group
- A user cannot be deleted from a group
- A user group cannot be deleted
- Users cannot delete a message when sent
- The application is designed to accommodate limited users as the firebase database used for the project is a free account. The UI/UX needs more modification.
```

## FAQ
#### What is Post It ?
* Post It is an application that mirrors the modern day social medial chat applications, where users can create a broadcast group, share information amongst themselves and also familiarize with registered members.
#### Is Post It free ?
* Post It application is free for anyone who wants to become a member.

#### Can I contribute to the development of the application ?
* Yes! Contributions are welcomed. Anyone who intends to contribute to the development of the application can follow the guide line already stated in this file above.

For further questions, contact me via eloka.chima@andela.com

## Acknowlegdement 
* Andelans
* Friends
* Learning Facilitator
* Family

## LICENSE

This project is authored by [Eloka Chima](https://github.com/Celoka) it is licensed under the [MIT](https://github.com/Celoka/post-it-app/blob/chore/feedback-implementation/LICENSE) license.