"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Hand, Check, Phone, TrendingUp } from 'lucide-react';

interface GameControlsProps {
  onFold: () => void;
  onCheck: () => void;
  onCall: () => void;
  onRaise: () => void;
  canCheck: boolean;
  canCall: boolean;
  canRaise: boolean;
  callAmount: number;
}

const GameControls = ({
  onFold,
  onCheck,
  onCall,
  onRaise,
  canCheck,
  canCall,
  canRaise,
  callAmount
}: GameControlsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        onClick={onFold}
        variant="destructive"
        className="flex items-center space-x-2"
      >
        <Hand className="w-4 h-4" />
        <span>Fold</span>
      </Button>

      {canCheck ? (
        <Button
          onClick={onCheck}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Check</span>
        </Button>
      ) : (
        <Button
          onClick={onCall}
          disabled={!canCall}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call ${callAmount}</span>
        </Button>
      )}

      <Button
        onClick={onRaise}
        disabled={!canRaise}
        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
      >
        <TrendingUp className="w-4 h-4" />
        <span>Raise</span>
      </Button>
    </div>
  );
};

export default GameControls;