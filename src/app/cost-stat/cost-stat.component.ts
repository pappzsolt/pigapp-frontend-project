import { Component } from '@angular/core';
import { CostStatService } from '../services/coststat.service';

@Component({
  selector: 'app-cost-stat',
  imports: [],
  templateUrl: './cost-stat.component.html',
  styleUrl: './cost-stat.component.css'
})
export class CostStatComponent {
  costGroupData: any = {};
  loading: boolean = true;

  constructor(private costStatService: CostStatService) { }

  ngOnInit(): void {
    this.loadCostGroupData();
  }

  loadCostGroupData(): void {
    this.costStatService.getCostGroupData().subscribe(
      (data) => {
        this.costGroupData = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading cost group data', error);
        this.loading = false;
      }
    );
}
