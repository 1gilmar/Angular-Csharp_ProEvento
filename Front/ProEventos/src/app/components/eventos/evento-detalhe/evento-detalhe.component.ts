import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  // form: FormGroup;
  // form = {} as FormGroup;

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
    private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br');
    }

  ngOnInit(): void {
    this.validation();
  }

  // pode retirar o get porem no html tera de adicionar o [bsConfig]="bsConfig()"
  // com get a chamada fica assim [bsConfig]="bsConfig"
  get bsConfig(): any{
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
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

  public resetForm(): void{
    this.eventodetalheForm.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
