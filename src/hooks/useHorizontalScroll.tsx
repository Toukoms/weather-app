import { useState, useEffect, RefObject } from "react";

export function useHorizontalScroll(ref: RefObject<HTMLElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - el.offsetLeft);
      setScrollLeft(el.scrollLeft);
    };

    const handleMouseLeaveOrUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // Adjust speed
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeaveOrUp);
    el.addEventListener("mouseup", handleMouseLeaveOrUp);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeaveOrUp);
      el.removeEventListener("mouseup", handleMouseLeaveOrUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, isDragging, startX, scrollLeft]);

  return {
    isDragging,
  };
}
