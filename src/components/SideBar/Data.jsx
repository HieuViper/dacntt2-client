import { BiHomeAlt } from "react-icons/bi";
import { MdInsights } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { FiUser, FiLogOut } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuStore } from "react-icons/lu";
export const datas = [
  {
    id: 1,
    icon: <BiHomeAlt />,
    text: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: <MdInsights />,
    text: "Recommend",
    href: "/recommend",
  },
  {
    id: 3,
    icon: <LuStore />,
    text: "Stores",
    href: "/stores",
  },
  {
    id: 4,
    icon: <IoFastFoodOutline />,
    text: "Menu",
    href: "/menu",
  },
  {
    id: 5,
    icon: <RiCouponLine />,
    text: "Coupons",
  },
  {
    id: 6,
    icon: <FiUser />,
    text: "Profile",
    href: "/profile",
  },
  {
    id: 7,
    icon: <AiOutlineMessage />,
    text: "Messages",
  },
];
