import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Contacts() {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 24,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
      }}
    >
      {/* Contact Info */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            bgGradient: "linear-gradient(135deg, #6366f, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Наши контакты
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img src="/mail_icon.png" alt="mail" width={32} height={32} />
            <Typography sx={{ ml: 2, fontSize: 18 }}>
              caladrius.technology@gmail.com
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="/phone_icon.png" alt="phone" width={32} height={32} />
            <Typography sx={{ ml: 2, fontSize: 18 }}>8 800 555-92-67</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <iframe
            title="Office map"
            src="https://yandex.ru/map-widget/v1/?ll=29.179096%2C53.159120&z=16"
            width="100%"
            height={400}
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen
            loading="lazy"
          />
        </Box>
      </Box>

      {/* Contact Form */}
      <Box component="form" sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Связаться с нами
        </Typography>

        <TextField
          label="Имя"
          variant="filled"
          fullWidth
          InputProps={{
            sx: {
              backgroundColor: "#f2f2f2",
              borderRadius: 1,
              height: 44,
              color: "#000",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#000",
            },
          }}
        />

        <TextField
          label="Телефон"
          variant="filled"
          fullWidth
          InputProps={{
            sx: {
              backgroundColor: "#f2f2f2",
              borderRadius: 1,
              height: 44,
              color: "#000",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#000",
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            height: 44,
            bgcolor: "primary.main",
            fontWeight: "bold",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Заказать звонок
        </Button>
      </Box>
    </Box>
  );
}
