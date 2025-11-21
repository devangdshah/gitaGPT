export interface SlokaResponse {
  sanskrit: string;
  transliteration: string;
  translation: string;
  modernContext: string;
  practicalApplication: string;
  keyTakeaway: string;
}

export interface ChapterInfo {
  number: number;
  name: string;
  translation: string;
  verses: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}