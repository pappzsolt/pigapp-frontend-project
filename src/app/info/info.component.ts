import { Component, OnInit } from '@angular/core';
import { InvoiceSumCost } from '../../model/invoice_sum_cost.model';
import { Observable } from 'rxjs';
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


  invoiceSumCost$: Observable<InvoiceSumCost> | undefined;

  constructor(private infoService: InfoService){}

  ngOnInit(): void {

    this.invoiceSumCost$ = this.infoService.getFirstInvoiceSumCostAll();

  }
}
