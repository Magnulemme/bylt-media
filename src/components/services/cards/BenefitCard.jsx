import React from 'react';
import { getIcon } from '../utils';
import { WobbleCard } from '../../ui/wobble-card';

const BenefitCard = ({ benefit, index }) => {
    const Icon = getIcon(benefit.icon);

    return (
        <WobbleCard
            containerClassName="h-full min-h-[120px] bg-slate-950 border border-slate-800 hover:border-cyan-500/50"
            className="p-5"
        >

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className='flex items-center space-x-4'>
                <h4 className="text-lg font-semibold mb-2">
                    {benefit.title}
                </h4><div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
                    }}
                >
                    <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                </div>
                <p className="text-body-sm text-slate-400">
                    {benefit.description}
                </p>
            </div>
        </WobbleCard>
    );
};

export default BenefitCard;
