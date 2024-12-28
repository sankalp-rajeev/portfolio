import React, { useEffect, useRef } from "react";
import "../styles/nn.css";

const GlassBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gradients = [
      {
        x: canvas.width / 4,
        y: canvas.height / 3,
        radius: 250,
        color: "rgba(255, 255, 255, 0.4)",
      },
      {
        x: (canvas.width * 3) / 4,
        y: (canvas.height * 2) / 3,
        radius: 300,
        color: "rgba(200, 200, 255, 0.2)",
      },
    ];

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gradients.forEach((gradient, index) => {
        const radialGradient = ctx.createRadialGradient(
          gradient.x,
          gradient.y,
          0,
          gradient.x,
          gradient.y,
          gradient.radius
        );

        radialGradient.addColorStop(0, gradient.color);
        radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(gradient.x, gradient.y, gradient.radius, 0, Math.PI * 2);
        ctx.fill();

        
        gradient.x += index % 2 === 0 ? 0.2 : -0.2;
        gradient.y += index % 2 === 0 ? 0.1 : -0.1;

        if (gradient.x - gradient.radius > canvas.width) gradient.x = -gradient.radius;
        if (gradient.x + gradient.radius < 0) gradient.x = canvas.width + gradient.radius;
        if (gradient.y - gradient.radius > canvas.height) gradient.y = -gradient.radius;
        if (gradient.y + gradient.radius < 0) gradient.y = canvas.height + gradient.radius;
      });
    };

    const animate = () => {
      drawBackground();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="glass-background"></canvas>;
};

export default GlassBackground;
