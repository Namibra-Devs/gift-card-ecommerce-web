
interface LinkEmailModalProps {
  emailLinkModal: boolean;
  setEmailLinkModal: (value: boolean) => void;
  emailToLink: string;
  setEmailToLink: (value: string) => void;
  handleLinkEmail: () => void;
}

const LinkEmailModal: React.FC<LinkEmailModalProps> = ({ emailLinkModal, setEmailLinkModal, emailToLink, setEmailToLink, handleLinkEmail }) => {
  return (
    <div>
        {/* Link Email Modal */}
      {emailLinkModal && (
        <div
          onClick={(e) => {
          if (e.target === e.currentTarget) {
            setEmailLinkModal(false);
          }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-50 p-4">
          <div className="flex flex-col justify-between bg-white rounded-[8px] shadow-lg w-[558px] h-[300px] overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-greylight">
              <h3 className="font-medium">Link Email</h3>
              <button onClick={() => setEmailLinkModal(false)} className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey">
                <img src="/icons/close.png" alt="Close" className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-greynegative mb-2">Email Address</p>
              <input
                type="email"
                value={emailToLink}
                onChange={(e) => setEmailToLink(e.target.value)}
                className="bg-greylight w-full px-[24px] py-[21px] rounded-[8px]"
                placeholder="Enter email"
              />
            </div>
            <div className="bg-greylight p-4 flex justify-end space-x-4">
              <button 
                onClick={() => setEmailLinkModal(false)}
                className="px-10 py-4 bg-white rounded-[8px] text-grey"
              >
                Cancel
              </button>
              <button 
                onClick={handleLinkEmail}
                className="px-10 py-4 bg-greynormal text-white rounded-[8px]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkEmailModal