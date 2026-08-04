import { openDB } from 'idb';

const DB_NAME = 'mindcheck-local' ;
const STORE_NAME = 'checkins';

const getDb = () => openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('createdAt', 'createdAt');
    }
  },
});

export const saveCheckIn = async (checkIn) => {
  const db = await getDb();
  return db.put(STORE_NAME, {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...checkIn,
  });
};

export const getCheckIns = async () => {
  const db = await getDb();
  return db.getAllFromIndex(STORE_NAME, 'createdAt');
};

export const clearCheckIns = async () => {
  const db = await getDb();
  return db.clear(STORE_NAME);
};

export const exportCheckIns = async () => {
  const checkIns = await getCheckIns();
  const blob = new Blob([JSON.stringify(checkIns, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'mindcheck-private-export.json';
  anchor.click();
  URL.revokeObjectURL(url);
};
