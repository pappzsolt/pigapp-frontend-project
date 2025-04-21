import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform<T>(value: T[] | null, groupSize: number = 3): T[][] {
    if (!value || groupSize < 1) return [];

    const result: T[][] = [];

    for (let i = 0; i < value.length; i += groupSize) {
      result.push(value.slice(i, i + groupSize));
    }

    return result;
  }
}
