import React, { useState, useEffect } from "react";
import {
  GlobalStyle,
  BurgerButton,
  HamburgerMenuOverlay,
  HamburgerMenuContent,
  CloseButton,
  MenuItem,
  MenuFooter,
  MenuSocialIcon,
} from "./styles"; // styles.ts'den import ediyoruz

// Modern SVG İkonlar
const MenuIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Sosyal İkonlar (Telegram/VK)
const TelegramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const VKIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Burger() {
  const [open, setOpen] = useState(false);

  // Menü açıkken arkaplan scroll'unu engelle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <GlobalStyle />

      {/* Açma Butonu */}
      {!open && (
        <BurgerButton aria-label="Menu" onClick={() => setOpen(true)}>
          <MenuIcon />
        </BurgerButton>
      )}

      {/* Menü Overlay ve İçerik */}
      {open && (
        <HamburgerMenuOverlay onClick={closeMenu}>
          <HamburgerMenuContent onClick={(e) => e.stopPropagation()}>
            <CloseButton aria-label="Close" onClick={closeMenu}>
              <CloseIcon />
            </CloseButton>

            <div style={{ marginTop: "20px", width: "100%" }}>
              <MenuItem to="/" onClick={closeMenu}>
                Главная
              </MenuItem>
              <MenuItem to="/products" onClick={closeMenu}>
                Продукты
              </MenuItem>
              <MenuItem to="/projects" onClick={closeMenu}>
                Проекты
              </MenuItem>
              <MenuItem to="/archive" onClick={closeMenu}>
                Архив
              </MenuItem>
              <MenuItem to="/about" onClick={closeMenu}>
                О компании
              </MenuItem>
              <MenuItem to="/contacts" onClick={closeMenu}>
                Контакты
              </MenuItem>
              <div
                style={{
                  height: "1px",
                  background: "#e2e8f0",
                  margin: "16px 0",
                }}
              />
              <MenuItem
                to="/auth"
                onClick={closeMenu}
                style={{ color: "#2563eb" }}
              >
                Вход / Регистрация
              </MenuItem>
            </div>

            <MenuFooter>
              <MenuSocialIcon href="https://t.me" target="_blank">
                <TelegramIcon />
              </MenuSocialIcon>
              <MenuSocialIcon href="https://vk.com" target="_blank">
                <VKIcon />
              </MenuSocialIcon>
            </MenuFooter>
          </HamburgerMenuContent>
        </HamburgerMenuOverlay>
      )}
    </>
  );
}
