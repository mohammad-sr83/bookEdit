import { TDataTableSection } from '@/type/Type';
import { create } from 'zustand'


interface ISectionStore {
    section: Partial<TDataTableSection>
    setSection: (date: Partial<TDataTableSection>) => void
}
const useSectionStore = create<ISectionStore>((set) => ({
    section: {},
    setSection: (section) => set((state) => {
        return { section: { ...state.section, ...section } }
    }),
}));

export default useSectionStore;