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
  private token: string = '';
  private http = inject(HttpClient);
  jsonData =
  {
    "email": "papp.zsolt.gabor@gmail.com ",
    "password": "2EdrufrU"

  };

  constructor(){}


  async getAccessToken(){
    const response = await this.http.post<any>('http://192.168.1.37:8000/api/token/', this.jsonData).toPromise();
    return  response.access;
  }

  async useAccessToken(): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();
      this.setAccessToken(accessToken);
    } catch (err) {
      console.error('Hiba a token megszerzésében:', err);
    }
  }

  async setAccessToken(token: string): Promise<void> {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  async getInvoiceList(){

    await this.useAccessToken();
    if (!this.token) {
      console.log('A token nem lett beállítva!');
      return;
    }else{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.getToken()
      });
      this.http.get<any[]>('http://192.168.1.37:8000/api/pigapp_app/only_invoice_list/', {headers})
        .subscribe(
          {
            next: (response) => {
              this.invoices = response;
            },
            error: (err) => {
              console.error('Hiba:', err);
            },
            complete: () => {
              console.log('GET kérés befejeződött');
            }
          }
        );
      }
  }

  ngOnInit(){
    this.getInvoiceList()
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




