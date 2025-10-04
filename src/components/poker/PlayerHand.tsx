"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface Card {
  rank: string;
  suit: string;
}

interface PlayerHandProps {
  cards: Card[];
  isActive: boolean;
}

const PlayerHand = ({ cards, isActive }: PlayerHandProps) => {
  if (cards.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No cards dealt yet
      </div>
    );
  }

  return (
    <div className={cn(
      "flex justify-center space-x-4 p-4 rounded-lg",
      isActive && "bg-yellow-500/20 border-2 border-yellow-500"
    )}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "w-20 h-28 rounded-lg border-4 flex items-center justify-center font-bold text-2xl shadow-lg transform hover:scale-105 transition-transform",
            card.suit === '♥' || card.suit === '♦' 
              ? "bg-white text-red-500 border-red-500" 
              : "bg-white text-black border-black"
          )}
        >
          <div className="text-center">
            <div>{card.rank}</div>
            <div className="text-3xl">{card.suit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerHand;