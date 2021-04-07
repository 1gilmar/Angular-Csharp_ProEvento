import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidadorField {
  static mustMatch(valor: string, valor2: string): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const controle = formGroup.controls[valor];
      const controleComparar = formGroup.controls[valor2];

      if (controleComparar.errors && !controleComparar.errors.mustMatcha) {
        return null;
      }

      if (controle.value !== controleComparar.value) {
        controleComparar.setErrors({ mustMatcha: true });
      } else {
        controleComparar.setErrors(null);
      }

      return null;
    };
  }
}
