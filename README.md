# **OVERLOOK**
The details of this project are outlined in [Overlook - Solo Project](https://frontend.turing.edu/projects/overlook.html).

### Description
This project is the final solo project for Mod2 of Turing Coding School. The purpose of this project is to use API data and create different classes with methods and to use the API data to to create functionality to be displayed to the DOM. This project is meant to be a hotel booking page that a user can log-in and choose from a varity of rooms. Deployment link [GitHub Pages](https://pages.github.com/).

### Gif of Working Project:

TBD

### Contributors
- Timothy Pendarvis [GitHub](https://github.com/Trpendarvis)

### Challenges:

### Issues: 
Current issues to be addressed are:
- [X] No known major issues or bugs.
- [X] function can to be cleaned up and refactored with newer technologies, such as React at a later date, at the original time of this project React is not a learned tech.
- [ ] 

### Type of change/ Goals:
- [ ] Complete Iteration 5. 
- [ ] Refactoring of code. 
- [ ] Needs to track down any future bugs and fix them after refactoring.
- [ ] CSS polishing and rework.
- [ ] Add in Charts.js for further improve UX/UI.

### How Has This Been Tested?
Using Mocha/Chai testing run "npm test" all test for tested classes has been completed and are passing.
**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.
All test are complete and passing:

- [ ] Test A: 
- [ ] Test B: 
- [ ] Test C: 
- [ ] Test D: 

## Running Tests
Run your test suite using the command:

'npm test'

The test results will output to the terminal.

## Checklist:
- [X] All code follows the style guidelines set by Turing.
- [ ] Comments have been removed from code.
- [ ] Syntax has been checked for consistency.
- [X] All git workflow was followed to show clear progress.
- [ ] ***Iteration 1***: Dashboard:
	- Any room bookings I have made (past or upcoming).
	- The total amount I have spent on rooms.
- [ ] ***Iteration 2***: Customer Interaction:
	- I should be able to select a date for which I’d like to book a room for myself.
	- Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date.
    - I should be able to filter the list of available rooms by their roomType property.
    - I should be able to select a room for booking.
    - In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search.
- [ ] Iteration 3: Accessibility:
    - Create a branch for accessibility.
    - Use this branch to make your dashboard as accessible as possible.
    - Push this branch up to GH. You can merge the changes into main but do not delete this branch. (this is to check for accessibility without the log-in page interferring with the test).
- [ ] ***Iteration 4***: Login
    - Create a log-in page before granting access to the dashboard page.
    - When first arriving at the site, a user should be able to log in with a username and password.
    - Upon successfully logging in, I should see my dashboard.
    - username: "customer50" (50 is the ID of the user), password: "overlook2021".
- [ ] ***Iteration 5***: (Optional) Manager Interaction:
    - I should be able to login as the manager.
    - username: "manager", password: "overlook2021".
    - I should see a dashboard page that shows me:
        - Total Rooms Available for today’s date.
        - Total revenue for today’s date.
        - Percentage of rooms occupied for today’s date.
    - I should be able to search for any user by name and:
        - View their name, a list of all of their bookings, and the total amount they’ve spent.
        - Add a room booking for that user.
        - Delete any upcoming room bookings for that user (they cannot delete a booking from the past).

### Setup
If you would like to view the code and its inner working please follow the steps below, or you can follow this deployment link [GitHub Pages](https://pages.github.com/).
1. Fork this repo - on the top right corner of this page, click the **Fork** button.
1. Clone down the _forked_ repo. `git clone [remote-address] [what you want to name the repo]`
1. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
1. Run `npm start` in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page).  `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.   
1. Set all collaborators on the forked repo.  
1. Do not run `npm audit fix --force`.  This will update to the latest version of packages.  We need to be using `webpack-dev-server@3.11.2` which is not the latest version.  If you start to run into Webpack errors, first check that all group members are using the correct version.  

--------------------ADDITIONAL INFORMATION--------------------------

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### Images
Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`scripts.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View The Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
