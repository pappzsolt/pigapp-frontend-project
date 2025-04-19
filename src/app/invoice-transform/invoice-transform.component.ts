import { InvoiceOption, InvoiceResponse, InvoiceTransferResponse } from '../../model/invoice';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceTransformService } from '../services/invoice-transform.service';
import { AppConfig, CONFIG_TOKEN } from '../config';
import { ReactiveFormsModule } from '@angular/forms';  // Importáld ezt!
import { CommonModule } from '@angular/common';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-invoice-transform',
  standalone: true,

  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './invoice-transform.component.html',
  styleUrls: ['./invoice-transform.component.css'],
  animations: [
    // Animáció definíció
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),  // Kezdő állapot
        animate('300ms 200ms', style({ opacity: 1 }))  // Animáció
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))  // Elhagyás animációja
      ])
    ])
  ]
})


export class InvoiceTransformComponent implements OnInit {
  invoiceOption: InvoiceOption[] = [];
  form: FormGroup;

  transferMessage: string | null = null;


  constructor(
    private invoiceTransformService: InvoiceTransformService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      szamla1: [null, Validators.required],
      szamla2: [null, Validators.required],
      osszeg: [null, [Validators.required, Validators.min(1)]]
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
      this.form.markAllAsTouched(); // 💥 ez beállítja, hogy minden mező validációja azonnal fusson
      if (this.form.valid) {
        const { szamla1, szamla2, osszeg } = this.form.value;
        this.invoiceTransformService.transferAmount(szamla1, szamla2, osszeg).subscribe({
          next: (res) => {
            this.transferMessage = `✅ ${res.message} Számla 1 új egyenlege: ${res.szamla1.amount}, Számla 2 új egyenlege: ${res.szamla2.amount}`;
            this.form.reset();
            setTimeout(() => {
              this.transferMessage = null;
            }, 9000);
          },
          error: (err) => {
            this.transferMessage = '❌ Hiba történt az átvezetés során.';
            setTimeout(() => {
              this.transferMessage = null;
            }, 9000);
          }
        });
      } else {
        this.transferMessage = '⚠️ Kérlek, tölts ki minden mezőt!';
        setTimeout(() => {
          this.transferMessage = null;
        }, 9000);
      }
    }

}
