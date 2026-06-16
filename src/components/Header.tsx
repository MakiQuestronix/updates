import { useContext, useState } from "react";

//Icons
import ArrowIcon from "../assets/arrow.svg?react";
import NotifIcon from "../assets/notif.svg?react";
import NotifRedIcon from "../assets/notif-red.svg?react";
import ButtonIcon from "../assets/button.svg?react";
import ShareIcon from "../assets/share.svg?react";
import profilePic from "../assets/maloi.jpg";
import { SidebarContext } from "../context/SidebarContext";

function Header() {
  const [notification, setIsNotification] = useState(false);
  const [arrowPressed, setArrowPressed] = useState(false);

  //will be called by backend
  const toggleNotification = () => {
    setIsNotification(!notification);

    //send to backend latest read notif
  };
  const toggleArrow = () => {
    setArrowPressed(!arrowPressed);
  };

  const sidebarContext = useContext(SidebarContext);

  return (
    <div className="h-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3 p-4">
          {sidebarContext && (
            <button
              onClick={sidebarContext.openSidebar}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800"
              aria-label="Open sidebar menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <h6 className="font-inter font-semibold text-xl">Ingest IQ</h6>
        </div>

        <div className="flex items-center gap-4 px-4">
          {notification ? (
            <NotifRedIcon
              className="h-6 w-6 cursor-pointer"
              onClick={toggleNotification}
            />
          ) : (
            <NotifIcon
              className="h-6 w-6 cursor-pointer"
              onClick={toggleNotification}
            />
          )}
          <ButtonIcon className="h-auto w-10" />
          <ShareIcon className="h-auto w-14" />
          <img
            src={profilePic}
            className="h-10 w-auto rounded-full"
            alt="share"
          />
          <ArrowIcon
            onClick={toggleArrow}
            className={`h-8 w-8 transition-transform ${arrowPressed ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <hr className="w-full border-b border-[#E0E0E0]" />
    </div>
  );
}

export default Header;
