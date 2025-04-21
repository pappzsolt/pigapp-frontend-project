import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByThree',
})
export class GroupByThreePipe implements PipeTransform {
  transform<T>(value: T[] | null): T[][] {
    if (!value) return [];

    const result: T[][] = [];

    for (let i = 0; i < value.length; i += 3) {
      result.push(value.slice(i, i + 3));
    }

    return result;
  }
}
