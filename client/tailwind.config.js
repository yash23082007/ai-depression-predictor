/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fcfbf8',
                    100: '#f5f2ea',
                    200: '#e8e2d2',
                    300: '#d5cbb1',
                    400: '#bfae8a',
                    500: '#ae9568',
                    600: '#a0855b',
                    700: '#866c4c',
                    800: '#705a41',
                    900: '#5c4a36',
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
