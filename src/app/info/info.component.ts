import { Component, OnInit } from '@angular/core';
import { CostSummary, InvoiceIdWithName, InvoiceSumCost } from '../../model/invoice_sum_cost.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{

  summaries: CostSummary[] = [];
  loading = true;
  error = '';

  constructor(private infoService: InfoService){

  }

  ngOnInit(): void {

    this.infoService.getMonthlySummary().subscribe({
      next: (data) => {
        this.summaries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Hiba történt az adatok lekérésekor.';
        this.loading = false;
      }
    });


  }
}
