import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { transform: translate(-50%, 100%); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const CanvasContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #e5e7eb;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  color: #1f2937;
`;

// --- SOL PANEL ---
export const Sidebar = styled.div`
  width: 300px;
  background: white;
  border-right: 1px solid #d1d5db;
  display: flex;
  flex-direction: column;
  z-index: 30;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.03);
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  background: white;
`;

export const SearchBar = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    background: #f9fafb;
    outline: none;
    transition: all 0.2s;
    &:focus {
      border-color: #3b82f6;
      background: white;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 20px;
  }
`;

export const SidebarTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
`;

export const TabButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 14px;
  background: transparent;
  border: none;
  font-weight: 600;
  color: ${(props) => (props.active ? "#2563eb" : "#6b7280")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#2563eb" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #f9fafb;
    color: #1d4ed8;
  }
`;

export const CaseList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

export const CaseItem = styled.div<{ active?: boolean }>`
  padding: 14px;
  border-radius: 10px;
  background: ${(props) => (props.active ? "#eff6ff" : "white")};
  border: 1px solid ${(props) => (props.active ? "#bfdbfe" : "#e5e7eb")};
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .case-id {
    font-size: 14px;
    font-weight: 700;
    color: #1f2937;
  }
  .case-desc {
    font-size: 12px;
    color: #4b5563;
    margin-top: 4px;
  }
  .status {
    display: inline-block;
    margin-top: 8px;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 12px;
    background: #dcfce7;
    color: #166534;
    font-weight: 600;
  }
`;

// --- ORTA ALAN ---
export const MainArea = styled.div`
  flex: 1;
  position: relative;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
`;

export const CanvasWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const InfoBar = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 8px 24px;
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
  z-index: 40;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

// --- DOCK (TOOLBOX) ---
export const ToolsDock = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  padding: 8px 12px;
  border-radius: 20px;
  box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 8px;
  z-index: 50;
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DockButton = styled.button<{
  active?: boolean;
  variant?: "danger";
}>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => (props.active ? "#eff6ff" : "transparent")};
  color: ${(props) =>
    props.variant === "danger"
      ? "#ef4444"
      : props.active
      ? "#2563eb"
      : "#4b5563"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger" ? "#fef2f2" : "#f3f4f6"};
    transform: translateY(-3px);
    color: ${(props) => (props.variant === "danger" ? "#dc2626" : "#111827")};
  }

  svg {
    font-size: 22px;
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: #1f2937;
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 11px;
    white-space: nowrap;
    opacity: 1;
    pointer-events: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 32px;
  background-color: #e5e7eb;
  margin: 8px 4px;
`;

// --- POPUP MENU (KALEM VE BÖLME AYARLARI) ---
export const PopupMenu = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.2s ease-out;
  border: 1px solid #e5e7eb;
  z-index: 150;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }

  h5 {
    margin: 0 0 8px 0;
    font-size: 12px;
    color: #6b7280;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

// --- EKSİK OLAN COLOR GRID VE COLOR DOT ---
export const ColorGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

// Bu eksikti, şimdi ekledik:
export const ColorDot = styled.button<{ color: string; selected?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => (props.selected ? "#3b82f6" : "transparent")};
  box-shadow: ${(props) =>
    props.selected
      ? "0 0 0 2px white, 0 4px 6px rgba(0,0,0,0.1)"
      : "inset 0 0 0 1px rgba(0,0,0,0.1)"};
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.15);
  }
`;

// --- CROP PANEL ---
export const CropPanel = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 100;
  border: 1px solid #e5e7eb;
  animation: ${fadeIn} 0.3s;
`;

// --- SAĞ PANEL ---
export const RightPanel = styled.div`
  width: 320px;
  background: white;
  border-left: 1px solid #d1d5db;
  display: flex;
  flex-direction: column;
  z-index: 30;
`;

export const PanelHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  justify-content: space-between;
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const ResultCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;

  h4 {
    margin: 0 0 6px 0;
    font-size: 14px;
    color: #111827;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #4b5563;
  }
`;

export const ActionButton = styled.button<{
  variant?: "primary" | "danger" | "success";
}>`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  background: ${(props) =>
    props.variant === "danger"
      ? "#fee2e2"
      : props.variant === "success"
      ? "#dcfce7"
      : "#2563eb"};
  color: ${(props) =>
    props.variant === "danger"
      ? "#dc2626"
      : props.variant === "success"
      ? "#166534"
      : "white"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
