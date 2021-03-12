import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: any = []
  eventosFiltrador: any = []
  //tamanho da imagem
  larguraImagem: number = 150
  margemImagem = 2
  exibirImagem = true
  private _filtroLista = ''

  // public get filtroLista(): string{
  public get filtroLista(){
    return this._filtroLista
  }

  public set filtroLista(value: string) {
    this._filtroLista = value
    this.eventosFiltrador = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  filtrarEventos(filtrarPor: string){
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1

    )
  }


  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.getEventos()
  }

  alterarImagem(){
    this.exibirImagem = !this.exibirImagem
  }

  getEventos(): void {
    this.eventoService.getEvento().subscribe(
      response => {
        this.eventos = response
        this.eventosFiltrador = this.eventos
      },
      error => console.log(error)
    )
  }
}
