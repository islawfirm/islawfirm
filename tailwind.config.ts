import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada
        // Fondo principal
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F5F5F5",
        },
        // Texto principal
        text: {
          primary: "#333333",
          secondary: "#999999",
          dark: "#000000",
        },
        // Botones y enlaces destacados (Rojo vino/Borgoña)
        accent: {
          DEFAULT: "#8B0000",
          hover: "#6B0000",
          light: "#A00000",
        },
        // Iconos y detalles menores
        icon: {
          DEFAULT: "#999999",
          hover: "#666666",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

