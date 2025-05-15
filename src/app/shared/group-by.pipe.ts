import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform<T>(array: T[], groupSize: number): T[][] {
    if (!array || groupSize <= 0) {
      return [];
    }

    const groups: T[][] = [];
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
    }
    return groups;
  }

}

