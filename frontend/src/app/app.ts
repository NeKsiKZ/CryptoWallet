import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from './services/crypto.service';
import { CryptoAsset, GroupedAsset } from './models/crypto-asset';
import { AddAssetFormComponent } from './components/add-asset-form';
import { PortfolioTableComponent } from './components/portfolio-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddAssetFormComponent, PortfolioTableComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  assets: CryptoAsset[] = [];
  groupedAssets: GroupedAsset[] = [];
  
  isFormVisible: boolean = false;

  private cryptoService = inject(CryptoService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

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

  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onAssetAdded(dto: any): void {
    this.cryptoService.addAsset(dto).subscribe({
      next: () => {
        this.loadAssets(); 
        this.isFormVisible = false;
      },
      error: (err) => {
        console.error('Błąd dodawania:', err);
        alert('Błąd dodawania kryptowaluty.');
      }
    });
  }

  onAssetDeleted(id: number): void {
    if (confirm(`Czy na pewno chcesz usunąć?`)) {
      this.cryptoService.deleteAsset(id).subscribe({
        next: () => {
          this.loadAssets();
          console.log(`Usunięto id: ${id}`);
        },
        error: (err) => console.error('Błąd podczas usuwania:', err)
      });
    }
  }

  onAssetUpdated(event: {id: number, dto: any}): void {
    this.cryptoService.updateAsset(event.id, event.dto).subscribe({
      next: () => {
        console.log(`Zaktualizowano id: ${event.id}`);
        this.loadAssets();
      },
      error: (err) => console.error('Błąd podczas aktualizacji:', err)
    });
  }
}