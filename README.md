
# Slap Jack


A [Front-End Project](https://frontend.turing.io/projects/module-1/slapjack.html) by [Elizabeth Hahn](https://github.com/elizhahn) 
* Project Manager: [Hannah Hudson](https://github.com/hannahhch)


1. [Overview](#overview)
2. [Learning Goals](#learning-goals)
3. [Technologies](#technologies)
4. [Features](#features)
5. [Challenges](#challenges)
6. [Wins](#wins)
7. [Future Additions](#future-additions)


## Overview

This is a Turing School of Software and Design Module 1 project. This project entails building out a functioning Slap Jack application in which two users can play a virtual game of Slap Jack. HTML and CSS were used to create the content, layout, and styling of the game. A comp was provided, but design liberties were allowed. The application was built with simplicity in mind and bright contrasting colors. The following functionality was built: 

* A game set up which includes two players, 52 cards, and a way to shuffle the 52 cards and deal the cards to each player
* 2 players can deal a card to the middle pile using the "q" and "p" keyboard keys and the players can slap a card using the "f" and "j" keyboard keys
    - The program keeps track of whose turn it is, so only one player may deal a card at a time, and a player cannot deal a card twice in a row
    - The program will allow two players to "slap" a card but only one player will win the cards in the middle pile.
* Each player has a card count, and win count
  - The card count will display each player's current card count as they win/lose cards
  - The win count will increase and display each time a player wins and the two players continue to play again
* A successful slap includes: 
  - slapping a jack, double, or sandwich
  - player who successfully slaps, gets the cards in the middle pile
* An invalid slap includes; 
  - slapping on anything other than a jack, double, or sandwich
  - a player who slaps invalidly will forfeit the top card of their hand to the other player
* When one player is out of cards: 
  - The program enters a "last play" condition
  - The player who still has cards can now deal twice in a row, and will deal cards until a jack appears
* Winning the game includes:
  - The player with the cards at the end of the game slaps a jack during "last play" conditions when the other player is out of cards
  - The player who is out of cards at the end of the game slaps on anything other than a jack during "last play" conditions triggering the other player to win
* Redemption slaps include: 
  - When in "last play" conditions, a player who is out of cards can slap a jack to win the cards in the middle pile and get back in the game
* Updating wins and saving to storage
  - When a player wins, their win count is automatically increased and displayed
  - Their win count is saved to storage and will persist on page load
* Game choices at the end of a game
  - At the end of a successful game, the players will have two options, to play again , or play with new players
  - If the play again button is clicked, the game will reset with the current win tally
  - If the new players button is clicked, the game will reset with current wins set to 0


## Learning Goals

* Solidify and demonstrate your understanding of:
  - DRY JavaScript
  - localStorage to persist data
  - event delegation to handle similar event listeners
* Understand the difference between the data model and how the data is displayed on the DOM
* Use your problem solving process to break down large problems, solve things step by step, and trust yourself to not rely on an outside “answer” to a logical challenge


## Technologies

* HTML
* CSS
* Javascript
* Git
* GitHub

---
## Features

+ [Desktop Layout](#desktop-layout)
+ [Deal Cards](#deal-cards)
+ [Slap Cards](#slap-cards)
+ [Slap Conditions](#slap-condition)
+ [Last Play Condition](#last-play-condition)
+ [Redemption Slap](#redemption-slap)
+ [Player Wins](#player-wins)
+ [Player Game Reset Options](#player-game-reset-options)


## DeskTop Layout

The Application page will display two player piles with an empty space for the middle pile. Each player will have a card count displayed above their pile and a win count displayed below their pile. 

![](https://media.giphy.com/media/mirTQN89cRKuoEGc91/giphy.gif)


## Deal Cards

Each player will be able to start the game by dealing a card using "q" (player 1) and "p" (player 2). Player one will always start. As a card is dealt the card count should reflect how many cards each player currently has in their hand. Additionally each player has a color and when their card is dealt, their color will appear in the middle pile. 

![](https://media.giphy.com/media/0Nx8aujFcLv5ZGiGp0/giphy.gif)


## Slap Cards
Each player will be able to "slap" a card using "f" (player 1) and "j" (player 2). When a player slaps, a message will appear in the top of the window that describes the slap attempt and the outcome. The middle pile will also disappear.  

![](https://media.giphy.com/media/IaDM7cmv6ADPMKcsA7/giphy.gif)


## Slap Conditions
There are 4 slap conditions in this game. A player will win the middle pile if they slap on a jack, double, or sandwich. A player will lose a card if they slap on anything other than a jack, double, or sandwich. A corresponding message for each slap appears at the top of the window. 

### Jack

![](https://media.giphy.com/media/UGZ0HrFDnUdKF9Jqbw/giphy.gif)

### Double

![](https://media.giphy.com/media/WGz64GxSTD6RWoX3it/giphy.gif)

### Sandwich

![](https://media.giphy.com/media/B9BHkk9mWnZBO0c6k5/giphy.gif)

### Invalid 

![](https://media.giphy.com/media/tWEZrghrn0CPHo9DCc/giphy.gif)


## Last Play Conditions

When one of the players runs out of cards, their pile will disappear and they can no longer deal cards. The other player will now deal cards into the middle pile until a jack appears. The only way to win is to slap a jack in this scenario. If no one slaps a jack and the other player runs out of cards, the winning player will pick up the middle pile, the pile will be shuffled, and the cards can be dealt again. 

### Player runs out of cards
![](https://media.giphy.com/media/H6WD3bmacVomVop6o5/giphy.gif)

### Winning player runs through their deck and nothing is slapped
![](https://media.giphy.com/media/8x4Gw2AmbqV6JtLlXn/giphy.gif)

## Redemption Slap

When a player runs out of cards, they have one chance to get back in the game. If they slap a jack before the other player, they will win the cards in the middle pile and will be back in the game. Their pile will reappear and they can now deal cards again. The game will cycle on as normal. 

![](https://media.giphy.com/media/BU9VAalozWox4GCzVN/giphy.gif)

## Player Wins

There are two conditions a player can win. Under last play conditions, if the winning player deals a jack and slaps it before the other player, the game ends and that player wins. Additionally, if the player who is out of cards slaps anything other than a jack, the game ends, and the player with the cards wins. The win count for the winning player will update and be displayed. 

### Winning player slaps a jack
![](https://media.giphy.com/media/WLkURJtvSU4ZFOvKR0/giphy.gif)

### Losing player slaps invalidly
![](https://media.giphy.com/media/zRn4bmDBypHoUqfN5y/giphy.gif)

## Player Game Reset

When a player wins, there will be a small delay and a modal box will pop up with two options. Users can either click the "PLAY AGAIN" button or the "NEW PLAYERS" button. If the play again option is chosen, the game will reset and the win count will persist. If the new players option is clicked, the game will reset and the win count will be set to 0. Additionally if the page is reloaded, the win counts will persist. 

![](https://media.giphy.com/media/ATen7qGjX3UW5qRS4I/giphy.gif)
![](https://media.giphy.com/media/WxuzeNw1eZpfK7BcSE/giphy.gif)

---
## Challenges

* Last Play conditions for the game proved to be a logical challenge with the various conditions that had to change.
* Interpreting the game rules and conditions correctly
* Creating game functionality to completion before manipulating the DOM


---
## Wins

* Meeting all the project goals and adding extra functionality for user experience
* Successfully using project management and planning to execute this project in an organized and methodical fashion
* Refactoring large functions down to follow SRP and DRY javaScript conventions
* Successfuly and quickly debugging using the debugger
* Creating functinality before manipulating the DOM

---
## Future Additions

* User can choose a card deck theme
* mini card display of the last 3 cards in play above the middle pile
* User's can input their name
