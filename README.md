# Uber Sudoku

**[Demo Link](https://peaceful-citadel-7821.herokuapp.com/)** *(Note: this is a heroku app so the name is generic and the load times may be bad, as it will sleep after an hour.)*

A simple Sudoku app for the Uber coding challenge. It currently only has one board, but it would be nice to add a random board generator in the future. I planned my design to be clean and simple with little noise. I used the [Uber Brand's](http://brand.uber.com/) colors for simplicity.

As the user enters choices, they will be notified of conflicts by a yellow highlighting of the number. On the game's completion, they will be given the option to start again (with the same puzzle.) 

## Development

In my development, I tried to use the minimal amount of libraries that would optimize my time. I chose to use **ECMAScript 2015** (ES6) in my code because of my comfort with the lexical scope introduced by *let*, arrow functions, and the module system. The module system allows me to split my code in an easily readable and formal pattern. Beyond that, ES6 is just fun!

I chose **Less** as my css pre-processor because of its simplicity and my overall comfort with the tool. I used some of the nicer features, such as nesting and variables. While nesting can be annoying when refactoring the html structure, I felt confident in the structure. For large scale projects it can be nice to use more specific css classes.

I used **webpack** as my bundler, which will not only bundle all of my javascript and less assets, but also transpile the ES6 to standard javascript useable in modern browsers. I chose not to use a more general build system like **gulp** or **grunt** because I didn't think it would be necessary for such a small project.

As far as small utility libraries go, I only chose to use **Immutable.js** and **jQuery**. jQuery was important for the necessary DOM manipulation helper functions. I used Immutable because I wanted to avoid Javascript's pass-by-reference pattern. I only had to instantiate one Immutable List for my isGameOver checking algorithm instead of one for each block. I also didn't have to worry about my constants being mutated on each export, so I could create a new game based off of the same array as many times as I needed. Beyond that, the basic helper functions are easy for me to understand.

I used **Node** and **Express** for my server side, even though it's mainly serving static assets. It's the simplest way of deploying it. Maybe **Express** is more than what was needed here, but I am comfortable with using it and deploying quickly.

To run locally, just run ```npm start``` in your terminal.

## Testing

Make sure you have **Mocha** installed globally by running ```npm i -g mocha```. In order to run the tests, run ```npm test```. The command will also handle the transpilation to ES6.

The current tests only handle the "Controller" logic. I test the addMove() and the isGameOver() functions. In the future, I would also include UI tests using **Selenium** or **JSDOM**.

I used **Mocha** and **Chai** for standard BDD testing. I used the *should* syntax over the *expect* syntax only because it makes your tests flow like a sentence.

## Deployment

I deployed to Heroku because it's easy to push small apps to, and it's free. The only downside is that the initial load time of the app will be slow, because it will sleep after an hour of activity.

## Future

* Improve unit tests to test UI as well.
* Migrate to React / Redux implementation
* Add random board generator with backtracking algorithm
* Add difficulty chooser
* Add ability for user to save guesses for squares while thinking