"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  chips: number;
  currentBet: number;
  isActive: boolean;
  hasFolded: boolean;
  handsWon: number;
  handsLost: number;
}

interface GameStatsProps {
  players: Player[];
  currentPlayer: number;
}

const GameStats = ({ players, currentPlayer }: GameStatsProps) => {
  const getStatusIcon = (player: Player) => {
    if (player.hasFolded) return <Minus className="w-4 h-4 text-gray-400" />;
    if (player.chips > 1000) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <Card className="bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white text-sm">Player Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className={`p-3 rounded-lg border ${
                currentPlayer === player.id
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{player.name}</span>
                {getStatusIcon(player)}
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Chips:</span>
                  <span className={player.chips > 1000 ? 'text-green-400' : 'text-red-400'}>
                    ${player.chips}
                  </span>
                </div>
                
                {player.currentBet > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Current Bet:</span>
                    <span className="text-blue-400">${player.currentBet}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-300">
                  <span>Record:</span>
                  <span>{player.handsWon}W - {player.handsLost}L</span>
                </div>
              </div>
              
              {player.hasFolded && (
                <Badge variant="destructive" className="text-xs mt-2">
                  Folded
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;