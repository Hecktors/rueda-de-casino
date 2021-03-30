# Salsa time! - Learn rueda de casino
![](./assets/img/salsa_dancing_banner.jpg)

## Description

### Introduction
In rueda de casino the moves of cuban salsa are danced in a group. The dance couples form a circle, the announcer spontaneously calls out a command and the couples perform these figures synchronously and/or exchange partners. </br> </br>
The whole thing is not a choreography, it happens out of the spontaneity of the announcer.
With up to 200 dance figures, a lot of training is required to master the dance figures and to have the appropriate move ready when it's called up. </br> </br>

### What does the app?
The application simulates this announcer. To drill the reaction and the dance figures you make a selection of moves. In the session, it calls up a random one and after a break, whose length depends on the size of this figure, the next.

---

 ![](./assets/img/readme_mock.jpg)
 
<br>

## Features
- Create, update, delete moves
- Audio files for each move name are created by google-text-to-speech plugin
- Make a selection of moves to train
- YouTube videos for moves are callable if available
- In session mode selected moves are called randomly both visually and acoustically

<br>

## Demo <img align="right" width="240" height="436" src="https://user-images.githubusercontent.com/24996874/112938088-34c5d880-9129-11eb-8630-26b6886f27a6.gif">
A hosted version can be found here:
[salsa-time.herokuapp.com](https://salsa-time.herokuapp.com/)

<br>

## Tech Stack
- React
- React Router
- React Hooks
- Styled Components
- Node.js
- Express
- Heroku
- Styleguidist
- Jest

<br>

## <code>Project setup</code>
- Clone the repository
- Enter the created folder: <code>cd &lt;repository name&gt;</code>
- Install all npm dependencies server side: <code>npm install</code>
- Install all npm dependencies client side:<code>cd client && npm install && cd..</code>
- Create on [www.mongodb.com](https://www.mongodb.com/) a database called 'salsaApp'
- Copy the given connection string
- Create a <code>.env</code> file on project root level and asign the connection string to a <code>ATLAS_URI</code> key
- Start server and client: <code>npm run dev</code>
- To run Styleguidist: <code>npm run styleguide</code>
- To run Jest unit tests: <code>npm test</code>
