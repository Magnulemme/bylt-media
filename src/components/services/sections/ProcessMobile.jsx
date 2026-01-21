import React from 'react';

const ProcessMobile = ({ process }) => {
    return (
        <div className="md:hidden mt-4 space-y-3">
            {/* Section Label */}
            <div className="text-center mb-4">
                <span className="text-label text-slate-500">Our Process</span>
            </div>

            {process.slice(0, 3).map((step) => (
                <div
                    key={step.step}
                    className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-5 pb-3">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm text-slate-900">
                                {step.step}
                            </div>
                            <div>
                                <h3 className="heading-h4 text-white">
                                    {step.title}
                                </h3>
                                <p className="text-caption">{step.subtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content - Always visible */}
                    <div className="px-5 pb-5 pt-0">
                        <p className="text-body-sm mb-4">{step.description}</p>
                        <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-body-sm text-slate-500">
                                    <span className="text-cyan-500 mt-0.5">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProcessMobile;
