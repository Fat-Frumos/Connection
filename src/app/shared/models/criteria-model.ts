export enum Direction {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortField {
  DATE = 'date',
  VIEW = 'view'
}

export interface CriteriaModel {
  field: SortField;
  order: Direction;
}
