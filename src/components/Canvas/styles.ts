import styled from "styled-components";

export const CanvasContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #0f172a;
  padding: 24px;
  gap: 24px;
  box-sizing: border-box;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  overflow: hidden;
`;

export const MainViewer = styled.div`
  flex: 1;
  background-color: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

export const Toolbar = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 8px;
  z-index: 100;

  button {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    transition: all 0.2s;

    &:hover {
      background: #f1f5f9;
      color: #2563eb;
    }
    &.active {
      background: #eff6ff;
      color: #2563eb;
      border-color: #bfdbfe;
    }
    svg {
      font-size: 20px;
    }
  }

  .divider {
    width: 1px;
    height: 24px;
    background: #e2e8f0;
    margin: 8px 4px;
  }
`;

export const SettingsPanel = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 240px;
  z-index: 90;
  backdrop-filter: blur(10px);

  h4 {
    margin: 0 0 15px 0;
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 10px;
  }

  .control-group {
    margin-bottom: 20px;
    label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #64748b;
    }
    input[type="range"] {
      width: 100%;
      accent-color: #2563eb;
    }
  }
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  .color-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 0 1px #cbd5e1;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
    &.active {
      transform: scale(1.2);
      box-shadow: 0 0 0 2px #2563eb;
      border-color: white;
    }
  }
`;

export const InfoPanel = styled.div`
  width: 320px;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 24px 0;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 16px;
  }

  .info-item {
    margin-bottom: 20px;
    .label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }
    .value {
      font-size: 15px;
      color: #334155;
    }
  }

  .actions {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    button {
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      &.primary {
        background-color: #2563eb;
        color: white;
        &:hover {
          background-color: #1d4ed8;
        }
      }
      &.secondary {
        background-color: transparent;
        color: #475569;
        border-color: #cbd5e1;
        &:hover {
          background-color: #f8fafc;
        }
      }
    }
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;
