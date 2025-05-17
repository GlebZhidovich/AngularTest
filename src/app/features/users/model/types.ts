export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export type FilterOptionsType<T> = {
  name: keyof T;
  value: string;
};

export type OptionsType = 'email' | 'name';

