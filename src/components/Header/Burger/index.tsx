import React, { useState, useEffect } from "react";
import {
  GlobalStyle,
  BurgerButton,
  HamburgerMenuOverlay,
  HamburgerMenuContent,
  CloseButton,
  MenuItem,
} from "./styles";

import { NavLink } from "react-router-dom";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 80" width="30" height="30" fill="black" {...props}>
      <rect width="100" height="15" rx="8" />
      <rect y="30" width="100" height="15" rx="8" />
      <rect y="60" width="100" height="15" rx="8" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#18181B"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Burger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <GlobalStyle />
      {!open && (
        <BurgerButton aria-label="Open menu" onClick={() => setOpen(true)}>
          <MenuIcon />
        </BurgerButton>
      )}
      {open && (
        <HamburgerMenuOverlay onClick={() => setOpen(false)} aria-modal="true" role="dialog">
          <HamburgerMenuContent onClick={e => e.stopPropagation()}>
            <CloseButton aria-label="Close menu" onClick={() => setOpen(false)}>
              <CloseIcon />
            </CloseButton>
            <MenuItem to="/main" onClick={() => setOpen(false)}>
              Главная
            </MenuItem>
            <MenuItem to="/products" onClick={() => setOpen(false)}>
              Продукты
            </MenuItem>
            <MenuItem to="/projects" onClick={() => setOpen(false)}>
              Проекты
            </MenuItem>
            <MenuItem to="/archive" onClick={() => setOpen(false)}>
              Архив
            </MenuItem>
            <MenuItem to="/about" onClick={() => setOpen(false)}>
              О компании
            </MenuItem>
            <MenuItem to="/contacts" onClick={() => setOpen(false)}>
              Контакты
            </MenuItem>
            <MenuItem to="/auth" onClick={() => setOpen(false)}>
              Вход
            </MenuItem>
          </HamburgerMenuContent>
        </HamburgerMenuOverlay>
      )}
    </>
  );
}
