import { Rectangle } from '@/type/schema';
import { create } from 'zustand';

interface State {
  rectangles: Rectangle[];
  currentRect: Rectangle | null;
  isDrag: boolean;
  isResize: boolean;
  scale: number;
  showImg: string;
  setShowImg:(showImg: string) => void;
  indexClick: { id: number } | null;
  selectedType: "crop" | "quiz" | "photo"|"response" | null;
  setRectangles: (rectangles: Rectangle[]) => void;
  setCurrentRect: (rect: Rectangle | null) => void;
  setIsDrag: (isDrag: boolean) => void;
  setIsResize: (isResize: boolean) => void;
  setScale: (scale: number) => void;
  setIndexClick: (indexClick: { id: number } | null) => void;
  setSelectedType: (type: "crop" | "quiz" | "photo" |"response" |null) => void;
}

const useResizeStore = create<State>((set) => ({
  rectangles: [],
  currentRect: null,
  isDrag: false,
  isResize: false,
  scale: 0.8,
  indexClick: null,
  selectedType: null,
  showImg:'https://static.paadars.com/files/courses/l6/riazi6-fasl2-6.png',
  setShowImg: (showImg) => set({ showImg }),
  setRectangles: (rectangles) => set({ rectangles }),
  setCurrentRect: (rect) => set({ currentRect: rect }),
  setIsDrag: (isDrag) => set({ isDrag }),
  setIsResize: (isResize) => set({ isResize }),
  setScale: (scale) => set({ scale }),
  setIndexClick: (indexClick) => set({ indexClick }),
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default useResizeStore;
