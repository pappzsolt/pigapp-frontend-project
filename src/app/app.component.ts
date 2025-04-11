import { Component, Inject, inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoicesService } from './services/invoices.service';
import { from, Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CashFlowServiceService } from './services/cash-flow.service.service';
import { Cashflow } from '../model/cashflow';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
/*   providers: [
    {
      provide: CONFIG_TOKEN,useFactory: () => APP_CONFIG,

    }
  ] */
})



export class AppComponent implements OnInit{


  constructor(){}

  ngOnInit(){}


}




