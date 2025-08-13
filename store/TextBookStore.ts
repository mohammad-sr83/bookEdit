import { TDataTableTextBook } from '@/type/Type';
import { create } from 'zustand'


interface ITextBookStore {
    textbook: Partial<TDataTableTextBook>
    setTextBook: (date: Partial<TDataTableTextBook>) => void
}
const useTextBookStore = create<ITextBookStore>((set) => ({
    textbook: {

    },
    setTextBook: (textbook) => set((state) => {
        return { textbook: { ...state.textbook, ...textbook } }
    }),
}));

export default useTextBookStore;