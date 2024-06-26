import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { GrTask } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { TOGGLE_SIDEBAR } from "../../redux/types/types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface MenuItem {
    text: string;
    imgSrc: React.ReactNode;
    href: string;
    subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
    { text: "Dashboard", imgSrc: <AiOutlineDashboard className="text-2xl" />, href: "" },
    { text: "Projects", imgSrc: <GoProjectSymlink className="text-2xl" />, href: "#!" },
    { text: "Tasks", imgSrc: <GrTask className="text-2xl" />, href: "#!" },
    { text: "Attendance", imgSrc: <HiOutlineUserGroup className="text-2xl" />, href: "#!" },
    { text: "Calendar", imgSrc: <SlCalender className="text-2xl" />, href: "#!" },
    { text: "Products", imgSrc: <MdProductionQuantityLimits className="text-2xl" />, href: "/" },
];

const Sidebar: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<MenuItem | null>(null);
    const location = useLocation();
    const dispatch = useDispatch();

    const { isOpen } = useSelector((state: any) => state?.ToggleClickState)

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR, payload: !isOpen })
    };

    const handleExpandItem = (item: MenuItem) => {
        setExpandedItem(expandedItem === item ? null : item);
    };

    return (
        <>
            <div
                className={`flex flex-col h-[calc(100vh_-_20px)] bg-[#36454F] text-white ${isOpen ? "w-64" : "w-20"
                    } mx-[18px] my-[10px] px-[12px] rounded-[30px] transition-width duration-300`}>
                <div className={`flex items-center ${isOpen ? "px-[25px] justify-between" : "px-[10px] justify-center"} py-[30px]`}>
                    <h1 className={`${isOpen ? "block" : "hidden"} text-2xl text-[#42A7C3] font-semibold`}>Logo</h1>
                    <button onClick={toggleSidebar} className="focus:outline-none">
                        {isOpen ? <LuChevronFirst className="text-2xl" /> : <LuChevronLast className=" text-2xl" />}
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {menuItems?.map((item, index) => (
                        <div key={index} className="relative">
                            <div
                                className={`flex items-center sidebar ${isOpen ? "px-[25px]" : "px-[10px] justify-center"} ${location?.pathname === item?.href ? "bg-[#42A7C3]" : ""
                                    }   py-[18px] cursor-pointer rounded-[30px] hover:font-semibold text-lg hover:text-white ease-in duration-150 hover:bg-[#42A7C3]`}
                                onClick={() => (item.subItems ? handleExpandItem(item) : null)}>
                                <span className={isOpen ? "mr-3" : "mr-0"}>
                                    {item?.imgSrc}
                                </span>
                                <span className={`${isOpen ? "block" : "hidden"}`}>{item.text}</span>
                                {item.subItems && (
                                    <span className={`${isOpen ? "block" : "hidden"} ml-auto`}>
                                        {expandedItem === item ? (
                                            <img src="/images/chevron-down.png" alt="Collapse" />
                                        ) : (
                                            <img src="/images/chevron-right.png" alt="Expand" />
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="border-[#42A7C3] mt-[24px]" />
                <div className={`flex items-center py-[27px] px-[25px]  ${isOpen ? "justify-between" : "justify-center"}`}>
                    <div className="flex items-center justify-center">
                        <FaRegCircleUser className={`text-3xl ${isOpen ? "mr-3" : "mr-0"}`} />
                        <div className={`${isOpen ? "block" : "hidden"} ml-[10px]`}>
                            <h4 className="text-base mb-[-6px] font-semibold">John Doe</h4>
                            <span className="text-[10px]">Admin</span>
                        </div>
                    </div>
                    {isOpen && <IoIosLogOut className="mr-3 text-2xl" />}

                </div>
            </div>
        </>
    );
};

export default Sidebar;
