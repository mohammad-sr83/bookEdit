import useResizeStore from "@/store/resaize/ResizeStore";

export const useButton = () => {
  const {
    setSelectedType,
    setIndexClick,
    setIsDrag,
    setRectangles,
    rectangles,
    indexClick,
  } = useResizeStore();

  const AddPhotoRectangle = () => {
    setSelectedType("photo"), setIndexClick(null), setIsDrag(true);
  };

  const AddResponseRectangle = () => {
    setSelectedType("response"), setIndexClick(null), setIsDrag(true);
  };

  const AddQuizRectangle = () => {
    setSelectedType("quiz"), setIndexClick(null), setIsDrag(true);
  };

  const AddCropRectangle = () => {
    setSelectedType("crop"), setIndexClick(null), setIsDrag(true);
  };

  const DeleteRectangles = () => {
    setRectangles([]),
      setSelectedType(null),
      setIndexClick(null),
      setIsDrag(false);
  };

  const DeleteOneRectangle = () => {
    const newRange = rectangles.filter((item) => item.id != indexClick?.id);
    setRectangles(newRange);
  };

  const MuoseRectangle = () => {
    setSelectedType(null), setIndexClick(null), setIsDrag(true);
  };

  const MoveImage = () => {
    setSelectedType(null), setIndexClick(null), setIsDrag(false);
  };

  return {
    AddResponseRectangle,
    AddPhotoRectangle,
    AddQuizRectangle,
    AddCropRectangle,
    DeleteRectangles,
    MuoseRectangle,
    MoveImage,
    DeleteOneRectangle,
  };
};
