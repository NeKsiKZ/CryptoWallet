import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from './services/crypto.service';
import { CryptoAsset } from './models/crypto-asset';

interface GroupedAsset {
  symbol: string;
  totalQuantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
  totalValue: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
  isExpanded: boolean;
  items: CryptoAsset[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  assets: CryptoAsset[] = [];
  groupedAssets: GroupedAsset[] = [];
  
  isFormVisible: boolean = false;
  newAsset = {
    symbol: '',
    quantity: 0,
    purchasePrice: 0
  };

  editingId: number | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  editCache: any = {};

  constructor(
    private cryptoService: CryptoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Aplikacja startuje.');
    this.loadAssets();
  }

  loadAssets(): void {
    this.cryptoService.getAssets().subscribe({
      next: (data) => {
        console.log('POBRANO DANE Z BACKENDU:', data);
        this.assets = data;
        this.processGroups();
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Błąd pobierania danych:', err)
    });
  }

  sortData(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
  
  this.applySort();
  }

  applySort(): void {
    if (!this.sortColumn) return;

    this.groupedAssets.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (this.sortColumn) {
        case 'symbol':
          valA = a.symbol;
          valB = b.symbol;
          break;
        case 'quantity':
          valA = a.totalQuantity;
          valB = b.totalQuantity;
          break;
        case 'purchasePrice':
          valA = a.averagePurchasePrice;
          valB = b.averagePurchasePrice;
          break;
        case 'totalValue':
          valA = a.totalValue;
          valB = b.totalValue;
          break;
        case 'profitLoss':
          valA = a.totalProfitLoss;
          valB = b.totalProfitLoss;
          break;
        case 'profitLossPercentage':
          valA = a.profitLossPercentage;
          valB = b.profitLossPercentage;
          break;
        default:
          return 0;
      }

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.groupedAssets.forEach(group => {
      group.items.sort((childA, childB) => {
        let childValA: any;
        let childValB: any;

        switch (this.sortColumn) {
          case 'quantity':
            childValA = childA.quantity;
            childValB = childB.quantity;
            break;
          case 'purchasePrice':
            childValA = childA.purchasePrice;
            childValB = childB.purchasePrice;
            break;
          case 'totalValue':
            childValA = childA.totalValue;
            childValB = childB.totalValue;
            break;
          case 'profitLoss':
            childValA = childA.profitLoss;
            childValB = childB.profitLoss;
            break;
          case 'profitLossPercentage':
            childValA = (childA as any).profitLossPercentage;
            childValB = (childB as any).profitLossPercentage;
            break;
          case 'symbol':
            return 0;
          default:
            return 0;
        }

        if (childValA < childValB) return this.sortDirection === 'asc' ? -1 : 1;
        if (childValA > childValB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    });
  }

  processGroups(): void {
    const groups = new Map<string, GroupedAsset>();

    for (const asset of this.assets) {
      const sym = asset.symbol.toUpperCase();
      
      if (!groups.has(sym)) {
        groups.set(sym, {
          symbol: sym,
          totalQuantity: 0,
          averagePurchasePrice: 0,
          currentPrice: asset.currentPrice || 0,
          totalValue: 0,
          totalProfitLoss: 0,
          profitLossPercentage: 0,
          isExpanded: this.groupedAssets.find(g => g.symbol === sym)?.isExpanded || false,
          items: []
        });
      }

      const group = groups.get(sym)!;
      group.items.push(asset);
      group.totalQuantity += asset.quantity;
      group.totalValue += (asset.totalValue || 0);
      group.totalProfitLoss += (asset.profitLoss || 0);
    }

  this.groupedAssets = Array.from(groups.values()).map(group => {
        const totalCost = group.items.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0);
        group.averagePurchasePrice = group.totalQuantity > 0 ? totalCost / group.totalQuantity : 0;

        group.profitLossPercentage = totalCost > 0 ? (group.totalProfitLoss / totalCost) * 100 : 0;

        group.items.forEach(item => {
          const itemCost = item.quantity * item.purchasePrice;
          (item as any).profitLossPercentage = itemCost > 0 ? (item.profitLoss! / itemCost) * 100 : 0;
        });

        return group;
      });

    this.applySort();
  }

  toggleGroup(group: GroupedAsset): void {
    group.isExpanded = !group.isExpanded;
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  startEdit(asset: CryptoAsset): void {
    this.editingId = asset.id;
    this.editCache = { ...asset};
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editCache = {};
  }

  saveEdit(): void {
    if (this.editingId) {
      const dto = {
        symbol: this.editCache.symbol,
        quantity: this.editCache.quantity,
        purchasePrice: this.editCache.purchasePrice
      };

      this.cryptoService.updateAsset(this.editingId, dto).subscribe({
        next: () => {
          console.log(`Zaktualizowano id: ${this.editingId}`);
          this.loadAssets();
          this.editingId = null;
        },
        error: (err) => console.error('Błąd podczas aktualizacji:', err)
      });
    }
  }

    onDelete(id: number): void {
    if (confirm(`Czy na pewno chcesz usunąć?`)) {
      this.cryptoService.deleteAsset(id).subscribe({
        next: () => {
          this.assets = this.assets.filter(a => a.id !== id);
          this.processGroups();
          this.cdr.detectChanges();
          console.log(`Usunięto id: ${id}`);
        },
        error: (err) => console.error('Bład podczas usuwania:', err)
      });
    }
  }

onSubmit(): void {
    if (!this.newAsset.symbol || this.newAsset.quantity <= 0 || this.newAsset.purchasePrice <= 0) {
      alert('Wypełnij poprawnie wszystkie pola!');
      return;
    }

    this.cryptoService.addAsset(this.newAsset).subscribe({
      next: () => {
        this.loadAssets(); 
        
        this.isFormVisible = false;
        this.newAsset = { symbol: '', quantity: 0, purchasePrice: 0 };
      },
      error: (err) => {
        console.error('Błąd dodawania:', err);
        alert('Błąd dodawania kryptowaluty.');
      }
    });
  }

}