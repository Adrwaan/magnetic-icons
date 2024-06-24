import gsap from "gsap";
import { ReactElement, cloneElement, useLayoutEffect, useRef } from "react";

interface MagneticIconProps {
  children?: ReactElement;
}

export default function MagneticIcon({ children }: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handlerMouseMove = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = ref.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(ref.current, {
        x: x,
        y: y,
        ease: "elastic.out(1,0.3)",
        duration: 1,
      });
    };

    const handlerMouseLeave = () => {
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        ease: "elastic.out(1,0.3)",
        duration: 1,
      });
    };

    ref.current!.addEventListener("mousemove", handlerMouseMove);
    ref.current!.addEventListener("mouseleave", handlerMouseLeave);
  });

  return <>{cloneElement(children!, { ref })}</>;
}
