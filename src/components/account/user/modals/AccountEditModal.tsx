
import { FC } from "react";

interface AccountEditModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editField: string | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSave: () => void;
  selectedCountry: { code: string; flag: string };
  setSelectedCountry: (country: { code: string; name: string; flag: string }) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  countries: { code: string; name: string; flag: string }[];
}

const AccountEditModal: FC<AccountEditModalProps> = ({
  modalOpen,
  setModalOpen,
  editField,
  inputValue,
  setInputValue,
  handleSave,
  selectedCountry,
  setSelectedCountry,
  phoneNumber,
  setPhoneNumber,
  countries,
}) => {
  return (
    <div>
         {/* Edit Modal */}
      {modalOpen && (
        <div
          onClick={(e) => {
          if (e.target === e.currentTarget) {
            setModalOpen(false);
          }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-5 p-4">
          <div className="flex flex-col justify-between bg-white rounded-[8px] shadow-lg w-[558px] h-[300px] overflow-hidden">
            <div className="flex items-center justify-between bg-greylight p-4">
              
              <h3 className="text-[15px] font-medium capitalize">Edit {editField}</h3>
              <button 
                type="button" 
                onClick={() => setModalOpen(false)} 
                className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey"
              >
                <img src="/icons/close.png" alt="Close Icon" />
              </button>
            </div>
            
            <div className="flex flex-col px-4">
              <label htmlFor="phoneNumber" className="text-greynegative capitalize mb-3">
                {editField}
              </label>
              {editField === 'phone'? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 w-full">
                      <label htmlFor="countryCode" className="sr-only">Country Code</label>
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const country = countries.find(c => c.code === e.target.value);
                          if (country) setSelectedCountry(country);
                        }}
                        className="bg-transparent focus:outline-none border border-greylight px-2 py-[21px]  w-1/4 rounded-[8px]"
                        >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                          </option>
                        ))}
                      </select>

                      <input
                      type="text"
                      name="phone"
                      placeholder="0200000000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="bg-greylight w-full px-[24px] py-[21px] rounded-[8px]"
                      />
                    </div>
                  </div>
              ) : (
                <input
                  type={editField === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-greylight max-w-full px-[24px] py-[21px] rounded-[8px]"
                  placeholder={`Enter ${editField}`}
                />
              )}
            </div>

            <div className="bg-greylight p-4 flex justify-end space-x-4">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-10 py-4 bg-white rounded-[8px] text-grey"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-10 py-4 bg-greynormal text-white rounded-[8px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountEditModal