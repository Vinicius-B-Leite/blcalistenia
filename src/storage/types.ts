import {ThemeType} from '@/contexts';
import {SCHEMA_KEYS, KEYS} from './config';

export type Schemas = keyof typeof SCHEMA_KEYS;
export type Keys = keyof typeof KEYS;

export type Storage = {
  get: <T>(key: Schemas) => Promise<T[]>;
  getById: <T>(key: Schemas, id: string) => Promise<T>;
  upset: <T extends Pick<OmittedRealmTypes<T>, never>>(
    key: Schemas,
    data: T,
  ) => Promise<T>;
  delete: (key: Schemas, id: string) => Promise<void>;
  getKeyValueItem: <T>(key: Keys) => Promise<T | null>;
  setKeyValueItem: (key: Keys, theme: ThemeType) => Promise<void>;
};
