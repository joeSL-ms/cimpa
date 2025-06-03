import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',      // Escanea todo el código fuente
    './pages/**/*.{js,ts,jsx,tsx}',    // Si tienes carpeta pages
    './components/**/*.{js,ts,jsx,tsx}' // Carpeta components si existe
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#B9436B', // Tu color personalizado
      },
    },
  },
  plugins: [],
}

export default config

