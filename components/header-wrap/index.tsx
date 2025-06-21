import React, { ReactNode } from 'react';

const  HeaderWrapper = ({children}:{children:ReactNode}) => {
        return (
                <div className="bg-[#E9F6FC] w-full px-4 md:px-8 lg:px-12 py-8">
                   {children}     
                </div>
        );
};

export default  HeaderWrapper;