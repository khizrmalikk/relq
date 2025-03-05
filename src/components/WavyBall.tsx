"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { useSpring } from "framer-motion";
import { WhiteRectangle } from "@/components/white-rectangle";
import { MouthAudioVisualizer } from "@/components/mouthAudioVisualiser";

export const WavyBall = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref for the container to compute mouse positions relative to the ball
  const containerRef = useRef<HTMLDivElement>(null);
  // State to store the offset for each eye (in pixels)
  const [eyeOffsets, setEyeOffsets] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });


  // Animate scale on press and speaking state
  const pressScale = useSpring(props.isCalling ? 0.9 : 1, {
    stiffness: 400,
    damping: 20,
  });
  const speakingScale = useSpring(props.isSpeaking ? 1.05 : 1, {
    stiffness: 300,
    damping: 10,
  });


  // We keep hover state just for scaling have effect when the mouse is over the ball.
  const [isHovered, setIsHovered] = useState(false);


  // Global mouse move handler so that the eyes follow the mouse anywhere on the page.
  const handleGlobalMouseMove = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;


    // Calculate mouse position relative to container.
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;


    // Define base positions for the eyes (in pixels).
    const leftBaseX = 0.35 * props.size;
    const leftBaseY = 0.40 * props.size;
    const rightBaseX = 0.65 * props.size;
    const rightBaseY = 0.40 * props.size;


    // Maximum displacement allowed (e.g., 5% of the ball size)
    const maxOffset = props.size * 0.05;


    // Compute offset for left eye:
    let dxLeft = mouseX - leftBaseX;
    let dyLeft = mouseY - leftBaseY;
    const distLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);
    if (distLeft > maxOffset) {
      dxLeft = (dxLeft / distLeft) * maxOffset;
      dyLeft = (dyLeft / distLeft) * maxOffset;
    }


    // Compute offset for right eye:
    let dxRight = mouseX - rightBaseX;
    let dyRight = mouseY - rightBaseY;
    const distRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);
    if (distRight > maxOffset) {
      dxRight = (dxRight / distRight) * maxOffset;
      dyRight = (dyRight / distRight) * maxOffset;
    }


    setEyeOffsets({
      left: { x: dxLeft, y: dyLeft },
      right: { x: dxRight, y: dyRight },
    });
  };


  // We still use onMouseEnter and onMouseLeave on the container for scaling effects.
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };


  // Add the global mousemove event listener.
  useEffect(() => {
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [handleGlobalMouseMove]);


  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    // Get the device pixel ratio (defaults to 1 for standard displays)
    const dpr = window.devicePixelRatio || 1;


    // Set the internal canvas dimensions for high-definition rendering.
    const setCanvasDimensions = () => {
      // Increase the number of pixels for clarity.
      canvas.width = props.size * dpr;
      canvas.height = props.size * dpr;
      // Ensure the canvas CSS size stays at the intended dimensions.
      canvas.style.width = `${props.size}px`;
      canvas.style.height = `${props.size}px`;
      // Scale the canvas context so that drawing operations use the original coordinate system.
      ctx.scale(dpr, dpr);
    };
    setCanvasDimensions();


    const render = () => {
      // Clear canvas for next frame.
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      // Use the full canvas size for drawing.
      const w = props.size;
      const h = props.size;
      const centerX = w / 2;
      const centerY = h / 2;
      const margin = 10; // margin so the ball doesn't touch the border
      const radius = Math.min(w, h) / 2 - margin;


      // Fixed light source on the top left.
      const lightX = centerX - radius * 0.5;
      const lightY = centerY - radius * 0.5;


      /*
        Create a radial gradient for a 3D-like effect.
        The inner circle uses the light's position while the outer is centered.
      */
      const gradient = ctx.createRadialGradient(
        lightX,
        lightY,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, "#60a5fa");
      gradient.addColorStop(0.5, "#3b82f6");
      gradient.addColorStop(1, "#2563eb");


      // Draw the solid 3D ball.
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();


      // Optional subtle stroke for definition.
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.stroke();


      // ---- Add Clear and Glossy Outer Layer ----


      // 1. Crisp rim highlight.
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      const outerGlowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.97,
        centerX,
        centerY,
        radius
      );
      outerGlowGradient.addColorStop(0, "rgba(255,255,255,0)");
      outerGlowGradient.addColorStop(0.5, "rgba(255,255,255,0.6)");
      outerGlowGradient.addColorStop(0.51, "rgba(255,255,255,0.6)");
      outerGlowGradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = outerGlowGradient;
      ctx.fill();
      ctx.restore();


      // 2. Glossy highlight (simulated reflection) on the upper left.
      ctx.save();
      const highlightX = centerX - radius * 0.5;
      const highlightY = centerY - radius * 0.5;
      ctx.beginPath();
      ctx.ellipse(
        highlightX,
        highlightY,
        radius * 0.35,
        radius * 0.15,
        Math.PI / 8,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      const shineGradient = ctx.createRadialGradient(
        highlightX,
        highlightY,
        0,
        highlightX,
        highlightY,
        radius * 0.35
      );
      shineGradient.addColorStop(0, "rgba(255,255,255,0.9)");
      shineGradient.addColorStop(0.3, "rgba(255,255,255,0.7)");
      shineGradient.addColorStop(0.31, "rgba(255,255,255,0.1)");
      shineGradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shineGradient;
      ctx.fill();
      ctx.restore();


      animationId = requestAnimationFrame(render);
    };


    render();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [props.size, props.isCalling, props.isLoading, props.isSpeaking]);


  return (
    <div
      ref={containerRef}
      className={cn("relative select-none", props.className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
      style={{
        width: props.size,
        height: props.size,
        transform: `scale(${pressScale.get() * speakingScale.get()}) ${isHovered ? "scale(1.1)" : "scale(1)"
          }`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <canvas
        className="rounded-full"
        ref={canvasRef}
        style={{
          width: props.size,
          height: props.size,
        }}
      />
      {/*
         Render two white rectangles as "eyes".
         They remain vertical and move along an invisible circle from their base positions.
         The computed offsets are added to these base positions.
     */}
      <WhiteRectangle
        ballSize={props.size * 0.7}
        style={{
          top: `${0.40 * props.size + eyeOffsets.left.y}px`,
          left: `${0.35 * props.size + eyeOffsets.left.x}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <WhiteRectangle
        ballSize={props.size * 0.7}
        style={{
          top: `${0.40 * props.size + eyeOffsets.right.y}px`,
          left: `${0.65 * props.size + eyeOffsets.right.x}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/*
       Show the mouth visualizer when either isCalling or isSpeaking is true.
       It will draw a thin white line that animates with a wave when isSpeaking is true.
     */}
      {(props.isCalling || props.isSpeaking) && (
        <MouthAudioVisualizer size={props.size} isSpeaking={props.isSpeaking} active={props.isCalling} />
      )}
    </div>
  );
};

