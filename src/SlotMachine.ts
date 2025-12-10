import { Reel } from './Reel';
import { 
  GameState, 
  REEL_COUNT, 
  MIN_BET, 
  MAX_BET, 
  BET_INCREMENT,
  PAYOUTS,
  Symbol
} from './types';

export class SlotMachine {
  private reels: Reel[] = [];
  private state: GameState = {
    balance: 1000,
    bet: 10,
    isSpinning: false,
    reelPositions: [0, 0, 0, 0, 0]
  };

  private elements = {
    reelsContainer: document.getElementById('reelsContainer')!,
    spinBtn: document.getElementById('spinBtn')! as HTMLButtonElement,
    skipBtn: document.getElementById('skipBtn')! as HTMLButtonElement,
    autoSpinBtn: document.getElementById('autoSpinBtn')! as HTMLButtonElement,
    balanceDisplay: document.getElementById('balance')!,
    betDisplay: document.getElementById('bet')!,
    messageDisplay: document.getElementById('message')!,
    increaseBetBtn: document.getElementById('increaseBet')! as HTMLButtonElement,
    decreaseBetBtn: document.getElementById('decreaseBet')! as HTMLButtonElement
  };

  private skipRequested: boolean = false;
  private autoSpinEnabled: boolean = false;

  constructor() {
    this.initializeReels();
    this.attachEventListeners();
    this.updateDisplay();
  }

  private initializeReels(): void {
    for (let i = 0; i < REEL_COUNT; i++) {
      const reel = new Reel(this.elements.reelsContainer);
      this.reels.push(reel);
    }
  }

  private attachEventListeners(): void {
    this.elements.spinBtn.addEventListener('click', () => this.spin());
    this.elements.skipBtn.addEventListener('click', () => this.skipSpin());
    this.elements.autoSpinBtn.addEventListener('click', () => this.toggleAutoSpin());
    this.elements.increaseBetBtn.addEventListener('click', () => this.increaseBet());
    this.elements.decreaseBetBtn.addEventListener('click', () => this.decreaseBet());
  }

  private skipSpin(): void {
    this.skipRequested = true;
  }

  private increaseBet(): void {
    let newBet: number;
    
    if (this.state.bet < 100) {
      // Below 100: increment by 5
      newBet = this.state.bet + BET_INCREMENT;
    } else {
      // 100 or above: increment by 100
      newBet = this.state.bet + 100;
    }
    
    if (newBet <= MAX_BET && newBet <= this.state.balance) {
      this.state.bet = newBet;
      this.updateDisplay();
    }
  }

  private decreaseBet(): void {
    let newBet: number;
    
    if (this.state.bet <= 100) {
      // At or below 100: decrement by 5
      newBet = this.state.bet - BET_INCREMENT;
    } else {
      // Above 100: decrement by 100
      newBet = this.state.bet - 100;
    }
    
    if (newBet >= MIN_BET) {
      this.state.bet = newBet;
      this.updateDisplay();
    }
  }

  private toggleAutoSpin(): void {
    this.autoSpinEnabled = !this.autoSpinEnabled;
    
    if (this.autoSpinEnabled) {
      this.elements.autoSpinBtn.textContent = 'AUTO SPIN: ON';
      this.elements.autoSpinBtn.classList.add('active');
      this.startAutoSpin();
    } else {
      this.elements.autoSpinBtn.textContent = 'AUTO SPIN: OFF';
      this.elements.autoSpinBtn.classList.remove('active');
    }
  }

