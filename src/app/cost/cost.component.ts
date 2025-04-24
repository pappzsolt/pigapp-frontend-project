// src/app/components/cost/cost.component.ts

import { Component, OnInit } from '@angular/core';
import { CostService } from '../services/cost.service';
import { Cost } from '../../model/cost';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css'],
})
export class CostComponent implements OnInit {
  costs: Cost[] = [];
  costsSearchResults: Cost[] = [];

  invoices: any[] = [];
  devs: any[] = [];
  costRepeats: any[] = [];
  costGroups: any[] = [];
  costForm: FormGroup;
  selectedCost: Cost | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  searchDate: string = '';

  constructor(
    private costService: CostService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.costForm = this.fb.group({
      cost_name: ['', Validators.required],
      cost_note: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      cost_date: ['', Validators.required],
      invoice: ['', Validators.required],
      dev: ['', Validators.required],
      costrepeat: ['', Validators.required],
      costgroup: ['', Validators.required],
      paid: [false],
      paid_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCosts();
    this.loadForeignKeyData();
  }

  loadForeignKeyData(): void {
    this.costService.getForeignKeyData().subscribe(
      data => {
        this.invoices = data.invoices;
        this.devs = data.devs;
        this.costRepeats = data.costrepeats;
        this.costGroups = data.costgroups;
      },
      error => {
        console.error('Hiba a ForeignKey adatok betöltésekor:', error);
      }
    );
  }
  // Költségek betöltése
  loadCosts(): void {
    this.costService.getCosts(this.currentPage).subscribe({
      next: data => {
        this.costs = data.results; // A 'results' mező tartalmazza az aktuális oldal elemeit
        this.totalPages = Math.ceil(data.count / 10); // A teljes oldalak száma
      },
      error: err => {
        console.error('Hiba a költségek betöltésekor:', err);
      },
    });
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.loadCosts();
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCosts();
    }
  }
  // Költség hozzáadása
  addCost(): void {
    if (this.costForm.valid) {
      const newCost: Cost = this.costForm.value;
      newCost.create_cost_date = new Date();
      newCost.user = this.authService.getUserId();
      newCost.paid = newCost.paid ? 1 : 0;
      this.costService.createCost(newCost).subscribe(
        data => {
          this.costs.push(data);
          this.costForm.reset(); // űrlap törlése
        },
        error => {
          console.error('Hiba a költség hozzáadásakor:', error);
        }
      );
    }
  }

  // Költség frissítése
  markAsPaid(cost: Cost): void {
    const updatedCost = { ...cost, paid: 1 }; // vagy true, ha boolean a backend szerint

    this.costService.updateCost(cost.id, updatedCost).subscribe({
      next: res => {
        console.log('Fizetés sikeresen frissítve:', res);
        this.loadCosts(); // vagy frissítsd csak azt az elemet a listában
      },
      error: err => {
        console.error('Hiba fizetés frissítésénél:', err);
      },
    });
  }

  // Költség törlése
  deleteCost(id: number): void {
    this.costService.deleteCost(id).subscribe(
      () => {
        this.costs = this.costs.filter(cost => cost.id !== id);
      },
      error => {
        console.error('Hiba a költség törlésekor:', error);
      }
    );
  }
  filterCosts() {
    this.costService.filterCosts(this.searchDate).subscribe(
      data => {
        this.costsSearchResults = data;
      },
      error => {
        console.error('Hiba történt a költségek lekérésekor', error);
      }
    );
  }
}
