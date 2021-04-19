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
  estadoSalvar = 'post' as string;

  form!: FormGroup;

  // form = new FormGroup({
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
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
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

      this.estadoSalvar = 'put';

      // adicionado o + para converter a string em numero.
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          console.log(error);
          this.toastr.error('Erro ao tentar carregar evento.');
        },
        () => { this.spinner.hide(); },
      );
    }

  }

  public validation(): void {
    this.form = this.fb.group({
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
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      if (this.estadoSalvar === 'post') {
        this.evento = { ...this.form.value };

        this.eventoService[this.estadoSalvar](this.evento).subscribe(
          () => {
            this.toastr.success('Evento salvo como sucesso', 'Sucesso');
          },
          (error: any) => {
            console.log(error);
            this.toastr.error('Erro ao salvar evento', 'Erro');
          }
        ).add(() => this.spinner.hide());
      } else {
        this.evento = { id: this.evento.id, ...this.form.value };

        this.eventoService.put(this.evento).subscribe(
          () => {
            this.toastr.success('Evento salvo como sucesso', 'Sucesso');
          },
          (error: any) => {
            console.log(error);
            this.toastr.error('Erro ao salvar evento', 'Erro');
          }
        ).add(() => this.spinner.hide());
      }
    }
  }

  // public salvarEvento(): void {
  //   this.spinner.show();
  //   if (this.form.valid) {

  //     this.evento = (this.estadoSalvar === 'post')
  //       ? { ...this.form.value }
  //       : { id: this.evento.id, ...this.form.value };

  //     if (this.estadoSalvar === 'post') {
  //       this.eventoService.post(this.evento).subscribe(
  //         (eventoRetorno: Evento) => {
  //           this.toast.success('Evento salvo com Sucesso!', 'Sucesso');
  //         },
  //         (error: any) => {
  //           console.error(error);
  //           this.spinner.hide();
  //           this.toast.error('Error ao salvar evento', 'Erro');
  //         },
  //         () => this.spinner.hide()
  //       );
  //     } else {
  //       this.eventoService.put(this.evento).subscribe(
  //         (eventoRetorno: Evento) => {
  //           this.toast.success('Evento salvo com Sucesso!', 'Sucesso');
  //         },
  //         (error: any) => {
  //           console.error(error);
  //           this.spinner.hide();
  //           this.toast.error('Error ao salvar evento', 'Erro');
  //         },
  //         () => this.spinner.hide()
  //       );
  //     }
  //   }
  // }

  // public salvarEvento(): void {
  //   this.spinner.show();
  //   if (this.form.valid) {

  //     this.evento = (this.estadoSalvar === 'post')
  //               ? {...this.form.value}
  //               : {id: this.evento.id, ...this.form.value};

  //     this.eventoService[this.estadoSalvar](this.evento).subscribe(
  //       (eventoRetorno: Evento) => {
  //         this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
  //         // this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         this.spinner.hide();
  //         this.toastr.error('Error ao salvar evento', 'Erro');
  //       },
  //       () => this.spinner.hide()
  //     );
  //   }
  // }

}
