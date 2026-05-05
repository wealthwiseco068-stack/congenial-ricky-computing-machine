import { useEffect, useRef, useState } from 'react';
import { masterLoop } from '@/hooks/useMasterLoop';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute('data-cursor');
      if (cursorType) {
        setIsHovering(true);
        setLabel(cursorType === 'view' ? 'View' : '');
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };
    const onMouseLeave = () => { setIsHovering(false); setLabel(''); };

    document.addEventListener('mouseover', onMouseEnter, true);
    document.addEventListener('mouseout', onMouseLeave, true);

    const unsubscribe = masterLoop.subscribe(({ mouse }) => {
      if (cursorRef.current) {
        const x = ((mouse.x + 1) / 2) * window.innerWidth;
        const y = (-(mouse.y - 1) / 2) * window.innerHeight;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });

    return () => {
      document.removeEventListener('mouseover', onMouseEnter, true);
      document.removeEventListener('mouseout', onMouseLeave, true);
      unsubscribe();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] flex items-center justify-center text-[10px] font-sans font-bold uppercase transition-all duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:flex ${
        isHovering ? 'bg-primary text-primary-foreground scale-150' : 'border border-primary/50 mix-blend-difference'
      }`}
      style={{ willChange: 'transform' }}
    >
      {isHovering && label && <span className="opacity-100 transition-opacity">{label}</span>}
    </div>
  );
}
