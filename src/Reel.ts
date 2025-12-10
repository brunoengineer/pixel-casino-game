import { Symbol, getWeightedSymbol } from './types';

export class Reel {
  private element: HTMLElement;
  private strip: HTMLElement;
  private symbols: Symbol[] = [];
  private stoppedSymbols: Symbol[] = [];

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'reel';

    this.strip = document.createElement('div');
    this.strip.className = 'reel-strip';

    this.initializeSymbols();
    this.element.appendChild(this.strip);
    container.appendChild(this.element);
  }

  private initializeSymbols(): void {
    // Create a long strip of weighted random symbols for smooth spinning
    for (let i = 0; i < 20; i++) {
      const symbol = getWeightedSymbol();
      this.symbols.push(symbol);

      const symbolEl = document.createElement('div');
      symbolEl.className = 'symbol';
      
      const img = document.createElement('img');
      img.src = `./img/${symbol}.png`;
      img.alt = symbol;
      img.className = 'symbol-img';
      
      symbolEl.appendChild(img);
      this.strip.appendChild(symbolEl);
    }
  }

  public spin(): void {
    this.element.classList.add('spinning');
  }

  public stop(finalSymbolIndex: number): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.remove('spinning');

      // Generate 3 weighted random symbols for this reel result
      this.stoppedSymbols = [
        getWeightedSymbol(),
        getWeightedSymbol(),
        getWeightedSymbol()
      ];

      // Get actual symbol height dynamically for responsive design
      const symbolElements = this.strip.querySelectorAll('.symbol');
      const symbolHeight = symbolElements[0] ? (symbolElements[0] as HTMLElement).offsetHeight : 120;
      
      // Update visual display - position to show middle symbol
      const targetPosition = -(finalSymbolIndex * symbolHeight - symbolHeight);
      this.strip.style.top = `${targetPosition}px`;
      
      // Update the actual symbols in the strip - ensure all 3 visible symbols have images
      
      // Top symbol
      const topIndex = finalSymbolIndex - 1;
      if (topIndex >= 0 && symbolElements[topIndex]) {
        let img = symbolElements[topIndex].querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'symbol-img';
          symbolElements[topIndex].appendChild(img);
        }
        img.src = `./img/${this.stoppedSymbols[0]}.png`;
        img.alt = this.stoppedSymbols[0];
      }
      
      // Middle symbol
      if (symbolElements[finalSymbolIndex]) {
        let img = symbolElements[finalSymbolIndex].querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'symbol-img';
          symbolElements[finalSymbolIndex].appendChild(img);
        }
        img.src = `./img/${this.stoppedSymbols[1]}.png`;
        img.alt = this.stoppedSymbols[1];
      }
      
      // Bottom symbol
      const bottomIndex = finalSymbolIndex + 1;
      if (bottomIndex < symbolElements.length && symbolElements[bottomIndex]) {
        let img = symbolElements[bottomIndex].querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'symbol-img';
          symbolElements[bottomIndex].appendChild(img);
        }
        img.src = `./img/${this.stoppedSymbols[2]}.png`;
        img.alt = this.stoppedSymbols[2];
      }

      setTimeout(resolve, 300);
    });
  }

  public getVisibleSymbols(): Symbol[] {
    // Return the symbols that were set when the reel stopped
    return this.stoppedSymbols.length > 0 ? this.stoppedSymbols : [
      this.symbols[0],
      this.symbols[1],
      this.symbols[2]
    ];
  }

  public setSymbol(index: number, symbol: Symbol): void {
    const symbolElements = this.strip.querySelectorAll('.symbol');
    if (symbolElements[index]) {
      const img = symbolElements[index].querySelector('img');
      if (img) {
        img.src = `./img/${symbol}.png`;
        img.alt = symbol;
      }
      this.symbols[index] = symbol;
    }
  }

  public highlightWin(): void {
    this.element.classList.add('winning');
  }

  public clearHighlight(): void {
    this.element.classList.remove('winning');
  }
}
