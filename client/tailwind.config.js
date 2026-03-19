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
                surface: {
                    50: '#fafafa', // soft off-white background
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                }
            },
            boxShadow: {
                'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
                'hover': '0 8px 30px -4px rgba(0, 0, 0, 0.06)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
