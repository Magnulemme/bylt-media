import React from 'react';
import { WobbleCard } from '../../ui/wobble-card';

const BenefitCard = ({ benefit }) => {
    return (
        <WobbleCard
            containerClassName="h-full min-h-[120px] bg-slate-950 border border-slate-800 hover:border-cyan-500/50"
            className="p-5"
        >

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <h4 className="text-xl font-semibold mb-2">
                    {benefit.title}
                </h4>
                <p className="text-body-sm text-slate-400">
                    {benefit.description}
                </p>
            </div>
        </WobbleCard>
    );
};

export default BenefitCard;
