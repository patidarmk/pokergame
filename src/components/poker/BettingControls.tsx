"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Check, X } from 'lucide-react';

interface BettingControlsProps {
  minAmount: number;
  maxAmount: number;
  currentAmount: number;
  onAmountChange: (amount: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const BettingControls = ({
  minAmount,
  maxAmount,
  currentAmount,
  onAmountChange,
  onConfirm,
  onCancel
}: BettingControlsProps) => {
  const handleSliderChange = (value: number[]) => {
    onAmountChange(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onAmountChange(Math.max(minAmount, Math.min(maxAmount, value)));
  };

  return (
    <div className="space-y-4 p-4 bg-gray-700 rounded-lg">
      <div className="space-y-2">
        <Label className="text-white">Raise Amount: ${currentAmount}</Label>
        <Slider
          value={[currentAmount]}
          min={minAmount}
          max={maxAmount}
          step={5}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={currentAmount}
            onChange={handleInputChange}
            min={minAmount}
            max={maxAmount}
            step={5}
            className="bg-gray-800 text-white border-gray-600"
          />
          <span className="text-gray-400 text-sm">Min: ${minAmount} - Max: ${maxAmount}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button
          onClick={onConfirm}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <Check className="w-4 h-4" />
          <span>Confirm Raise</span>
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex items-center justify-center space-x-2 border-gray-400 text-gray-400 hover:bg-gray-600"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default BettingControls;