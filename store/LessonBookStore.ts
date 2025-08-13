import { TDataTableLessonBook } from '@/type/Type';
import { create } from 'zustand'


interface IBookStore {
    lesbook: Partial<TDataTableLessonBook>
    setLessonBook: (date: Partial<TDataTableLessonBook>) => void
}
const useLessonBookStore = create<IBookStore>((set) => ({
    lesbook: {},
    setLessonBook: (lesbook) => set((state) => {
        return { lesbook: { ...state.lesbook, ...lesbook } }
    }),
}));

export default useLessonBookStore;