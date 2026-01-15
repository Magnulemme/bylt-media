import React from 'react';
import AnimatedWaveCanvas from '../components/services/sections/AnimatedWaveCanvas';

const TestCanvas = () => {
    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <h1 className="text-white text-2xl font-bold mb-8 text-center">Canvas Shape Test</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Arrow (Challenge) */}
                <div>
                    <h2 className="text-red-400 text-lg font-semibold mb-4">Arrow (Challenge)</h2>
                    <div className="h-80 rounded-2xl overflow-hidden border border-red-500/30">
                        <AnimatedWaveCanvas
                            colors={['#ef4444', '#f97316', '#dc2626']}
                            shape="arrow"
                        />
                    </div>
                </div>

                {/* Growth (Results) */}
                <div>
                    <h2 className="text-emerald-400 text-lg font-semibold mb-4">Growth (Results)</h2>
                    <div className="h-80 rounded-2xl overflow-hidden border border-emerald-500/30">
                        <AnimatedWaveCanvas
                            colors={['#10b981', '#06b6d4', '#34d399']}
                            shape="growth"
                        />
                    </div>
                </div>
            </div>

            {/* Full width versions */}
            <div className="mt-12 max-w-4xl mx-auto space-y-8">
                <div>
                    <h2 className="text-emerald-400 text-lg font-semibold mb-4">Growth - Full Width</h2>
                    <div className="h-64 rounded-2xl overflow-hidden border border-emerald-500/30">
                        <AnimatedWaveCanvas
                            colors={['#10b981', '#06b6d4', '#34d399']}
                            shape="growth"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-red-400 text-lg font-semibold mb-4">Arrow - Full Width</h2>
                    <div className="h-64 rounded-2xl overflow-hidden border border-red-500/30">
                        <AnimatedWaveCanvas
                            colors={['#ef4444', '#f97316', '#dc2626']}
                            shape="arrow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCanvas;
