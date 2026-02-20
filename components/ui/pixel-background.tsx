"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Configuration
    const gridSize = 40; // Size of each pixel square
    const color = "rgba(252, 126, 191, 0.15)"; // Brand pink, low opacity
    
    // Animation loop
    const pixels: { x: number; y: number; opacity: number; speed: number }[] = [];

    // Create random floating pixels
    for(let i = 0; i < 50; i++) {
        pixels.push({
            x: Math.floor(Math.random() * (window.innerWidth / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (window.innerHeight / gridSize)) * gridSize,
            opacity: Math.random(),
            speed: 0.005 + Math.random() * 0.01
        });
    }

    const drawGrid = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    };

    const animate = () => {
        if (!ctx) return;
        drawGrid();

        // Animate pixels
        pixels.forEach(p => {
            p.opacity += p.speed;
            if (p.opacity > 1 || p.opacity < 0) p.speed *= -1;
            
            ctx.fillStyle = `rgba(252, 126, 191, ${Math.abs(Math.sin(p.opacity)) * 0.2})`;
            ctx.fillRect(p.x, p.y, gridSize, gridSize);
        });
        
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-[#090117]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090117] via-transparent to-transparent" />
    </div>
  );
}
