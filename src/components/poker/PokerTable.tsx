"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { User, Coins } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  chips: number;
  currentBet: number;
  isActive: boolean;
  hasFolded: boolean;
  position: string;
}

interface PokerTableProps {
  players: Player[];
  communityCards: any[];
  currentPlayer: number;
  pot: number;
}

const PokerTable = ({ players, communityCards, currentPlayer, pot }: PokerTableProps) => {
  const getPlayerPosition = (index: number) => {
    const positions = [
      'bottom-left', 'bottom-center', 'bottom-right',
      'right', 'top-right', 'top-center', 'top-left', 'left'
    ];
    return positions[index] || 'bottom-center';
  };

  return (
    <div className="relative w-full h-96 bg-green-600 rounded-full border-8 border-yellow-600 shadow-2xl">
      {/* Table Center - Community Cards and Pot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Pot Display */}
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-lg">
            <div className="flex items-center">
              <Coins className="w-5 h-5 mr-2" />
              Pot: ${pot}
            </div>
          </div>
          
          {/* Community Cards */}
          <div className="flex space-x-2 justify-center">
            {communityCards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "w-12 h-16 rounded-lg border-2 flex items-center justify-center font-bold text-lg",
                  card.suit === '♥' || card.suit === '♦' ? "bg-white text-red-500 border-red-500" : "bg-white text-black border-black"
                )}
              >
                {card.rank}{card.suit}
              </div>
            ))}
            {communityCards.length === 0 && (
              <div className="text-white text-sm">Community cards will appear here</div>
            )}
          </div>
        </div>
      </div>

      {/* Player Positions */}
      {players.map((player, index) => {
        const position = getPlayerPosition(index);
        const isCurrentPlayer = currentPlayer === player.id && player.isActive;
        
        return (
          <div
            key={player.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2",
              position.includes('bottom') && "bottom-4",
              position.includes('top') && "top-4",
              position.includes('left') && "left-1/4",
              position.includes('center') && "left-1/2",
              position.includes('right') && "right-1/4"
            )}
          >
            <Card className={cn(
              "p-3 min-w-32",
              isCurrentPlayer && "ring-4 ring-yellow-400",
              player.hasFolded && "opacity-50"
            )}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-sm font-medium">{player.name}</div>
                <div className="text-xs text-gray-600">${player.chips}</div>
                {player.currentBet > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Bet: ${player.currentBet}
                  </Badge>
                )}
                {player.hasFolded && (
                  <Badge variant="destructive" className="text-xs">
                    Folded
                  </Badge>
                )}
                {isCurrentPlayer && (
                  <Badge className="bg-yellow-500 text-black text-xs">
                    Your Turn
                  </Badge>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default PokerTable;