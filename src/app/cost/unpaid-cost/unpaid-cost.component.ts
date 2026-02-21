import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← kell az ngModel-hez
import { UnpaidCostService } from './../../services/unpaid-cost.service';
import { UnpaidCost } from '../../../model/unpaid-cost.interface';

@Component({
  selector: 'app-unpaid-cost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unpaid-cost.component.html',
  styleUrls: ['./unpaid-cost.component.css'],
})
export class UnpaidCostComponent implements OnInit {
  // minden cost-nak lesz selected mező
  costs: (UnpaidCost & { selected: boolean })[] = [];

  // a lapozott oldalakra külön tároljuk a teljes kiválasztott listát
  selectedCosts: { [id: number]: UnpaidCost & { selected: boolean } } = {};

  loading = false;
  error = '';

  // paginációhoz
  previousUrl: string | null = null;
  nextUrl: string | null = null;

  constructor(private unpaidCostService: UnpaidCostService) {}

  ngOnInit(): void {
    this.loadCosts();
  }

  loadCosts(url?: string) {
    this.loading = true;
    const obs = url
      ? this.unpaidCostService.getUnpaidCostsByUrl(url)
      : this.unpaidCostService.getUnpaidCosts();

    obs.subscribe({
      next: (data) => {
        // az előzőleg kiválasztott tételek állapotának visszaállítása
        this.costs = data.results.map(cost => ({
          ...cost,
          selected: !!this.selectedCosts[cost.id]?.selected
        }));

        // frissítjük a selectedCosts objektumot minden új tétellel
        this.costs.forEach(cost => this.selectedCosts[cost.id] = cost);

        this.previousUrl = data.previous;
        this.nextUrl = data.next;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Hiba a nem fizetett költségek lekérésekor';
        console.error(err);
        this.loading = false;
      }
    });
  }

  // lapozás
  previousPage() {
    if (this.previousUrl) this.loadCosts(this.previousUrl);
  }

  nextPage() {
    if (this.nextUrl) this.loadCosts(this.nextUrl);
  }

  // kiválasztott költségek összege (lapozás után is)
  get selectedTotal(): number {
    return Object.values(this.selectedCosts)
      .filter(c => c.selected)
      .reduce((sum, c) => sum + c.amount, 0);
  }
}
