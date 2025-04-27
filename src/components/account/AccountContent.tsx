import { useState } from "react";
import Account from "./user/Account";
import Orders from "./orders/Orders";
import Security from "./security/Security";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AccountContent = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const [previous, setPrevious] = useState(false);
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account":
        return <Account />;
      case "Orders":
        return <Orders />;
      case "Security":
        return <Security />;
      default:
        return <Account />;
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setPrevious(true); // Show content and hide tabs
  };

  const handleBackClick = () => {
    setPrevious(false); // Show tabs and hide content
  };

  return (
    <div className="bg-greylight md:bg-white flex flex-col md:flex-row gap-3 md:gap-10 min-h-screen py-[40px] px-4 md:px-[255px]">
      {/* Back Button */}
      {previous && (
        <div className="block md:hidden">
          <button
            onClick={handleBackClick}
            title="back"
            type="button"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
          >
            <img src="/icons/arrow-left.png" alt="Back" />
          </button>
        </div>
      )}

      <div className="w-full md:w-1/3">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 ${
            previous ? "hidden md:flex" : "flex"
          }`}
        >
          <FiArrowLeft /> Home
        </button>

        {/* Sidebar */}
        <div
          className={`w-full ${previous ? "hidden" : "block bg-white rounded-[8px] p-2 md:p-0"} md:block`}
        >
          {["Account", "Orders", "Security"].map((tab) => (
            <button
              key={tab}
              className={`block w-full text-center p-[24px] mb-2 rounded-[8px] transition ${
                activeTab === tab
                  ? " md:bg-greylight text-greynormal"
                  : "border border-greylight hover:bg-greylight"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          previous ? "block" : "hidden"
        } md:block w-full md:w-3/4 p-1 md:px-10 border-l border-greylight`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AccountContent;
