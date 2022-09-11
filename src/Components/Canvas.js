import { useOnDraw } from "../Hooks/CanvasHooks";
import { useRef, useState, useCallback, useLayoutEffect, useImperativeHandle, forwardRef } from "react";

function Canvas( { props, backgroundColor, color, size, setHaveUndo, setHaveRedo }, ref ) {
  const currentSize = useRef(size);
  const currentColor = useRef(color);
  const pic = useRef(new Image()); // 建立新的 Image
  const step = useRef(0);
  const canvasData = useRef([]);
  const [canvasArray, setCanvasArray] = useState(null);
  const { setCanvasRef, startPainting, ctx, isPainting, canvasRef } =
    useOnDraw(onDraw);

  useLayoutEffect(() => {
    if (canvasData.current.length === 0) {
      init();
    }
  }, []);

  useLayoutEffect(() => {
    currentColor.current = color;
    currentSize.current = size;
  }, [color, size]);

  function onDraw(ctx, x, y) {
    if (!isPainting) return;
    ctx.lineWidth = Number(currentSize.current);
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor.current;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  const stopPainting = () => {
    if (!isPainting.current) return;
    if (step.current !== canvasData.current.length - 1) {
      canvasData.current = canvasData.current.splice(0, step.current + 1);
    }
    step.current++;
    isPainting.current = false;
    ctx.current.beginPath();
    canvasData.current.push(canvasRef.current.toDataURL());
    getImage();
    setHaveUndo(true);
    setHaveRedo(false);
  };

  const init = () => {
    setHaveUndo(false);
    setHaveRedo(false);
    if (canvasData.current.length > 1) {
      canvasData.current = canvasData.current.splice(0, 1);
      step.current = 0;
      getImage();
    } else if (canvasData.current.length === 0) {
      canvasData.current.push(canvasRef.current.toDataURL());
      setCanvasArray(canvasData.current[0]);
      pic.current.src = canvasArray;
    }
  };

  const handleCanvasClick = () => {
    if (props.id !== "fill") return;
    fill(currentColor.current);
  };

  const fill = (color) => {
    ctx.current.fillStyle = color;
    ctx.current.rect(0, 0, window.outerWidth, window.outerHeight);
    ctx.current.fill();
  };

  const getImage = useCallback(() => {
    setCanvasArray(() => canvasData.current[step.current]);
    pic.current.src = canvasArray; //載入影像
    pic.current.onload = function () {
      ctx.current.clearRect(0, 0, window.outerWidth, window.outerHeight);
      ctx.current.drawImage(pic.current, 0, 0);
    };
  }, [canvasArray, ctx]);

  useLayoutEffect(() => {
    getImage();
    if (step.current === 0) setHaveUndo(false);
    if (step.current === canvasData.current.length - 1) setHaveRedo(false);
  }, [getImage, setHaveRedo, setHaveUndo]);

  useImperativeHandle(ref, () => ({
    saveCanvas: () => {
      document.getElementById("save").href = canvasRef.current.toDataURL();
    },
    clearCanvasAll: () => {
      fill("#E8E8E8");
      init();
    },
    undoFunc: () => {
      if (step.current > 0) {
        step.current--;
        getImage();
        setHaveRedo(true);
      }
    },
    redoFunc: () => {
      if (step.current < canvasData.current.length - 1) {
        step.current++;
        getImage();
        setHaveUndo(true);
      }
    },
  }));

  return (
    <>
      <canvas
        ref={setCanvasRef}
        width={window.outerWidth}
        height={window.outerHeight}
        style={{ background: backgroundColor }}
        onClick={handleCanvasClick}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
      ></canvas>
    </>
  );
}
export default forwardRef(Canvas);
