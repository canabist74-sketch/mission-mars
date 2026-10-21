import React, { useEffect, useRef } from 'react';

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate stars
    const starCount = Math.min(180, Math.floor((width * height) / 12000));
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const colors = ['#ffffff', '#f1f5f9', '#ffd2a1', '#93c5fd'];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.7;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const offsetX = ((mouseX - width / 2) / width) * 12;
      const offsetY = ((mouseY - height / 2) / height) * 12;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 10 + i) * 0.25;
        const boundedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = boundedAlpha;
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX * (star.radius > 1 ? 1.5 : 0.6),
          star.y + offsetY * (star.radius > 1 ? 1.5 : 0.6),
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
