import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostRepeatWithSumService } from '../services/cost-repeat-with-sum.service';
import { CostRepeatWithSum } from '../../model/cost-repeat-with-sum.model';

@Component({
  selector: 'app-cost-repeat-with-sum',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cost-repeat-with-sum.component.html',
  styleUrl: './cost-repeat-with-sum.component.css'
})
export class CostRepeatWithSumComponent {
  costRepeatWithSum: CostRepeatWithSum[] = [];
  constructor(private costRepeatWithSumService: CostRepeatWithSumService) {}


 ngOnInit(): void {
    this.costRepeatWithSumService.getCostRepeats().subscribe({
      next: (data) => {
        this.costRepeatWithSum = data;
      },
      error: (err) => {
        console.error('Hiba a lekérésnél:', err);
      },
    });
  }
}

