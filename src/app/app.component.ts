import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { CommonModule } from '@angular/common';
import { InvoicesService } from './services/invoices.service';
import { from, Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  invoices$: Observable<Invoice[]> = of([]);

  private invoicesService = inject(InvoicesService);

  constructor(){

  }

  ngOnInit(){
    if(this.authService.isTokenExpired()){
      console.log("ha lejart:"+this.authService.isTokenExpired()+" regi token:"+sessionStorage.getItem('jwt_token'))
      this.authService.login().subscribe({
        next: (response) => {
          this.authService.saveJwtToken(response.access);
          this.authService.saveJwtRefresh(response.refresh);
          console.log('Sikeres bejelentkezés:', response);
          console.log("login utan:"+this.authService.isTokenExpired()+" uj_token:"+sessionStorage.getItem('jwt_token'))
        },
        error: (error) => {
          console.error('Bejelentkezési hiba:', error);
        }
      });
      // console.log("login utan:"+this.authService.isTokenExpired()+" uj_token:"+sessionStorage.getItem('jwt_token'))
    }else{
      console.log("minden ok")
    }

    this.invoices$ = this.invoicesService.getInvoiceList();
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




