import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title = 'Orquidea accesorios';
  subtitle = '¿Cuál es tu favorito?';

  constructor() { }

  ngOnInit(): void {
  }

}
