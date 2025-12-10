import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Rect,
  Text,
  Group,
} from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import {
  CanvasContainer,
  Sidebar,
  SidebarTabs,
  TabButton,
  SidebarHeader,
  SearchBar,
  CaseList,
  CaseItem,
  MainArea,
  CanvasWrapper,
  InfoBar,
  ToolsDock,
  DockButton,
  Divider,
  CropPanel,
  PopupMenu,
  ColorGrid,
  ColorDot,
  RightPanel,
  PanelHeader,
  PanelContent,
  ResultCard,
  ActionButton,
  HiddenInput,
} from "./styles";

import sampleCase from "../../assets/Breast_cancer_img.jpg";

import {
  Search,
  NearMe,
  PanTool,
  Create,
  Crop,
  Straighten,
  ViewModule, // Split İkonu
  Grid4x4,
  Image as ImageIcon,
  DeleteSweep,
  Download,
  Psychology,
  Close,
  Check,
  RestartAlt,
} from "@mui/icons-material";
import { Slider } from "@mui/material";

// --- URL Image Bileşeni (Crop Destekli) ---
const URLImage = ({ src, crop, x, y, width, height, onImageLoad }: any) => {
  const [img] = useImage(src);

  useEffect(() => {
    if (img && onImageLoad) {
      onImageLoad(img.width, img.height);
    }
  }, [img, onImageLoad]);

  if (!img) return null;

  return (
    <KonvaImage
      image={img}
      x={x || 0}
      y={y || 0}
      width={width || img.width}
      height={height || img.height}
      crop={crop} // Crop varsa uygula
    />
  );
};

