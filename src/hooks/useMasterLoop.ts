import { useEffect, useRef } from 'react';

type LoopCallback = (state: { delta: number, time: number, scrollY: number, progress: number, mouse: { x: number, y: number }, velocity: number }) => void;

class MasterLoop {
  private callbacks: Set<LoopCallback> = new Set();
  private lastTime: number = 0;
  private scrollY: number = 0;
  private progress: number = 0;
  private maxScroll: number = 0;
  private mouse = { x: 0, y: 0 };
  private velocity: number = 0;
  private lastScrollY: number = 0;
  private rafId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      this.onResize();
      this.start();
    }
  }

  private onScroll = () => {
    this.scrollY = window.scrollY;
    this.progress = this.maxScroll > 0 ? this.scrollY / this.maxScroll : 0;
  };

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private onResize = () => {
    this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  };

  private tick = (time: number) => {
    const delta = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    const currentVelocity = (this.scrollY - this.lastScrollY) / delta;
    this.velocity += (currentVelocity - this.velocity) * delta * 10;
    this.lastScrollY = this.scrollY;
    const state = { delta, time: time / 1000, scrollY: this.scrollY, progress: this.progress, mouse: this.mouse, velocity: this.velocity };
    this.callbacks.forEach(cb => cb(state));
    this.rafId = requestAnimationFrame(this.tick);
  };

  public start() {
    if (!this.rafId) {
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  public stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public subscribe(cb: LoopCallback) {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }
}

export const masterLoop = new MasterLoop();

export function useMasterLoop(callback: LoopCallback) {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  useEffect(() => {
    return masterLoop.subscribe((state) => cbRef.current(state));
  }, []);
}
