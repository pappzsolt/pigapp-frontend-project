import { INVOICES } from './../../db-data-invoice';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { Invoice } from '../model/invoice';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{

  invoices: any;

  private http = inject(HttpClient);

  access: any;

  constructor(){}

  ngOnInit(){


    const jsonData =
      {
        "email": "papp.zsolt.gabor@gmail.com ",
        "password": "2EdrufrU"

      }
      ;

    this.http.post<any>('http://192.168.1.37:8000/api/token/',jsonData)
      .subscribe({
        next: (response) => {
          this.access = response.access;
          console.log('Kapott válasz:', response);
          console.log('access:', "Bearer "+this.access);
        },
        error: (err) => {
          console.error('Hiba történt:', err);
        }
      });

      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.access,
      });

    this.http.get<any[]>('http://192.168.1.37:8000/api/pigapp_app/only_invoice_list/', {headers})
      .subscribe(
        {
          next: (response) => {
            console.log('Válasz:', response);
            // Itt dolgozhatsz a válasz adataival, például az UI frissítésével
          },
          error: (err) => {
            console.error('Hiba111:', err);
          },
          complete: () => {
            console.log('GET kérés befejeződött');
          }
        }
      );
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




