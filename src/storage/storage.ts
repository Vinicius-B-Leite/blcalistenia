import Realm from 'realm';
import {openRealm} from '@/services';
import {Keys, Schemas, Storage} from './types';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

export const storage: Storage = {
  get: async <T>(key: Schemas) => {
    const realm = await openRealm();

    const result = realm.objects(key).toJSON() as T[];
    return result;
  },
  getById: async <T>(key: Schemas, id: string) => {
    const realm = await openRealm();

    const result = realm.objectForPrimaryKey(key, id)?.toJSON() as T;
    return result;
  },
  upset: async <T extends Pick<OmittedRealmTypes<T>, never>>(
    key: Schemas,
    data: T,
  ) => {
    const realm = await openRealm();

    let dataCreated = {} as T;
    realm.write(() => {
      dataCreated = realm
        .create<T>(key, data, Realm.UpdateMode.Modified)
        .toJSON() as T;
    });

    return dataCreated;
  },
  delete: async (key, id) => {
    const realm = await openRealm();

    const objectoToDelete = realm.objectForPrimaryKey(key, id);
    if (objectoToDelete) {
      realm.write(() => {
        realm.delete(objectoToDelete);
      });
    }
  },
  getKeyValueItem: async <T>(key: Keys) => {
    const response = mmkv.getString(key);

    return response ? (response as T) : null;
  },
  setKeyValueItem: async (key, theme) => {
    mmkv.set(key, theme);
    return;
  },
};
