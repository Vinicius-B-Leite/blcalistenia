import {openRealm} from '@/services/realm/realm';
import {Storage} from './types';

export const storage: Storage = {
  get: async <T>(key: string) => {
    const realm = await openRealm();

    const result = realm.objects(key).toJSON() as T[];
    return result;
  },
  getById: async <T>(key: string, id: string) => {
    const realm = await openRealm();

    const result = realm.objectForPrimaryKey(key, id)?.toJSON() as T;
    return result;
  },
  upset: async <T extends Pick<OmittedRealmTypes<T>, never>>(
    key: string,
    data: T,
  ) => {
    const realm = await openRealm();

    let dataCreated = {} as T;
    realm.write(() => {
      dataCreated = realm.create<T>(key, data).toJSON() as T;
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
};
