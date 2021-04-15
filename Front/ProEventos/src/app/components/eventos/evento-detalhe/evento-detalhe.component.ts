import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from 'src/services/evento.service';
import { Evento } from 'src/models/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  // form: FormGroup;
  // form = {} as FormGroup;

  evento = {} as Evento;

  eventodetalheForm!: FormGroup;

  // eventodetalheForm = new FormGroup({
  //   local: new FormControl('',
  //     [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
  //   dataEvento: new FormControl(''),
  //   tema: new FormControl(''),
  //   qtdPessoas: new FormControl(''),
  //   imageURL: new FormControl(''),
  //   telefone: new FormControl(''),
  //   email: new FormControl('')
  // });

  get f(): any {
    return this.eventodetalheForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  // pode retirar o get porem no html tera de adicionar o [bsConfig]="bsConfig()"
  // com get a chamada fica assim [bsConfig]="bsConfig"
  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();
      // adicionado o + para converter a string em numero.
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.eventodetalheForm.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          console.log(error);
          this.toast.error('Erro ao tentar carregar evento.');
        },
        () => { this.spinner.hide(); },
      );
    }

  }

  public validation(): void {
    this.eventodetalheForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imageURL: ['', Validators.required]
    });
  }

  public resetForm(): void {
    this.eventodetalheForm.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.eventodetalheForm.valid) {

      this.evento = { ...this.eventodetalheForm.value };

      this.eventoService.postEvento(this.evento).subscribe(
        () => {
          this.toast.success('Evento salvo como sucesso', 'Sucesso');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          this.toast.error('Erro ao salvar evento', 'Erro');
        },
        () => {
          this.spinner.hide();
        },
      );
    }
  }

}
