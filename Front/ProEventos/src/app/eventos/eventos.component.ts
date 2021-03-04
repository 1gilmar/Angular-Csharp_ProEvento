import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: any = []
  //tamanho da imagem
  larguraImagem: number = 150
  margemImagem = 2
  exibirImagem = true

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos()
  }

  alterarImagem(){
    this.exibirImagem = !this.exibirImagem
  }

  getEventos(): void {
    this.http.get('https://localhost:5001/api/Evento').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    )
  }
}
