import React from "react";

interface BoxProps {
  icon?: React.ReactNode;
  description: string;
}

const Box: React.FC<BoxProps> = ({ icon, description }) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full md:w-[234px] p-5 border border-[#E4E7EC] rounded-[20px]">
      {icon}
      <p className="text-base text-[#344054] font-semibold">{description}</p>
    </div>
  );
};

export default Box;
