import { useCallback, useEffect, useRef } from "react";
export const useOnDraw = (onDraw) => {
  const isPainting = useRef(false);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  // 為什麼這樣就可以取得到ref了？
  // canvas component↓↓↓↓
  // const setCanvasRef = useOnDraw()
  // return (
  //   <>
  //     <canvas
  //       ref={setCanvasRef}
  //     ></canvas>
  //   </>
  // );
  const setCanvasRef = (ref) => {
    // console.log(ref);
    if (!ref) return;
    canvasRef.current = ref;
  };
  const startPainting = () => {
    isPainting.current = true;
  };
  const stopPainting = () => {
    isPainting.current = false;
    ctx.current.beginPath();
  };
  const painting = useCallback(() => {
    canvasRef.current.addEventListener("mousemove", (e) => {
      if (isPainting.current) {
        if (onDraw) onDraw(ctx.current, e.clientX, e.clientY);
      }
    });
  }, [onDraw]);

  useEffect(() => {
    if (isPainting) painting();
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
    return () => stopPainting();
  }, [isPainting, painting]);
  return { setCanvasRef, startPainting, stopPainting, ctx };
};
