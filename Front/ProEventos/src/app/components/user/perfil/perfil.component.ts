import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadorField } from 'src/helpers/ValidadorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {

    const formOption: AbstractControlOptions = {
      validators: ValidadorField.mustMatch('senha', 'confirmeSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      descricao: ['', Validators.required],
      senha: ['', [Validators.nullValidator, Validators.minLength(6)]],
      confirmeSenha: ['', Validators.nullValidator],
    }, formOption);

  }

  onSubmit(): void {
    if (this.form.valid) {
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
