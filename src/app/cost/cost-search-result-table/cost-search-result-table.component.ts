import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cost } from '../../../model/cost';
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';
@Component({
  selector: 'app-cost-search-result-table',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective],
  templateUrl: './cost-search-result-table.component.html',
  styleUrls: ['./cost-search-result-table.component.css'],
})
export class CostSearchResultTableComponent {
  @Input() costsSearchResults: Cost[] = [];
}
