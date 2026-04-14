export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',      // soft indigo
        secondary: '#22C55E',    // calm green
        accent: '#F59E0B',       // subtle warmth
        bg: '#F8FAFC',
        card: '#FFFFFF',
        text: '#1E293B',
        subtext: '#64748B',
        border: '#E2E8F0',
        brand: {
          50: '#EEF2FF',         // Based on primary gradient start
          900: '#312E81',
        },
        ink: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          950: '#151719',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0px 8px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04)',
        'crisp': '0px 1px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
