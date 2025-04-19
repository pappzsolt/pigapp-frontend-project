import { InvoiceOption, InvoiceResponse } from '../../model/invoice';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceTransformService } from '../services/invoice-transform.service';
import { AppConfig, CONFIG_TOKEN } from '../config';
import { ReactiveFormsModule } from '@angular/forms';  // Importáld ezt!
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-transform',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './invoice-transform.component.html',
  styleUrls: ['./invoice-transform.component.css']
})

export class InvoiceTransformComponent implements OnInit {
  invoiceOption: InvoiceOption[] = [];
  form: FormGroup;




  constructor(
    private invoiceTransformService: InvoiceTransformService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      szamla1: [null],
      szamla2: [null],
      osszeg: [null]
    });
  }


    ngOnInit(): void {
      this.invoiceTransformService.getInvoiceOptions().subscribe(
        (data: InvoiceResponse) => {
          if (data && data.results) {
            this.invoiceOption = data.results;

            // Alapértelmezett számla beállítása (például az első számla)
/*             if (this.invoiceOption.length > 0) {
              // Az első számlát válasszuk ki alapértelmezetten
              this.form.patchValue({
                szamla1: this.invoiceOption[0].id,  // Számla 1 alapértelmezett beállítása
                szamla2: this.invoiceOption[0].id   // Számla 2 alapértelmezett beállítása (ha szükséges)
              });
            }*/
          }
        },
        error => {
          console.error('Error fetching invoice options:', error);
        }
      );
    }
    onSubmit(): void {
      if (this.form.valid) {
        const { szamla1, szamla2, osszeg } = this.form.value;

        this.invoiceTransformService
          .transferAmount(szamla1, szamla2, osszeg)
          .subscribe({
            next: (res: InvoiceTransferResponse) => {
              console.log('Sikeres átvezetés:', res.message);
              console.log('Új egyenleg Számla 1:', res.szamla1.amount);
              console.log('Új egyenleg Számla 2:', res.szamla2.amount);
            },
            error: (err: HttpErrorResponse) => {
              console.error('Hiba az átvezetés közben:', err.message);
            }
          });
      } else {
        console.warn('A form hibásan van kitöltve.');
      }

}
