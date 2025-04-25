interface Notification {
  message?: string;
  type?: "success" | "error";
}

interface NotificationModalProps {
    notification?: Notification | null;
}

const NotificationModal = ({ notification }: NotificationModalProps) => {
  return (
    <div>
      {/* Notification Status Modal*/}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-5 p-4">
          <div className="flex flex-col justify-between items-center text-center bg-white p-8 rounded-[8px] max-w-5xl">
            {notification.message && (
              <div className="flex flex-col items-center text-center gap-6">
                <span className="font-meidum capitalize text-grey">{notification.message}</span>
                <img
                  src={
                    notification.type === "success"
                      ? "/icons/check-mark.png"
                      : notification.type === "error"
                      ? "/icons/error.png"
                      : ""
                  }
                  alt={
                    notification.type === "success"
                      ? "Success"
                      : notification.type === "error"
                      ? "Error"
                      : ""
                  }
                  className="w-20 h-20 mb-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationModal