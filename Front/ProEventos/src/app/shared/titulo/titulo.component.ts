import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  // public titulo: string = 'Titulo variavel';
  @Input() titulo = '';
  @Input() subtitulo = 'Desde 2021';
  @Input() iconeClass = 'fa fa-user';
  @Input() botaoListar = false;

  constructor() { }

  ngOnInit(): void {
  }

}
