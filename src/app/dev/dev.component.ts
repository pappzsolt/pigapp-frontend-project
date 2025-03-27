import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-dev',
  imports: [],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent {
  constructor(){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
