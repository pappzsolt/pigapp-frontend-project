import { INVOICES } from './../../db-data-invoice';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { Invoice } from '../model/invoice';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{

  invoices$! : Observable<Invoice[]>;
  invoices: any;
  private http = inject(HttpClient);

  constructor(){}

  ngOnInit(){

    /* const params = new HttpParams()
      .set("username","papp.zsolt.gabor@gmail.com")
      .set("password","2EdrufrU"); */
    const jsonData =
      {
        "username": "papp.zsolt.gabor@gmail.com ",
        "password": "2EdrufrU"

      }
      ;

    this.http.post<any>('http://192.168.1.37:8000/api/token-auth/',jsonData)
      .subscribe({
        next: (response) => {
          const token = response.token;
          console.log('Kapott válasz:', response);
          console.log('token:', token);
        },
        error: (err) => {
          console.error('Hiba történt:', err);
        }
      });





    this.invoices$ = this.http.get<Invoice[]>('http://192.168.1.37:8000/api/pigapp_app/only_invoice_list/');

  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




