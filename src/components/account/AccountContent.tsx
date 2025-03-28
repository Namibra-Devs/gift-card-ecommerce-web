import { useState } from "react";
import Account from "./user/Account";
import Orders from "./orders/Orders";
import Security from "./security/Security";

const AccountContent = () => {
  const [activeTab, setActiveTab] = useState("Account");

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

  return (
    <div className="flex flex-col md:flex-row gap-10 min-h-screen py-[40px] px-4 md:px-[255px]">
      {/* Sidebar */}
      <div className="w-full md:w-1/3">
        {["Account", "Orders", "Security"].map((tab) => (
          <button
            key={tab}
            className={`block w-full text-cetner p-[24px] mb-2 rounded-[8px] transition ${
              activeTab === tab
                ? "bg-greylight text-greynormal"
                : "border border-greylight hover:bg-greylight"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-10 border-l border-greylight">{renderTabContent()}</div>
    </div>
  );
};

export default AccountContent;
