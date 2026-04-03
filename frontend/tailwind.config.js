/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0D1B6F",
          secondary: "#17339B",
          gold: "#D8B56A",
          surface: "#EEF2F8",
          canvas: "#F8FAFD",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px rgba(13, 27, 111, 0.12)",
        card: "0 18px 40px rgba(23, 51, 155, 0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, rgba(13,27,111,1) 0%, rgba(23,51,155,1) 70%, rgba(216,181,106,0.95) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
