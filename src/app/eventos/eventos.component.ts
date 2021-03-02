import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: any = [
    {
      tema: "Angular",
      local: "Goias"
    },
    {
      tema: ".Net",
      local: "Tocantins"
    },
    {
      tema: "C#",
      local: "Brasilia"
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
