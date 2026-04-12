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
      return group;
    });
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