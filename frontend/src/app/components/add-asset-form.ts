import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-asset-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full max-w-sm shadow-xl">
      <h3 class="text-xl font-semibold mb-4 text-white">Dodaj transakcję</h3>
      
      <div class="mb-4">
        <label class="block text-slate-400 text-sm mb-1">Symbol (np. BTC)</label>
        <input type="text" [(ngModel)]="newAsset.symbol" 
               class="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
      </div>

      <div class="mb-4">
        <label class="block text-slate-400 text-sm mb-1">Ilość sztuk</label>
        <input type="number" [(ngModel)]="newAsset.quantity" 
               class="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-all">
      </div>

      <div class="mb-6">
        <label class="block text-slate-400 text-sm mb-1">Cena Zakupu USD</label>
        <input type="number" [(ngModel)]="newAsset.purchasePrice" 
               class="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-all">
      </div>

      <button (click)="onSubmit()" 
              class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Dodaj
      </button>
    </div>
  `
})
export class AddAssetFormComponent {
  @Output() assetAdded = new EventEmitter<any>();

  newAsset = { symbol: '', quantity: 0, purchasePrice: 0 };

  onSubmit(): void {
    if (!this.newAsset.symbol || this.newAsset.quantity <= 0 || this.newAsset.purchasePrice <= 0) {
      alert('Wypełnij poprawnie wszystkie pola!');
      return;
    }
    this.assetAdded.emit(this.newAsset);
    this.newAsset = { symbol: '', quantity: 0, purchasePrice: 0 };
  }
}