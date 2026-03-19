/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    50: '#f4fbf7',
                    100: '#e3f5ea',
                    200: '#c5ebd5',
                    300: '#94d8b5',
                    400: '#5abf8f',
                    500: '#35a171',
                    600: '#268159',
                    700: '#21674a',
                    800: '#1e523c',
                    900: '#194432',
                },
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                }
            },
            boxShadow: {
                'card': '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.02)',
                'card-hover': '0px 8px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04)',
                'crisp': '0px 1px 2px rgba(0, 0, 0, 0.05)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            }
        },
    },
    plugins: [],
}
