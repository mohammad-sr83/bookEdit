import CollectionsBookmarkTwoToneIcon from "@mui/icons-material/CollectionsBookmarkTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Navigation } from "@toolpad/core/AppProvider";
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const NAVIGATION: Navigation = [
  {
    title: "داشبورد",
    segment: "",
    icon: <DashboardTwoToneIcon />,
  },
  {
    title: " کمک درسی ها  ",
    segment: "textbook",
    icon: <MenuBookIcon />,
  },
  {
    title: " کتاب ها ",
    segment: "books",
    icon: <CollectionsBookmarkTwoToneIcon />,
  },
  {
    title: "کتاب های کمک درسی",
    segment: "lessonBook",
    icon: <MenuBookIcon />,
    children: [
      {
        title: "کتاب",
        segment: "book",
        icon: <CollectionsBookmarkTwoToneIcon />,
      },
      {
        title: "درس",
        segment: "lesson",
        icon: <PlayLessonIcon />,
      },
      {
        title: "بخش",
        segment: "section",
        icon: <EventSeatIcon />,
      },
    ],
  },
];

export default NAVIGATION;
