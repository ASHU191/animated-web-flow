
import { useEffect, useState } from "react";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setDotPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleLinkHover = () => {
      setIsHovering(true);
    };

    const handleLinkLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Add event listeners to all buttons, links, inputs and other interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    // Add mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
          newInteractiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHover);
            el.addEventListener("mouseleave", handleLinkLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
      
      observer.disconnect();
    };
  }, []);

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: isHovering ? "48px" : isClicking ? "24px" : "32px",
    height: isHovering ? "48px" : isClicking ? "24px" : "32px",
    opacity: isVisible ? 1 : 0,
    backgroundColor: isHovering ? "hsl(var(--primary)/0.7)" : "hsl(var(--primary)/0.4)",
  };

  const dotStyle = {
    left: `${dotPosition.x}px`,
    top: `${dotPosition.y}px`,
    opacity: isVisible ? 1 : 0,
    transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
  };

  return (
    <>
      <div className="custom-cursor" style={cursorStyle}></div>
      <div className="custom-cursor-dot" style={dotStyle}></div>
    </>
  );
};

export default CursorEffect;
