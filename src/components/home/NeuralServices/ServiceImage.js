import { memo, useRef, useEffect } from 'react';

const ServiceImage = memo(({ src, alt }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        // Keep the same img element, just update src if it changes
        if (imgRef.current && imgRef.current.src !== src) {
            imgRef.current.src = src;
        }
    }, [src]);

    return (
        <div className="service-image-container w-full aspect-video rounded-lg overflow-hidden border-2 border-white/10 mt-4 bg-slate-900/50">
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="eager"
                style={{
                    opacity: 1,
                    transition: 'none'
                }}
            />
        </div>
    );
});

ServiceImage.displayName = 'ServiceImage';

export default ServiceImage;
