// Slot machine types and interfaces

export type Symbol = 'coin' | 'sword' | 'shield' | 'axe' | 'book';

export interface ReelPosition {
  reelIndex: number;
  symbolIndex: number;
}

export interface GameState {
  balance: number;
  bet: number;
  isSpinning: boolean;
  reelPositions: number[];
}

export interface WinLine {
  positions: number[];
  symbol: Symbol;
  multiplier: number;
}

export const SYMBOLS: Symbol[] = ['coin', 'sword', 'shield', 'axe', 'book'];

// Symbol weights - higher weight = more common (for 97% RTP with 5 symbols)
export const SYMBOL_WEIGHTS: Record<Symbol, number> = {
  'coin': 40,   // Most common - easy wins
  'sword': 30,  // Very common
  'shield': 20, // Common
  'axe': 8,     // Less common
  'book': 2     // Rare but good payout (legendary book)
};

export const PAYOUTS: Record<Symbol, number> = {
  'coin': 1,    // Low payout but very frequent
  'sword': 2,   // Good frequency
  'shield': 4,  // Decent payout
  'axe': 10,    // Nice payout
  'book': 50    // Big win - legendary
};

// Helper function to get weighted random symbol
export function getWeightedSymbol(): Symbol {
  const totalWeight = Object.values(SYMBOL_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const symbol of SYMBOLS) {
    random -= SYMBOL_WEIGHTS[symbol];
    if (random <= 0) {
      return symbol;
    }
  }
  
  return SYMBOLS[0]; // Fallback
}

export const REEL_COUNT = 5;
export const SYMBOLS_PER_REEL = 3;
export const MIN_BET = 5;
export const MAX_BET = 500;
export const BET_INCREMENT = 5;
