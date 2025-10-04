"use client";
import { useState, useEffect, useCallback } from 'react';

interface Card {
  rank: string;
  suit: string;
}

interface Player {
  id: number;
  name: string;
  chips: number;
  currentBet: number;
  isActive: boolean;
  hasFolded: boolean;
  hand: Card[];
  handsWon: number;
  handsLost: number;
}

interface GameState {
  deck: Card[];
  players: Player[];
  communityCards: Card[];
  pot: number;
  currentPlayer: number;
  gamePhase: string;
  gameState: string;
  currentBet: number;
}

const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

export const usePokerGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    deck: [],
    players: [],
    communityCards: [],
    pot: 0,
    currentPlayer: 0,
    gamePhase: 'preflop',
    gameState: 'waiting',
    currentBet: 0
  });

  // Initialize deck
  const createDeck = useCallback((): Card[] => {
    const deck: Card[] = [];
    CARD_SUITS.forEach(suit => {
      CARD_RANKS.forEach(rank => {
        deck.push({ rank, suit });
      });
    });
    return deck;
  }, []);

  // Shuffle deck
  const shuffleDeck = useCallback((deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Deal cards
  const dealCards = useCallback((deck: Card[], numCards: number): { cards: Card[]; remainingDeck: Card[] } => {
    const cards = deck.slice(0, numCards);
    const remainingDeck = deck.slice(numCards);
    return { cards, remainingDeck };
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    let deck = shuffleDeck(createDeck());
    const players: Player[] = [
      { id: 0, name: 'You', chips: 1000, currentBet: 0, isActive: true, hasFolded: false, hand: [], handsWon: 0, handsLost: 0 },
      { id: 1, name: 'Alice', chips: 1000, currentBet: 0, isActive: true, hasFolded: false, hand: [], handsWon: 0, handsLost: 0 },
      { id: 2, name: 'Bob', chips: 1000, currentBet: 0, isActive: true, hasFolded: false, hand: [], handsWon: 0, handsLost: 0 },
      { id: 3, name: 'Charlie', chips: 1000, currentBet: 0, isActive: true, hasFolded: false, hand: [], handsWon: 0, handsLost: 0 }
    ];

    // Deal hole cards
    players.forEach(player => {
      const { cards, remainingDeck } = dealCards(deck, 2);
      player.hand = cards;
      deck = remainingDeck;
    });

    setGameState({
      deck,
      players,
      communityCards: [],
      pot: 0,
      currentPlayer: 0,
      gamePhase: 'preflop',
      gameState: 'playing',
      currentBet: 0
    });
  }, [createDeck, shuffleDeck, dealCards]);

  // Start new game
  const startNewGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      deck: [],
      players: [],
      communityCards: [],
      pot: 0,
      currentPlayer: 0,
      gamePhase: 'preflop',
      gameState: 'waiting',
      currentBet: 0
    });
  }, []);

  // Perform action
  const performAction = useCallback((action: string, amount?: number) => {
    setGameState(prev => {
      const newState = { ...prev };
      const currentPlayerObj = newState.players[newState.currentPlayer];

      switch (action) {
        case 'fold':
          currentPlayerObj.hasFolded = true;
          break;
        case 'check':
          // Player checks, no action needed
          break;
        case 'call':
          const callAmount = newState.currentBet - currentPlayerObj.currentBet;
          if (currentPlayerObj.chips >= callAmount) {
            currentPlayerObj.chips -= callAmount;
            currentPlayerObj.currentBet = newState.currentBet;
            newState.pot += callAmount;
          }
          break;
        case 'raise':
          if (amount && currentPlayerObj.chips >= amount) {
            const raiseAmount = amount - currentPlayerObj.currentBet;
            currentPlayerObj.chips -= raiseAmount;
            currentPlayerObj.currentBet = amount;
            newState.currentBet = amount;
            newState.pot += raiseAmount;
          }
          break;
      }

      // Move to next player
      let nextPlayer = (newState.currentPlayer + 1) % newState.players.length;
      while (newState.players[nextPlayer].hasFolded) {
        nextPlayer = (nextPlayer + 1) % newState.players.length;
      }
      newState.currentPlayer = nextPlayer;

      // Check if betting round is complete
      const activePlayers = newState.players.filter(p => !p.hasFolded);
      if (activePlayers.every(p => p.currentBet === newState.currentBet || p.hasFolded)) {
        // Advance to next phase
        switch (newState.gamePhase) {
          case 'preflop':
            // Deal flop
            const { cards: flopCards, remainingDeck: deckAfterFlop } = dealCards(newState.deck, 3);
            newState.communityCards = flopCards;
            newState.deck = deckAfterFlop;
            newState.gamePhase = 'flop';
            newState.currentBet = 0;
            newState.players.forEach(p => p.currentBet = 0);
            break;
          case 'flop':
            // Deal turn
            const { cards: turnCards, remainingDeck: deckAfterTurn } = dealCards(newState.deck, 1);
            newState.communityCards.push(...turnCards);
            newState.deck = deckAfterTurn;
            newState.gamePhase = 'turn';
            newState.currentBet = 0;
            newState.players.forEach(p => p.currentBet = 0);
            break;
          case 'turn':
            // Deal river
            const { cards: riverCards, remainingDeck: deckAfterRiver } = dealCards(newState.deck, 1);
            newState.communityCards.push(...riverCards);
            newState.deck = deckAfterRiver;
            newState.gamePhase = 'river';
            newState.currentBet = 0;
            newState.players.forEach(p => p.currentBet = 0);
            break;
          case 'river':
            newState.gamePhase = 'showdown';
            newState.gameState = 'finished';
            break;
        }
      }

      return newState;
    });
  }, [dealCards]);

  // Computed properties
  const canCheck = gameState.currentBet === 0 || gameState.players[gameState.currentPlayer]?.currentBet === gameState.currentBet;
  const canCall = gameState.currentBet > 0 && gameState.players[gameState.currentPlayer]?.currentBet < gameState.currentBet;
  const canRaise = gameState.players[gameState.currentPlayer]?.chips > 0;
  const minRaise = Math.max(gameState.currentBet + 10, 10);
  const maxRaise = gameState.players[gameState.currentPlayer]?.chips || 0;

  return {
    gameState: gameState.gameState,
    players: gameState.players,
    currentPlayer: gameState.currentPlayer,
    pot: gameState.pot,
    communityCards: gameState.communityCards,
    gamePhase: gameState.gamePhase,
    canCheck,
    canCall,
    canRaise,
    minRaise,
    maxRaise,
    performAction,
    startNewGame,
    resetGame
  };
};