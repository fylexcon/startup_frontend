import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  CanvasContainer,
  InfoPanel,
  MainViewer,
  Toolbar,
  HiddenInput,
  SettingsPanel,
  ColorPicker,
} from "./styles";
import case1 from "../../assets/Breast_cancer_img.jpg"; // Resim yolunu kontrol et

// İkonlar
import {
  Architecture,
  PanTool,
  AddPhotoAlternate,
  Delete,
  RestartAlt,
  Download,
  CropSquare,
  Circle,
  Title,
  Undo,
  Redo,
  Tune,
} from "@mui/icons-material";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<"select" | "draw">("select");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Ayarlar
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [brushColor, setBrushColor] = useState("red");
  const [brushWidth, setBrushWidth] = useState(5);

  // Undo/Redo
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const isHistoryProcessing = useRef(false);

  // 1. CANVAS BAŞLATMA
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - 380, // Panel payı
      height: window.innerHeight - 50,
      backgroundColor: "#1e293b",
      selection: true,
      preserveObjectStacking: true,
    });

    // Ana Resmi Yükle
    fabric.Image.fromURL(case1, (img) => {
      const scale = Math.min(
        (canvas.width! - 50) / img.width!,
        (canvas.height! - 50) / img.height!
      );

      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: "center",
        originY: "center",
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        selectable: false,
        evented: false,
      });

      // @ts-ignore
      img.filters = [];
      canvas.add(img);
      canvas.sendToBack(img);
      saveHistory(canvas);
    });

    // Zoom
    canvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Pan (Sürükleme)
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    canvas.on("mouse:down", function (opt) {
      const evt = opt.e;
      if (!canvas.isDrawingMode && !canvas.getActiveObject()) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
        canvas.defaultCursor = "grabbing";
      }
    });

    canvas.on("mouse:move", function (opt) {
      if (isDragging) {
        const e = opt.e;
        const vpt = canvas.viewportTransform!;
        vpt[4] += e.clientX - lastPosX;
        vpt[5] += e.clientY - lastPosY;
        canvas.requestRenderAll();
        lastPosX = e.clientX;
        lastPosY = e.clientY;
      }
    });

    canvas.on("mouse:up", function () {
      canvas.setViewportTransform(canvas.viewportTransform!);
      isDragging = false;
      canvas.selection = true;
      canvas.defaultCursor = "default";
      saveHistory(canvas);
    });

    canvas.on(
      "object:added",
      () => !isHistoryProcessing.current && saveHistory(canvas)
    );
    canvas.on(
      "object:modified",
      () => !isHistoryProcessing.current && saveHistory(canvas)
    );

    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    };
  }, []);

  // 2. ARAÇLAR
  const toggleTool = (tool: "select" | "draw") => {
    if (!fabricCanvas) return;
    setActiveTool(tool);
    fabricCanvas.isDrawingMode = tool === "draw";
    if (tool === "draw") {
      fabricCanvas.freeDrawingBrush.width = brushWidth;
      fabricCanvas.freeDrawingBrush.color = brushColor;
    }
  };

  const addShape = (type: "rect" | "circle") => {
    if (!fabricCanvas) return;
    let shape;
    const center = fabricCanvas.getCenter();
    const opts = {
      left: center.left,
      top: center.top,
      fill: "transparent",
      stroke: brushColor,
      strokeWidth: 3,
    };

    if (type === "rect")
      shape = new fabric.Rect({ ...opts, width: 100, height: 100 });
    else shape = new fabric.Circle({ ...opts, radius: 50 });

    fabricCanvas.add(shape);
    fabricCanvas.setActiveObject(shape);
    toggleTool("select");
  };

  const addText = () => {
    if (!fabricCanvas) return;
    const center = fabricCanvas.getCenter();
    const text = new fabric.IText("Not...", {
      left: center.left,
      top: center.top,
      fontSize: 24,
      fill: brushColor,
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    toggleTool("select");
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fabricCanvas || !e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result as string;
      fabric.Image.fromURL(data, (img) => {
        img.scale(0.3);
        img.set({ left: 100, top: 100 });
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
      });
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = "";
  };

  const applyFilters = (br: number, ct: number) => {
    if (!fabricCanvas) return;
    // @ts-ignore
    const bgImage = fabricCanvas
      .getObjects()
      .find((obj) => obj.type === "image" && !obj.selectable);
    if (bgImage && bgImage instanceof fabric.Image) {
      // @ts-ignore
      bgImage.filters = [
        new fabric.Image.filters.Brightness({ brightness: br }),
        new fabric.Image.filters.Contrast({ contrast: ct }),
      ];
      // @ts-ignore
      bgImage.applyFilters();
      fabricCanvas.requestRenderAll();
    }
  };

  const saveHistory = (canvas: fabric.Canvas) => {
    if (isHistoryProcessing.current) return;
    const json = JSON.stringify(canvas.toJSON());
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(json);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0 && fabricCanvas) {
      isHistoryProcessing.current = true;
      const prevStep = historyStep - 1;
      setHistoryStep(prevStep);
      fabricCanvas.loadFromJSON(history[prevStep], () => {
        fabricCanvas.renderAll();
        isHistoryProcessing.current = false;
      });
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1 && fabricCanvas) {
      isHistoryProcessing.current = true;
      const nextStep = historyStep + 1;
      setHistoryStep(nextStep);
      fabricCanvas.loadFromJSON(history[nextStep], () => {
        fabricCanvas.renderAll();
        isHistoryProcessing.current = false;
      });
    }
  };

  return (
    <CanvasContainer>
      <Toolbar>
        <button
          onClick={() => toggleTool("select")}
          className={activeTool === "select" ? "active" : ""}
          title="Seç"
        >
          <PanTool />
        </button>
        <div className="divider" />
        <button onClick={undo} title="Geri">
          <Undo />
        </button>
        <button onClick={redo} title="İleri">
          <Redo />
        </button>
        <div className="divider" />
        <button
          onClick={() => toggleTool("draw")}
          className={activeTool === "draw" ? "active" : ""}
          title="Çizim"
        >
          <Architecture />
        </button>
        <button onClick={() => addShape("rect")} title="Kare">
          <CropSquare />
        </button>
        <button onClick={() => addShape("circle")} title="Daire">
          <Circle />
        </button>
        <button onClick={addText} title="Yazı">
          <Title />
        </button>
        <div className="divider" />
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={showSettings ? "active" : ""}
          title="Ayarlar"
        >
          <Tune />
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Resim Ekle"
        >
          <AddPhotoAlternate />
        </button>
        <button
          onClick={() => {
            const active = fabricCanvas?.getActiveObject();
            if (active) fabricCanvas?.remove(active);
          }}
          title="Sil"
        >
          <Delete />
        </button>
        <div className="divider" />
        <button
          onClick={() => {
            if (fabricCanvas)
              fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
          }}
          title="Sıfırla"
        >
          <RestartAlt />
        </button>
        <button
          onClick={() => {
            const dataURL = fabricCanvas?.toDataURL({
              format: "png",
              multiplier: 2,
            });
            const link = document.createElement("a");
            link.download = "analiz.png";
            link.href = dataURL || "";
            link.click();
          }}
          title="İndir"
        >
          <Download />
        </button>
      </Toolbar>

      {showSettings && (
        <SettingsPanel>
          <h4>Görüntü Ayarları</h4>
          <div className="control-group">
            <label>
              <span>Parlaklık</span>{" "}
              <span>{Math.round(brightness * 100)}%</span>
            </label>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.05"
              value={brightness}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setBrightness(val);
                applyFilters(val, contrast);
              }}
            />
          </div>
          <div className="control-group">
            <label>
              <span>Kontrast</span> <span>{Math.round(contrast * 100)}%</span>
            </label>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.05"
              value={contrast}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setContrast(val);
                applyFilters(brightness, val);
              }}
            />
          </div>
          <h4>Çizim Rengi</h4>
          <ColorPicker>
            {[
              "#ef4444",
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#ffffff",
              "#000000",
            ].map((color) => (
              <div
                key={color}
                className={`color-dot ${brushColor === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setBrushColor(color);
                  if (fabricCanvas) fabricCanvas.freeDrawingBrush.color = color;
                }}
              />
            ))}
          </ColorPicker>
          <div className="control-group" style={{ marginTop: 15 }}>
            <label>
              <span>Kalem Kalınlığı</span> <span>{brushWidth}px</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushWidth}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setBrushWidth(val);
                if (fabricCanvas) fabricCanvas.freeDrawingBrush.width = val;
              }}
            />
          </div>
        </SettingsPanel>
      )}

      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleAddImage}
        accept="image/*"
      />
      <MainViewer>
        <canvas ref={canvasRef} />
      </MainViewer>
      <InfoPanel>
        <h3>Vaka Detayları</h3>
        <div className="info-item">
          <span className="label">Vaka No</span>
          <div className="value">WSI-001</div>
        </div>
        <div className="info-item">
          <span className="label">Teşhis</span>
          <div className="value">Liken Planus</div>
        </div>
        <div className="info-item">
          <span className="label">Klinik</span>
          <div className="value">Minsk Hastanesi</div>
        </div>
        <div className="actions">
          <button
            className="primary"
            onClick={() => {
              const dataURL = fabricCanvas?.toDataURL({
                format: "png",
                multiplier: 2,
              });
              const link = document.createElement("a");
              link.download = "analiz.png";
              link.href = dataURL || "";
              link.click();
            }}
          >
            Analizi Kaydet
          </button>
          <button className="secondary">Rapor Oluştur</button>
        </div>
      </InfoPanel>
    </CanvasContainer>
  );
}
