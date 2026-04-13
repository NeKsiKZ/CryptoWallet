import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-asset-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; width: 300px; background-color: #f9f9f9;">
      <h3 style="margin-top: 0;">Nowa waluta</h3>
      
      <label>Symbol:</label><br>
      <input type="text" [(ngModel)]="newAsset.symbol" style="margin-bottom: 10px; width: 100%;"><br>

      <label>Ilość sztuk:</label><br>
      <input type="number" [(ngModel)]="newAsset.quantity" style="margin-bottom: 10px; width: 100%;"><br>

      <label>Cena Zakupu USD:</label><br>
      <input type="number" [(ngModel)]="newAsset.purchasePrice" style="margin-bottom: 10px; width: 100%;"><br>

      <button (click)="onSubmit()" style="width: 100%; cursor: pointer;">Dodaj</button>
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