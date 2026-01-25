import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Custom3DSwiper = () => {
    // Dati di test semplici
    const testData = [
        { id: 1, title: 'Card 1', color: 'from-cyan-500 to-blue-500' },
        { id: 2, title: 'Card 2', color: 'from-purple-500 to-pink-500' },
        { id: 3, title: 'Card 3', color: 'from-green-500 to-emerald-500' },
        { id: 4, title: 'Card 4', color: 'from-orange-500 to-red-500' },
        { id: 5, title: 'Card 5', color: 'from-yellow-500 to-amber-500' },
    ];

    return (
        <div className="min-h-dvh bg-slate-950 flex items-center justify-center p-8">
            <div className="w-full max-w-[var(--breakpoint-content)]">
                <h1 className="text-4xl font-bold text-white mb-12 text-center">
                    Custom 3D Swiper Test
                </h1>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        className="custom-swiper-prev px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold transition-all hover:bg-cyan-600"
                    >
                        ← Prev
                    </button>
                    <button
                        className="custom-swiper-next px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold transition-all hover:bg-cyan-600"
                    >
                        Next →
                    </button>
                </div>

                {/* Swiper Container */}
                <div className="relative overflow-hidden" style={{ perspective: '1200px' }}>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView="auto"
                        centeredSlides={true}
                        spaceBetween={40}
                        grabCursor={true}
                        loop={true}
                        loopedSlides={testData.length}
                        speed={400}
                        navigation={{
                            nextEl: '.custom-swiper-next',
                            prevEl: '.custom-swiper-prev',
                        }}
                        className="custom-3d-swiper"
                    >
                        {testData.map((item, index) => (
                            <SwiperSlide key={`${item.id}-${index}`} className="!w-[480px]">
                                <div className="custom-slide-content">
                                    <div
                                        className={`
                                            h-96 rounded-2xl bg-gradient-to-br ${item.color}
                                            flex items-center justify-center
                                            shadow-2xl
                                        `}
                                    >
                                        <div className="text-center">
                                            <h2 className="text-4xl font-bold text-white mb-4">
                                                {item.title}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                /* Base: tutte le slide hanno transizione e stile laterale (default) */
                .custom-3d-swiper .swiper-slide .custom-slide-content {
                    transition: all 0.5s ease;
                    transform: scale(0.85) translateZ(-200px) rotateY(0deg);
                    opacity: 0.5;
                    z-index: 1;
                }

                /* Slide centrale - in primo piano (override con classe Swiper) */
                .custom-3d-swiper .swiper-slide-active .custom-slide-content {
                    transform: scale(1) translateZ(0) rotateY(0deg);
                    opacity: 1;
                    z-index: 10;
                }

                /* Effetto prospettiva per la slide a sinistra */
                .custom-3d-swiper .swiper-slide-prev .custom-slide-content {
                    transform: scale(0.85) translateZ(-200px) rotateY(15deg);
                }

                /* Effetto prospettiva per la slide a destra */
                .custom-3d-swiper .swiper-slide-next .custom-slide-content {
                    transform: scale(0.85) translateZ(-200px) rotateY(-15deg);
                }
            `}</style>
        </div>
    );
};

export default Custom3DSwiper;
