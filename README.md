# Uber Sudoku

A simple Sudoku app for the Uber coding challenge.

## Development

In my development, I tried to use the minimal amount of libraries that would optimize my time. I chose to use **ECMAScript 2015** (ES6) in my code because of my comfort with the lexical scope introduced by *let*, arrow functions, and the module system. The module system allows me to split my code in an easily readable and formal pattern. I chose **Less** as my css pre-processor because of its simplicity and my overall comfort with the tool.

I used **webpack** as my bundler, which will not only bundle all of my javascript and less assets, but also transpile the ES6 to standard javascript useable in modern browsers. I chose not to use a more general build system like **gulp** or **grunt** because I didn't think it would be necessary for such a small project.

As far as small utility libraries go, I only chose to use **Immutable.js** and **jQuery**. jQuery was important for the necessary DOM manipulation helper functions. I used Immutable because I am uncomfortable with Javascript's pass-by-reference methods. I only had to instantiate one Immutable List for my isGameOver checking algorithm instead of one for each block. I also didn't have to worry about my constants being mutated on each export, so I could create a new game based off of the same array as many times as I needed. Beyond that, the basic helper functions are easy for me to understand.

## Testing

Make sure you have **mocha** installed globally by running ```npm i -g mocha```. In order to run the tests, run npm test. The command will also handle the transpilation to ES6.

The current tests only handle the "Controller" logic. I test the addMove() and the isGameOver() functions. In the future, I would also include UI tests using **Selenium** or JSDOM.

## Deployment

I deployed to Heroku because it's easy to push small apps to, and it's free. The only downside is that the initial load time of the app will be slow, because it will sleep after an hour of activity. 