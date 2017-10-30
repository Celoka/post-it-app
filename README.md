[![Build Status](https://travis-ci.org/Celoka/post-it-app.svg?branch=chore%2Ffeedback-implementation)](https://travis-ci.org/Celoka/post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/Celoka/post-it-app/badge.svg?branch=chore%2Ffeedback-implementation)](https://coveralls.io/github/Celoka/post-it-app?branch=chore%2Fserver-side-test)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
# Post-It

Post-It allows for unprecedented interaction and collaboration amongst its users who are within a particular group. It provides REST API for a group messaging system. It also allows for notification so that group members can read a message when a member shares it in the group. 

## Features

* **Users:** A user created will be able to do the following: 

1. Create an account: User can create new account.
2. Create a new group: A user can create a new group.
3. Add registered members: User can registered members to new groups.
4. Post message to group: A user can post a message to group, based on the priority level of the message, group members can either receive an email or a text message. They can receive notifications on their message board. Group members can as well be able to post messages to the group.


* **Authentication:**  Users are authenticated and validated using Firebase authentication. By generating a token on login, API endpoints are protected from unauthorized access and requests to protected routes are validated using the generated token.

# Development

Post-It app is built with the following technologies;

* Javascript EcmaScript6 (ES6)
* NodeJs
* Express
* Firebase
* Nodemailer
* React/Flux architecture

# Installation

* Install NodeJs
* Clone the repository `$ git clone https://github.com/Celoka/post-it-app`
* Change into the directory `$ cd /post-it-app`
* Install all required dependencies with `$ npm install`
* Create a `.env` file in your root directory as described in `.env.sample file`
* Start the app with `npm start`

# Contributing

* Fork this repository to your GitHub account
* Clone the forked repository
* Create your feature branch
* Commit your changes.
* To commit your changes, we recommend that commit messages have a Header, Body and Footer, like so:

```
feature(): This feature addresses some particular issue(s):
- implements functionality A.
- implements functionality B.
[Finishes #STORY_ID]
```

* Push to the remote branch
* Create a pull request,it is recommended that the pull requests follows the convention shown below:

```
- What does this PR do?
- Description of Task to be completed?
- How should this be manually tested?
- Any background context you want to provide?
- What are the relevant pivotal tracker stories?
- Screenshots (if appropriate)
- Questions:
```

# Limitations

The limitations of the API are:

* The application is designed to accommodate limited users as the firebase database used for the project is a free account. The UI/UX needs more modification.

# FAQ

If there are any question you want to ask, contact me via mail eloka.chima@andela.com

# LICENSE

This project is authored by [Eloka Chima](https://github.com/Celoka) it is licensed under the MIT license.