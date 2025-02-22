"use client";
import { useSprings, animated, SpringValue } from '@react-spring/web';
import { useEffect, useRef, useState, MutableRefObject  } from 'react';

interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number;
    animationFrom?: { opacity: number; transform: string };
    animationTo?: { opacity: number; transform: string };
    easing?: (t: number) => number;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
    onLetterAnimationComplete?: () => void;
}

const Home: React.FC<SplitTextProps> = ({
    text = 'Welcome',
    className = 'text-[#fff] text-[12dvw] font-bold',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = (t: number) => t,
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next: (props: any) => Promise<void>) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    return (
        <div className='h-[100%] flex justify-center items-center'>
            <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{ textAlign, overflow: 'hidden', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}
            >
                {words.map((word:any, wordIndex:any) => (
                    <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {word.map((letter:any, letterIndex:any) => {
                            const index = words
                                .slice(0, wordIndex)
                                .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                            return (
                                // @ts-ignore
                                <animated.span key={index} style={{...springs[index],display: 'inline-block',willChange: 'transform, opacity',}}>
                                  {letter}
                                </animated.span>
                                //
                            );
                        })}
                        <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                    </span>
                ))}
            </p>
        </div>
    );
};

export default Home;