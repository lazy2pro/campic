import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex justify-center">
      <div className="w-full max-w-md bg-[#0A0A0A] min-h-screen relative shadow-2xl flex flex-col">
        {children}
      </div>
    </div>
  );
};
