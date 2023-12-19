import {SCHEMA_KEYS} from './config';

type Keys = keyof typeof SCHEMA_KEYS;

export type Storage = {
  get: <T>(key: Keys) => Promise<T[]>;
  getById: <T>(key: Keys, id: string) => Promise<T>;
  upset: <T extends Pick<OmittedRealmTypes<T>, never>>(
    key: Keys,
    data: T,
  ) => Promise<T>;
  delete: (key: Keys, id: string) => Promise<void>;
};
