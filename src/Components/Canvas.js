import { useOnDraw } from "../Hooks/CanvasHooks";
import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

function Canvas(
  { props, setBackgroundColor, backgroundColor, color, size },
  ref
) {
  const currentSize = useRef(size);
  const currentColor = useRef(color);
  const { setCanvasRef, startPainting, stopPainting, ctx } = useOnDraw(onDraw);
  useEffect(() => {
    currentColor.current = color;
    currentSize.current = size;
  }, [color, currentColor, size]);

  function onDraw(ctx, x, y) {
    ctx.lineWidth = Number(currentSize.current);
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor.current;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  const fill = (color) => {
    ctx.current.fillStyle = color;
    ctx.current.rect(0, 0, 1440, 900);
    ctx.current.fill();
  };
  useImperativeHandle(ref, () => ({
    clearCanvasAll: () => {
      fill("#E8E8E8");
    },
  }));
  const handleCanvasClick = () => {
    if (props.id !== "fill") return;
    fill(currentColor.current);
  };
  return (
    <>
      <canvas
        ref={setCanvasRef}
        width="1440"
        height="900"
        style={{ background: backgroundColor }}
        onClick={handleCanvasClick}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        // onMouseMove={painting}
      ></canvas>
    </>
  );
}
export default forwardRef(Canvas);
