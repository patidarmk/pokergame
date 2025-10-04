"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Coins, User, RotateCcw, Play, Pause } from 'lucide-react';
import PokerTable from '@/components/poker/PokerTable';
import PlayerHand from '@/components/poker/PlayerHand';
import GameControls from '@/components/poker/GameControls';
import BettingControls from '@/components/poker/BettingControls';
import GameStats from '@/components/poker/GameStats';
import { usePokerGame } from '@/hooks/use-poker-game';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const PokerGame = () => {
  const {
    gameState,
    players,
    currentPlayer,
    pot,
    communityCards,
    gamePhase,
    canCheck,
    canCall,
    canRaise,
    minRaise,
    maxRaise,
    performAction,
    startNewGame,
    resetGame
  } = usePokerGame();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [raiseAmount, setRaiseAmount] = useState(0);

  const handleAction = (action: string, amount?: number) => {
    performAction(action, amount);
    setSelectedAction(null);
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'preflop': return 'Pre-flop';
      case 'flop': return 'Flop';
      case 'turn': return 'Turn';
      case 'river': return 'River';
      case 'showdown': return 'Showdown';
      default: return phase;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Texas Hold'em Poker</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-lg">
                  Pot: ${pot}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {getPhaseLabel(gamePhase)}
                </Badge>
                {gameState === 'playing' && (
                  <Badge className="bg-yellow-500 text-black">
                    Player {currentPlayer + 1}'s Turn
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={startNewGame}
                disabled={gameState === 'playing'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                New Game
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-900"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Poker Table */}
            <Card className="bg-green-700 border-green-600">
              <CardContent className="p-6">
                <PokerTable
                  players={players}
                  communityCards={communityCards}
                  currentPlayer={currentPlayer}
                  pot={pot}
                />
              </CardContent>
            </Card>

            {/* Player Hand */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Your Hand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlayerHand
                  cards={players[0]?.hand || []}
                  isActive={currentPlayer === 0 && gameState === 'playing'}
                />
              </CardContent>
            </Card>

            {/* Game Controls */}
            {gameState === 'playing' && currentPlayer === 0 && (
              <Card className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Your Turn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <GameControls
                    onFold={() => handleAction('fold')}
                    onCheck={() => handleAction('check')}
                    onCall={() => handleAction('call')}
                    onRaise={() => setSelectedAction('raise')}
                    canCheck={canCheck}
                    canCall={canCall}
                    canRaise={canRaise}
                    callAmount={players[1]?.currentBet || 0}
                  />
                  
                  {selectedAction === 'raise' && (
                    <BettingControls
                      minAmount={minRaise}
                      maxAmount={maxRaise}
                      currentAmount={raiseAmount}
                      onAmountChange={setRaiseAmount}
                      onConfirm={() => handleAction('raise', raiseAmount)}
                      onCancel={() => setSelectedAction(null)}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Stats */}
            <GameStats players={players} currentPlayer={currentPlayer} />

            {/* Game Log */}
            <Card className="bg-gray-800 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Game Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300 max-h-64 overflow-y-auto">
                  <div className="text-green-400">Game started</div>
                  <div className="text-blue-400">Player 2 bet $10</div>
                  <div className="text-yellow-400">Player 3 called</div>
                  <div className="text-red-400">Player 4 folded</div>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="bg-gray-800 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">How to Play</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-300 space-y-1">
                  <p>• Each player gets 2 hole cards</p>
                  <p>• 5 community cards are dealt</p>
                  <p>• Make the best 5-card hand</p>
                  <p>• Bet, call, raise, or fold</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default PokerGame;