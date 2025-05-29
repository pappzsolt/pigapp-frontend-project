import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostRepeat } from '../../../model/costrepeat';
import { TailwindStyledTableDirective } from '../../shared/directives/tailwind-styled-table.directive';
@Component({
  selector: 'app-cost-repeat-list',
  standalone: true,
  imports: [CommonModule, TailwindStyledTableDirective],
  templateUrl: './cost-repeat-list.component.html',
})
export class CostRepeatListComponent {
  @Input() costsRepeatList: CostRepeat[] = [];
}
