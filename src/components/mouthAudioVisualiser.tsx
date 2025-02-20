import React, { useRef, useEffect } from "react";


export const MouthAudioVisualizer = ({
 size,
 isSpeaking,
 active,
}: {
 size: number;
 isSpeaking: boolean;
 active: boolean;
}) => {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 // Keep track of the sine phase for the wavy effect.
 const phaseRef = useRef(0);
 // This ref controls the expansion progress of the mouth (0 = collapsed, 1 = full width).
 const expansionRef = useRef(0);


 useEffect(() => {
   let animationId: number;
   const canvas = canvasRef.current;
   if (!canvas) return;
   const ctx = canvas.getContext("2d");
   if (!ctx) return;


   // Use device pixel ratio for crisp rendering.
   const dpr = window.devicePixelRatio || 1;
   canvas.width = size * dpr;
   canvas.height = size * dpr;
   canvas.style.width = `${size}px`;
   canvas.style.height = `${size}px`;
   ctx.scale(dpr, dpr);


   // Configuration for the mouth’s wave.
   const baseAmplitude = 6;
   const numWaves = 3;
   const baseline = size * 0.7;
   // Define the final half-width for the mouth. (Full width is 20% of the ball.)
   const centerX = size / 2;
   const halfFinalWidth = size * 0.1;
   // Adjust how fast the expansion/contraction animates.
   const smoothingFactor = 0.1;


   const render = () => {
     // Update our expansion factor based on the "active" prop.
     const targetExpansion = active ? 1 : 0;
     expansionRef.current += (targetExpansion - expansionRef.current) * smoothingFactor;
     if (Math.abs(targetExpansion - expansionRef.current) < 0.001) {
       expansionRef.current = targetExpansion;
     }


     // Clear the canvas.
     ctx.clearRect(0, 0, size, size);


     // Only draw the mouth if the expansion is nonzero.
     if (expansionRef.current > 0.001) {
       // Compute start and end positions based on the expansion factor.
       const currentHalfWidth = halfFinalWidth * expansionRef.current;
       const currentStartX = centerX - currentHalfWidth;
       const currentEndX = centerX + currentHalfWidth;
       const mouthWidth = currentEndX - currentStartX;


       // Compute amplitude – add some random variation when speaking.
       const randomAmplitude = isSpeaking ? Math.random() * 2 - 1 : 0;
       const amplitude = isSpeaking ? baseAmplitude + randomAmplitude : 0;
       if (isSpeaking) {
         phaseRef.current += 0.25;
       }
       const phase = phaseRef.current;


       ctx.beginPath();
       // Draw the wave only over the current (animated) width.
       for (let x = currentStartX; x <= currentEndX; x++) {
         const t = (x - currentStartX) / mouthWidth;
         const offsetY = amplitude * Math.sin(t * numWaves * Math.PI * 2 + phase);
         const y = baseline + offsetY;
         if (x === currentStartX) {
           ctx.moveTo(x, y);
         } else {
           ctx.lineTo(x, y);
         }
       }
       ctx.lineWidth = 2;
       ctx.strokeStyle = "white";
       ctx.stroke();
     }


     animationId = requestAnimationFrame(render);
   };


   render();
   return () => {
     cancelAnimationFrame(animationId);
   };
 }, [size, isSpeaking, active]);


 return (
   <canvas
     ref={canvasRef}
     style={{
       position: "absolute",
       top: 0,
       left: 0,
       zIndex: 10,
       pointerEvents: "none",
       borderRadius: "50%",
     }}
   />
 );
};

