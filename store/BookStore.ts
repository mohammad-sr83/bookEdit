import { TDataTableBook } from '@/type/Type';
import { create } from 'zustand'


interface IBookStore {
    book: Partial<TDataTableBook>
    setBook: (date: Partial<TDataTableBook>) => void
}
const useBookStore = create<IBookStore>((set) => ({
    book: {
        tags:['داستانی']
    },
    setBook: (book) => set((state) => {
        return { book: { ...state.book, ...book } }
    }),
}));

export default useBookStore;