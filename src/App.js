import React, { Component } from 'react';
import logo from './logo.svg';
import Client from 'boardgame.io/client';
import TicTacToe from './TicTacToe';
import GameBoard from './GameBoard';
import './App.css';

const App = Client({game : TicTacToe,board : GameBoard});

export default App;
