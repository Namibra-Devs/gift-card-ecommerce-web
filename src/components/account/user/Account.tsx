
import { useState } from "react";

const Account = () => {
  const [userData, setUserData] = useState({
    phone: "02444444444",
    username: "Paul",
    firstName: "Paul",
    lastName: "Paul",
    email: "example@example.com",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editField, setEditField] = useState<keyof typeof userData | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleEdit = (field: keyof typeof userData) => {
    setEditField(field);
    setInputValue(userData[field]);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editField) {
      setUserData((prev) => ({ ...prev, [editField]: inputValue }));
    }
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="mb-4">Profile</h2>
      <div className="bg-greylight min-w-fit px-6 py-3 rounded-[16px]">
        {(Object.keys(userData) as Array<keyof typeof userData>).map((field) => (
          <div key={field} className="flex items-center justify-between py-3">
            <span className="capitalize font-medium">{field.replace(/([A-Z])/g, " $1")}</span>
            <div className="flex items-center justify-end gap-6">
            <span className="text-grey">{userData[field]}</span>
              <button
                onClick={() => handleEdit(field)}
                className="bg-greynormal text-white hover:bg-grey duration-700 rounded-[9px] py-[13px] px-[24px]"
              >
                Edit
              </button>
           </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5 p-4">
          <div className="flex flex-col justify-between bg-white rounded-[8px] shadow-lg w-[558px] h-[300px] overflow-hidden">
            <div className="flex items-center justify-between bg-greylight p-4">
              <h3 className="text-[15px] font-medium">Edit {editField}</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey"><img src="/icons/close.png" alt="Close Icon" /></button>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-greylight max-w-full px-[24px] py-[21px] rounded-[8px] m-4"
              placeholder={`Enter ${editField}`}
            />
            <div className="bg-greylight p-4 flex justify-end space-x-4">
              <button onClick={() => setModalOpen(false)} className="px-10 py-4 bg-white rounded-[8px] text-grey">
                Cancel
              </button>
              <button onClick={handleSave} className="px-10 py-4 bg-greynormal text-white rounded-[8px]">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
