import { useRef, useState, useEffect } from 'react';

interface ImageItemProps {
    src: string;
    alt: string;
}

const LazyImage = ({ src, alt }: ImageItemProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={isVisible ? src : undefined} // Only set src when the image is visible
            alt={alt}
            style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#f0f0f0', // Placeholder color until image loads
            }}
        />
    );
};

export default LazyImage;
