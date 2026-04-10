import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from './services/crypto.service';
import { CryptoAsset } from './models/crypto-asset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  assets: CryptoAsset[] = [];
  
  isFormVisible: boolean = false;
  newAsset = {
    symbol: '',
    quantity: 0,
    purchasePrice: 0
  };

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
        
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Błąd pobierania danych:', err)
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
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