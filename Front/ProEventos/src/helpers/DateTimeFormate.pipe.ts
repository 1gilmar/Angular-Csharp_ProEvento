import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from 'src/utils/constants';

@Pipe({
  name: 'DateTimeFormatePip'
})
export class DateTimeFormatePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT );
  }

}