  private async startAutoSpin(): Promise<void> {
    while (this.autoSpinEnabled && this.state.balance >= this.state.bet) {
      await this.spin();
      
      // Small delay between auto spins
      if (this.autoSpinEnabled) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Auto-disable if out of balance
    if (this.state.balance < this.state.bet) {
      this.autoSpinEnabled = false;
      this.elements.autoSpinBtn.textContent = 'AUTO SPIN: OFF';
      this.elements.autoSpinBtn.classList.remove('active');
      this.showMessage('Insufficient balance for auto spin!');
    }
  }

  private async spin(): Promise<void> {
    if (this.state.isSpinning || this.state.balance < this.state.bet) {
      this.showMessage('Insufficient balance!');
      return;
    }

    // Clear highlights from previous win immediately
    this.reels.forEach(reel => reel.clearHighlight());
    this.elements.messageDisplay.classList.remove('win');

    this.state.isSpinning = true;
    this.skipRequested = false;
    this.state.balance -= this.state.bet;
    this.updateDisplay();
    this.showMessage('');
    
    // Swap buttons
    this.elements.spinBtn.style.display = 'none';
    this.elements.skipBtn.style.display = 'inline-block';

    // Start spinning all reels
    this.reels.forEach(reel => reel.spin());

    // Generate final positions upfront
    const finalPositions: number[] = [];
    for (let i = 0; i < this.reels.length; i++) {
      finalPositions.push(Math.floor(Math.random() * 10) + 5);
    }

    // Stop reels one by one with delay (or all instantly if skip)
    for (let i = 0; i < this.reels.length; i++) {
      if (this.skipRequested) {
        // Stop all remaining reels instantly
        for (let j = i; j < this.reels.length; j++) {
          await this.reels[j].stop(finalPositions[j]);
        }
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.reels[i].stop(finalPositions[i]);
    }

    // Swap buttons back
    this.elements.skipBtn.style.display = 'none';
    this.elements.spinBtn.style.display = 'inline-block';
    
    this.state.reelPositions = finalPositions;

    // Check for wins
    await this.checkWins();

    this.state.isSpinning = false;
    this.updateDisplay();
  }

  private async checkWins(): Promise<void> {
    // Get middle row symbols (simplified win check)
    const middleSymbols: Symbol[] = this.reels.map(reel => {
      const visible = reel.getVisibleSymbols();
      return visible[1]; // Middle symbol
    });

    // Count occurrences of each symbol (matches anywhere, not just consecutive)
    const symbolCounts: Map<Symbol, number> = new Map();
    middleSymbols.forEach(symbol => {
      symbolCounts.set(symbol, (symbolCounts.get(symbol) || 0) + 1);
    });

    // Find the best matching symbol (most occurrences)
    let bestSymbol: Symbol | null = null;
    let bestCount = 0;

    symbolCounts.forEach((count, symbol) => {
      if (count > bestCount) {
        bestCount = count;
        bestSymbol = symbol;
      }
    });

    // Clear any previous highlights
    this.reels.forEach(reel => reel.clearHighlight());

    // Win with 3 or more matching symbols anywhere (balanced for ~40-50% win rate)
    if (bestCount >= 3 && bestSymbol) {
      const symbolPayout = PAYOUTS[bestSymbol];
      // Multiplier: 3 symbols = 1x, 4 symbols = 3x, 5 symbols = 8x
      const multiplier = bestCount === 3 ? 1 : bestCount === 4 ? 3 : 8;
      const winAmount = this.state.bet * symbolPayout * multiplier;
      this.state.balance += winAmount;
      
      // Highlight winning reels
      middleSymbols.forEach((symbol, index) => {
        if (symbol === bestSymbol) {
          this.reels[index].highlightWin();
        }
      });
      
      this.elements.messageDisplay.classList.add('win');
      this.showMessage(`🎉 WIN! ${bestCount}x ${bestSymbol} = ${winAmount} coins! 🎉`);
      
      setTimeout(() => {
        this.elements.messageDisplay.classList.remove('win');
        this.reels.forEach(reel => reel.clearHighlight());
      }, 3000);
    } else {
      this.showMessage('Try again!');
    }

    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.elements.balanceDisplay.textContent = this.state.balance.toString();
    this.elements.betDisplay.textContent = this.state.bet.toString();
  }

  private showMessage(message: string): void {
    this.elements.messageDisplay.textContent = message;
  }
}
