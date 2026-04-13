import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoAsset, GroupedAsset } from '../models/crypto-asset';

@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-table.html'
})
export class PortfolioTableComponent implements OnChanges {
  @Input() groupedAssets: GroupedAsset[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, dto: any}>();

  editingId: number | null = null;
  editCache: any = {};
  sortColumn: string = 'symbol';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupedAssets'] && this.groupedAssets) {
      this.applySort();
    }
  }

  toggleGroup(group: GroupedAsset): void {
    group.isExpanded = !group.isExpanded;
  }

  startEdit(asset: CryptoAsset, event: Event): void {
    event.stopPropagation();
    this.editingId = asset.id;
    this.editCache = { ...asset };
  }

  cancelEdit(event: Event): void {
    event.stopPropagation();
    this.editingId = null;
    this.editCache = {};
  }

  saveEdit(event: Event): void {
    event.stopPropagation();
    if (this.editingId) {
      const dto = {
        symbol: this.editCache.symbol,
        quantity: this.editCache.quantity,
        purchasePrice: this.editCache.purchasePrice
      };
      this.update.emit({ id: this.editingId, dto });
      this.editingId = null;
    }
  }

  onDelete(id: number, event: Event): void {
    event.stopPropagation();
    this.delete.emit(id);
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
      let valA: any, valB: any;
      switch (this.sortColumn) {
        case 'symbol': valA = a.symbol; valB = b.symbol; break;
        case 'quantity': valA = a.totalQuantity; valB = b.totalQuantity; break;
        case 'purchasePrice': valA = a.averagePurchasePrice; valB = b.averagePurchasePrice; break;
        case 'totalValue': valA = a.totalValue; valB = b.totalValue; break;
        case 'profitLoss': valA = a.totalProfitLoss; valB = b.totalProfitLoss; break;
        case 'profitLossPercentage': valA = a.profitLossPercentage; valB = b.profitLossPercentage; break;
        default: return 0;
      }
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.groupedAssets.forEach(group => {
      group.items.sort((childA, childB) => {
        let childValA: any, childValB: any;
        switch (this.sortColumn) {
          case 'quantity': childValA = childA.quantity; childValB = childB.quantity; break;
          case 'purchasePrice': childValA = childA.purchasePrice; childValB = childB.purchasePrice; break;
          case 'totalValue': childValA = childA.totalValue; childValB = childB.totalValue; break;
          case 'profitLoss': childValA = childA.profitLoss; childValB = childB.profitLoss; break;
          case 'profitLossPercentage': childValA = (childA as any).profitLossPercentage; childValB = (childB as any).profitLossPercentage; break;
          default: return 0;
        }
        if (childValA < childValB) return this.sortDirection === 'asc' ? -1 : 1;
        if (childValA > childValB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    });
  }
}