import { TDataTableLesson } from '@/type/Type';
import { create } from 'zustand'


interface ILessonStore {
    lesson: Partial<TDataTableLesson>
    setLesson: (date: Partial<TDataTableLesson>) => void
}
const useLessonStore = create<ILessonStore>((set) => ({
    lesson: {},
    setLesson: (lesson) => set((state) => {
        return { lesson: { ...state.lesson, ...lesson } }
    }),
}));

export default useLessonStore;