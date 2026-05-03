import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PublishFormValues } from '../types/publish.types';

interface PublishFormStore {
  lastValues: PublishFormValues;
  saveValues: (values: PublishFormValues) => void;
}

export const usePublishFormStore = create<PublishFormStore>()(
  persist(
    (set) => ({
      lastValues: {
        topic: '',
        message: '',
        dataType: 'UTF-8',
        qos: 0,
        retain: false,
      },
      saveValues: (values) => set({ lastValues: values }),
    }),
    { name: 'mqtt-publish-form' }
  )
);
