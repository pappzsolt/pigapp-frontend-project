import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostRepeat } from '../../../model/costrepeat';

@Component({
  selector: 'app-cost-repeat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-repeat-list.component.html',
})
export class CostRepeatListComponent {
  @Input() costsRepeatList: CostRepeat[] = [];
}
