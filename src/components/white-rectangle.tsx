"use client";
import React from "react";
import { cn } from "@/lib/utils";


interface WhiteRectangleProps extends React.HTMLAttributes<HTMLDivElement> {
  // Provide the ball's size so the rectangle can be proportional.
  ballSize?: number;
  className?: string;
  style?: React.CSSProperties;
}


export const WhiteRectangle: React.FC<WhiteRectangleProps> = ({
  ballSize = 100,
  className,
  style = {},
  ...props
}) => {
  // Define rectangle dimensions relative to the ball size.
  const width = ballSize * 0.1;
  const height = ballSize * 0.2;


  return (
    <div
      className={cn("white-rectangle-container", className)}
      style={{
        position: "absolute",
        // Allow consumers to override these if desired:
        top: style.top || "40%",
        left: style.left || "50%",
        transform: style.transform || "translate(-50%, -50%)",
        ...style,
      }}
      {...props}
    >
      <div
        className="blink"
        style={{
          width,
          height,
          backgroundColor: "#ffffff",
          borderRadius: "4px",
        }}
      />
      <style jsx>{`
       @keyframes blink {
         0%,
         85%,
         100% {
           transform: scaleY(1);
         }
         90% {
           transform: scaleY(0.1);
         }
       }
       .blink {
         /* Blink every 5 seconds. */
         animation: blink 5s infinite ease-in-out;
         transform-origin: top;
       }
     `}</style>
    </div>
  );
};

