import { Component, Inject, inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
/*   providers: [
    {
      provide: CONFIG_TOKEN,useFactory: () => APP_CONFIG,

    }
  ] */
})



export class AppComponent implements OnInit{


  constructor(){}

  ngOnInit(){}


}




