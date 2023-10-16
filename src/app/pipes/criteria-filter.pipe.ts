import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'criteriaFilter'
})
export class CriteriaFilterPipe implements PipeTransform {

  transform<T>(items: T[], searchText: string, criteria: string): T[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const keys: string[] = criteria.split('.');
      let value = (item as Record<string, unknown>)[keys[0]];

      for (let i = 1; i < keys.length; i++) {
        if (value === null) {
          return false;
        }
        value = (value as Record<string, unknown>)[keys[i]];
      }

      return value?.toString().toLowerCase().includes(searchText);
    });
  }
}
