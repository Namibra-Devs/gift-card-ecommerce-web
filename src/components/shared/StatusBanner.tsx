// components/dashboard/ui/status/StatusBanner.tsx
import { useEffect, useState } from 'react';

type StatusBannerProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss?: () => void;
};

export const StatusBanner = ({
  message,
  type = 'info',
  duration = 3000,
  onDismiss
}: StatusBannerProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  // const bgColor = {
  //   success: 'bg-greenlightactive',
  //   error: 'bg-redlightactive',
  //   info: 'bg-warningactive'
  // }[type];

  // const textColor = {
  //   success: 'text-green-700',
  //   error: 'text-red-800',
  //   info: 'text-greylight'
  // }[type];

  return (
    <div className='absolute w-full left-0 right-0 -top-2 flex justify-center p-4'>
      <div className={`bg-statusbannerbg w-full max-w-[400px] mx-auto p-3 rounded-md border border-statusbannerborder flex flex-col justify-between items-start`}>
        <div className="flex justify-center items-center gap-2">
          <img src={type === 'success' ? '/icons/check-green.png' : type === 'error' ? "/icons/alert.png" : '/icons/info.png'} alt="Note!" className="h-4 w-4" />
          <span className={`${type === 'success' ? "text-green-500" : type === 'error' ? 'text-red-500' : 'text-greylight'}`}>{message}</span>
        </div>
      </div>
    </div>
  );
};