import { Component, OnInit } from '@angular/core';
import { CostService } from '../services/cost.service';
import { Cost } from '../../model/cost';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CostFilterComponent } from './cost-filter/cost-filter.component';
import { CostSearchResultTableComponent } from './cost-search-result-table/cost-search-result-table.component';
import { CostListTableComponent } from './cost-list-table/cost-list-table.component';
import { CostFormComponent } from './cost-form/cost-form.component';
import { StyledInputDirective } from '../shared/directives/styled-input.directive';
import { ButtonDirective } from '../shared/directives/button.directive';
import { AlertMessageComponent } from '../shared/alert-message/alert-message.component';

@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CostFilterComponent,
    CostSearchResultTableComponent,
    CostListTableComponent,
    CostFormComponent,
    StyledInputDirective,
    ButtonDirective,
    AlertMessageComponent,
  ],
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
  startPrevDate: string | null = null;
  endActDate: string | null = null;
  alertType: 'success' | 'error' = 'success';
  alertMessage = '';
  alertVisible = false;

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
        this.startPrevDate = data.date_range.start_prev;
        this.endActDate = data.date_range.end_act;
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
  addCost(form: FormGroup): void {
    if (form.valid) {
      const newCost = form.value;
      newCost.create_cost_date = new Date();
      newCost.user = this.authService.getUserId();
      newCost.paid = newCost.paid ? 1 : 0;
      this.costService.createCost(newCost).subscribe(
        data => {
          this.costs.push(data);
          this.alertType = 'success';
          this.alertMessage = 'Költség sikeresen hozzáadva!';
          this.alertVisible = true;
          form.reset();
        },
        error => {
          console.error('Hiba a költség hozzáadásakor:', error);
          this.alertType = 'error';
          this.alertMessage = 'Hiba történt a költség hozzáadásakor.';
          this.alertVisible = true;
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
  onFilterDate(date: string): void {
    this.searchDate = date;
    this.filterCosts();
  }
}
