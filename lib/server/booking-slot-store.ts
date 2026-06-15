import fs from 'fs/promises';
import path from 'path';

type StoredSlot = {
  slotKey: string;
  date: string;
  time: string;
  createdAt: string;
};

const STORE_PATH = path.join(process.cwd(), 'data', 'booked-appointments.json');
const globalStore = globalThis as typeof globalThis & {
  __uediBookedSlots?: Map<string, StoredSlot>;
  __uediSlotLock?: Promise<void>;
};

const slots = globalStore.__uediBookedSlots ?? new Map<string, StoredSlot>();
globalStore.__uediBookedSlots = slots;

let loaded = false;

async function loadStore() {
  if (loaded) return;
  loaded = true;
  try {
    const stored = JSON.parse(await fs.readFile(STORE_PATH, 'utf8')) as StoredSlot[];
    stored.forEach((slot) => slots.set(slot.slotKey, slot));
  } catch {
    // The file may not exist yet, or the deployment filesystem may be read-only.
  }
}

async function persistStore() {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify([...slots.values()], null, 2), 'utf8');
  } catch {
    // In-memory reservations still protect the active server process.
  }
}

async function withLock<T>(work: () => Promise<T>) {
  const previous = globalStore.__uediSlotLock ?? Promise.resolve();
  let release = () => {};
  globalStore.__uediSlotLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await work();
  } finally {
    release();
  }
}

export async function getBookedTimes(dateKey: string) {
  await loadStore();
  return [...slots.values()]
    .filter((slot) => slot.date === dateKey)
    .map((slot) => slot.time);
}

export async function reserveSlot(slot: StoredSlot) {
  return withLock(async () => {
    await loadStore();
    if (slots.has(slot.slotKey)) return false;
    slots.set(slot.slotKey, slot);
    await persistStore();
    return true;
  });
}

export async function releaseSlot(slotKey: string) {
  return withLock(async () => {
    slots.delete(slotKey);
    await persistStore();
  });
}
