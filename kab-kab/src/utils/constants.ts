import { RiHomeSmile2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";

export const NAV_LEFT_OPTIONS = [
  {
    name: "Home",
    href: "/home",
    icon: RiHomeSmile2Line,
  },
  {
    name: "Search",
    href: "/search",
    icon: FiSearch,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: CgProfile,
  },
  {
    name: "Bookmark",
    href: "/bookmark",
    icon: FaRegBookmark,
  },
  {
    name: "More",
    href: "/more",
    icon: CgMoreO,
  },
];

export const MONTH_MAP = [
  { key: "January", value: "1" },
  { key: "February", value: "2" },
  { key: "March", value: "3" },
  { key: "April", value: "4" },
  { key: "May", value: "5" },
  { key: "June", value: "6" },
  { key: "July", value: "7" },
  { key: "August", value: "8" },
  { key: "September", value: "9" },
  { key: "October", value: "10" },
  { key: "November", value: "11" },
  { key: "December", value: "12" },
];

export const DAY_MAP = Array.from({ length: 31 }, (_, i) => ({
  key: `${i + 1}`,
  value: `${i + 1}`,
}));

export const YEAR_MAP = Array.from({ length: 26 }, (_, i) => ({
  key: `${2000 + i}`,
  value: `${2000 + i}`,
}));

export const POSTS = [
  {
    name: "tent",
    username: "username",
    imageURL: "/orca.png",
    content: "Something #Woke #Rad",
    bookmarked: false,
    replies: 138,
    reposts: 420,
    likes: 273,
    replied: true,
    liked: true,
    reposted: true,
  },
];

export const POST_OPTIONS = [{}];
