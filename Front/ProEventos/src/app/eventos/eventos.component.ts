import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // providers: [EventoService]
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = []
  public eventosFiltrador: Evento[] = []
  //tamanho da imagem
  larguraImagem: number = 150
  margemImagem = 2
  exibirImagem = true
  private _filtroLista = ''

  // public get filtroLista(): string{
  public get filtroLista(){
    return this._filtroLista
  }

  public set filtroLista(value: string)  {
    this._filtroLista = value
    this.eventosFiltrador = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string){
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1

    )
  }


  constructor(private eventoService: EventoService) { }

  public ngOnInit(): void {
    this.getEventos()
  }

  public alterarImagem(): void{
    this.exibirImagem = !this.exibirImagem
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe(
      (_evento: Evento[]) => {
        this.eventos = _evento
        this.eventosFiltrador = this.eventos
      },
      error => console.log(error)
    )
  }
}
