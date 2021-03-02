import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: any = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos()
  }

  getEventos(): void {
    this.http.get('http://endereco_da_api').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    )

    // this.eventos = [
    //   {
    //     tema: "Angular",
    //     local: "Goias"
    //   },
    //   {
    //     tema: ".Net",
    //     local: "Tocantins"
    //   },
    //   {
    //     tema: "C#",
    //     local: "Brasilia"
    //   }
    // ]
  }
}