export default function Canvas() {
  const stageRef = useRef<Konva.Stage>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [activeTool, setActiveTool] = useState<string>("select");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Resim Bilgileri
  const [originalImageSize, setOriginalImageSize] = useState({ w: 0, h: 0 });
  const [uploadedImage, setUploadedImage] = useState(sampleCase);

  // Parçalama (Split) State'leri
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [splitRows, setSplitRows] = useState(2);
  const [splitCols, setSplitCols] = useState(2);
  const [splitChunks, setSplitChunks] = useState<any[]>([]);
  const [showSplitMenu, setShowSplitMenu] = useState(false);

  // Çizim
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#ef4444");
  const [penSize, setPenSize] = useState(4);
  const [showPenMenu, setShowPenMenu] = useState(false);

  // Ölçüm & Crop & Grid
  const [measureLine, setMeasureLine] = useState<{
    points: number[];
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [cropRect, setCropRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [showGrid, setShowGrid] = useState(false);

  // Veriler
  const [activeCase, setActiveCase] = useState("4098678");
  const [activeTab, setActiveTab] = useState("cases");
  const cases = [
    { id: "4098678", desc: "Карцинома щеки", status: "Активен" },
    { id: "4098679", desc: "Меланома кожи", status: "Готов" },
  ];

  // --- IMAGE LOAD ---
  const handleImageLoad = useCallback((w: number, h: number) => {
    setOriginalImageSize({ w, h });
  }, []);

  // --- SPLIT (PARÇALAMA) FONKSİYONU ---
  const handleSplit = () => {
    if (originalImageSize.w === 0) return;

    const chunks = [];
    const chunkW = originalImageSize.w / splitCols;
    const chunkH = originalImageSize.h / splitRows;
    const gap = 50; // Parçalar arası boşluk

    for (let r = 0; r < splitRows; r++) {
      for (let c = 0; c < splitCols; c++) {
        chunks.push({
          id: `chunk-${r}-${c}`,
          crop: { x: c * chunkW, y: r * chunkH, width: chunkW, height: chunkH },
          x: c * chunkW + c * gap,
          y: r * chunkH + r * gap,
          width: chunkW,
          height: chunkH,
        });
      }
    }

    setSplitChunks(chunks);
    setIsSplitMode(true);
    setShowSplitMenu(false);

    // Tüm parçaları görebilmek için biraz uzaklaş
    setScale(0.4);
    setPosition({ x: 50, y: 50 });
  };

  const resetSplit = () => {
    setIsSplitMode(false);
    setSplitChunks([]);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setShowSplitMenu(false);
  };

  // --- ZOOM & PAN ---
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale < 0.05 || newScale > 20) return;

    setScale(newScale);
    setPosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  // --- FARE ETKİLEŞİMLERİ ---
  const handleMouseDown = (e: any) => {
    if (activeTool === "hand") return;

    const stage = e.target.getStage();
    const pos = stage.getRelativePointerPosition();

    if (activeTool === "draw") {
      setIsDrawing(true);
      setLines([
        ...lines,
        { points: [pos.x, pos.y], color: penColor, width: penSize },
      ]);
    } else if (activeTool === "measure") {
      setIsDrawing(true);
      setMeasureLine({
        points: [pos.x, pos.y, pos.x, pos.y],
        text: "0px",
        x: pos.x,
        y: pos.y,
      });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getRelativePointerPosition();

    if (activeTool === "draw") {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    } else if (activeTool === "measure" && measureLine) {
      const startX = measureLine.points[0];
      const startY = measureLine.points[1];
      const dist = Math.sqrt(
        Math.pow(point.x - startX, 2) + Math.pow(point.y - startY, 2)
      ).toFixed(0);

      setMeasureLine({
        points: [startX, startY, point.x, point.y],
        text: `${dist} px`,
        x: point.x,
        y: point.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // --- CROP ---
  const startCrop = () => {
    setActiveTool("crop");
    // Ekranın ortasına varsayılan bir crop alanı koy
    setCropRect({ x: 100, y: 100, w: 300, h: 200 });
  };

  const applyCrop = () => {
    if (!cropRect || !stageRef.current) return;
    const stage = stageRef.current;

    // Kırpılan alanı DataURL olarak al
    const dataURL = stage.toDataURL({
      x: cropRect.x * scale + position.x,
      y: cropRect.y * scale + position.y,
      width: cropRect.w * scale,
      height: cropRect.h * scale,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `crop_${Date.now()}.png`;
    link.href = dataURL;
    link.click();

    setCropRect(null);
    setActiveTool("select");
  };

  // --- GÖRSEL YÜKLEME ---
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (f) => {
        setUploadedImage(f.target?.result as string);
        setLines([]);
        setMeasureLine(null);
        resetSplit();
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <CanvasContainer>
      {/* SOL PANEL */}
      <Sidebar>
        <SidebarHeader>
          <h2>Рабочее место</h2>
          <SearchBar>
            <Search className="search-icon" />
            <input type="text" placeholder="Поиск пациента..." />
          </SearchBar>
        </SidebarHeader>
        <SidebarTabs>
          <TabButton
            active={activeTab === "cases"}
            onClick={() => setActiveTab("cases")}
          >
            Случаи
          </TabButton>
          <TabButton
            active={activeTab === "archive"}
            onClick={() => setActiveTab("archive")}
          >
            Архив
          </TabButton>
        </SidebarTabs>
        <CaseList>
          {cases.map((c) => (
            <CaseItem
              key={c.id}
              active={activeCase === c.id}
              onClick={() => setActiveCase(c.id)}
            >
              <div className="case-id">#{c.id}</div>
              <div className="case-desc">{c.desc}</div>
              <span className="status">{c.status}</span>
            </CaseItem>
          ))}
        </CaseList>
      </Sidebar>

      {/* ORTA ALAN */}
      <MainArea>
        <InfoBar>
          <span>
            <strong>Vaka:</strong> {activeCase}
          </span>
          <span>|</span>
          <span>
            <strong>Zoom:</strong> {Math.round(scale * 100)}%
          </span>
        </InfoBar>

        <CanvasWrapper
          style={{
            cursor:
              activeTool === "hand"
                ? "grab"
                : activeTool === "draw"
                ? "crosshair"
                : "default",
          }}
        >
          {/* @ts-ignore */}
          <Stage
            width={window.innerWidth - 640}
            height={window.innerHeight}
            onWheel={handleWheel}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable={activeTool === "hand"}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              {/* ANA RESİM veya PARÇALANMIŞ RESİMLER */}
              {!isSplitMode ? (
                <URLImage src={uploadedImage} onImageLoad={handleImageLoad} />
              ) : (
                splitChunks.map((chunk) => (
                  <URLImage
                    key={chunk.id}
                    src={uploadedImage}
                    {...chunk}
                    onImageLoad={() => {}}
                  />
                ))
              )}

              {/* GRID */}
              {showGrid && (
                <Group>
                  {Array.from({ length: 100 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Line
                        points={[i * 200, -5000, i * 200, 5000]}
                        stroke="rgba(0,0,0,0.15)"
                        strokeWidth={1}
                      />
                      <Line
                        points={[-5000, i * 200, 5000, i * 200]}
                        stroke="rgba(0,0,0,0.15)"
                        strokeWidth={1}
                      />
                    </React.Fragment>
                  ))}
                </Group>
              )}

              {/* ÇİZİMLER */}
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.width}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                />
              ))}

              {/* ÖLÇÜM ARACI */}
              {measureLine && (
                <Group>
                  <Line
                    points={measureLine.points}
                    stroke="blue"
                    strokeWidth={2}
                    dash={[10, 5]}
                  />
                  <Text
                    x={measureLine.x}
                    y={measureLine.y}
                    text={measureLine.text}
                    fontSize={16}
                    fill="white"
                    padding={5}
                    align="center"
                    verticalAlign="middle"
                  />
                  <Rect
                    x={measureLine.x - 5}
                    y={measureLine.y - 5}
                    width={70}
                    height={25}
                    fill="blue"
                    opacity={0.7}
                    cornerRadius={4}
                  />
                  <Text
                    x={measureLine.x}
                    y={measureLine.y}
                    text={measureLine.text}
                    fontSize={14}
                    fill="white"
                    padding={2}
                  />
                </Group>
              )}

              {/* CROP ALANI */}
              {activeTool === "crop" && cropRect && (
                <Group
                  draggable
                  onDragEnd={(e) =>
                    setCropRect({
                      ...cropRect,
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                  }
                >
                  <Rect
                    x={cropRect.x}
                    y={cropRect.y}
                    width={cropRect.w}
                    height={cropRect.h}
                    fill="rgba(0,0,0,0.3)"
                    stroke="white"
                    strokeWidth={2}
                    dash={[5, 5]}
                  />
                </Group>
              )}
            </Layer>
          </Stage>

          {/* DOCK TOOLBAR */}
          <ToolsDock>
            <DockButton
              active={activeTool === "select"}
              onClick={() => setActiveTool("select")}
              data-tooltip="Выбрать"
            >
              <NearMe />
            </DockButton>
            <DockButton
              active={activeTool === "hand"}
              onClick={() => setActiveTool("hand")}
              data-tooltip="Панорама"
            >
              <PanTool />
            </DockButton>

            {/* KALEM & MENÜSÜ */}
            <div style={{ position: "relative" }}>
              <DockButton
                active={activeTool === "draw"}
                onClick={() => {
                  setActiveTool("draw");
                  setShowPenMenu(!showPenMenu);
                }}
                data-tooltip="Рисовать"
              >
                <Create
                  style={{
                    color: activeTool === "draw" ? penColor : "inherit",
                  }}
                />
              </DockButton>

              {showPenMenu && activeTool === "draw" && (
                <PopupMenu>
                  <h5>Цвет</h5>
                  <ColorGrid>
                    {[
                      "#ef4444",
                      "#3b82f6",
                      "#10b981",
                      "#f59e0b",
                      "#000000",
                    ].map((c) => (
                      <ColorDot
                        key={c}
                        color={c}
                        selected={penColor === c}
                        onClick={() => setPenColor(c)}
                      />
                    ))}
                  </ColorGrid>
                  <h5>Толщина: {penSize}px</h5>
                  <Slider
                    size="small"
                    min={1}
                    max={20}
                    value={penSize}
                    onChange={(_, v) => setPenSize(v as number)}
                  />
                </PopupMenu>
              )}
            </div>

            <DockButton
              active={activeTool === "measure"}
              onClick={() => setActiveTool("measure")}
              data-tooltip="Линейка"
            >
              <Straighten />
            </DockButton>

            <Divider />

            {/* SPLIT BUTONU VE MENÜSÜ */}
            <div style={{ position: "relative" }}>
              <DockButton
                active={isSplitMode}
                onClick={() => setShowSplitMenu(!showSplitMenu)}
                data-tooltip="Разделить (Split)"
              >
                <ViewModule />
              </DockButton>

              {showSplitMenu && (
                <PopupMenu>
                  <h5>Параметры разделения</h5>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={splitRows}
                      onChange={(e) => setSplitRows(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: 5,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      placeholder="Satır"
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={splitCols}
                      onChange={(e) => setSplitCols(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: 5,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      placeholder="Sütun"
                    />
                  </div>
                  <ActionButton onClick={handleSplit}>Применить</ActionButton>
                  {isSplitMode && (
                    <ActionButton
                      variant="danger"
                      style={{ marginTop: 5 }}
                      onClick={resetSplit}
                    >
                      Сброс
                    </ActionButton>
                  )}
                </PopupMenu>
              )}
            </div>

            <DockButton
              onClick={startCrop}
              active={activeTool === "crop"}
              data-tooltip="Обрезать"
            >
              <Crop />
            </DockButton>
            <DockButton
              onClick={() => setShowGrid(!showGrid)}
              active={showGrid}
              data-tooltip="Сетка"
            >
              <Grid4x4 />
            </DockButton>

            <Divider />

            <DockButton
              onClick={() => fileInputRef.current?.click()}
              data-tooltip="Загрузить"
            >
              <ImageIcon />
            </DockButton>
            <DockButton onClick={resetView} data-tooltip="Сброс вида">
              <RestartAlt />
            </DockButton>
            <DockButton
              onClick={() => {
                setLines([]);
                setMeasureLine(null);
              }}
              variant="danger"
              data-tooltip="Очистить"
            >
              <DeleteSweep />
            </DockButton>
            <DockButton
              onClick={() => alert("Kaydedildi")}
              data-tooltip="Сохранить"
            >
              <Download />
            </DockButton>
          </ToolsDock>

          {/* CROP ONAY PANELİ */}
          {activeTool === "crop" && (
            <CropPanel>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                Зона обрезки
              </span>
              <ActionButton
                variant="success"
                style={{ width: "auto", padding: "6px 12px" }}
                onClick={applyCrop}
              >
                <Check fontSize="small" /> Применить
              </ActionButton>
              <ActionButton
                variant="danger"
                style={{ width: "auto", padding: "6px 12px" }}
                onClick={() => setActiveTool("select")}
              >
                <Close fontSize="small" /> Отмена
              </ActionButton>
            </CropPanel>
          )}
        </CanvasWrapper>
      </MainArea>

      <HiddenInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleUpload}
      />

      {/* SAĞ PANEL */}
      <RightPanel>
        <PanelHeader>
          AI Анализ
          <Close sx={{ cursor: "pointer", color: "#9ca3af" }} />
        </PanelHeader>
        <PanelContent>
          <ResultCard>
            <h4>AI Результаты</h4>
            <p>Обнаружено 4 подозрительных области.</p>
            <div
              style={{
                marginTop: 10,
                background: "#dcfce7",
                color: "#166534",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              %94 Вероятность
            </div>
          </ResultCard>
          <ActionButton onClick={() => alert("Analiz...")}>
            <Psychology /> Запустить
          </ActionButton>
        </PanelContent>
      </RightPanel>
    </CanvasContainer>
  );
}
