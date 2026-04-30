/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: {
                    50: '#F2EAE0',
                },
                teal: {
                    400: '#B4D3D9',
                },
                lavender: {
                    400: '#BDA6CE',
                    500: '#9B8EC7',
                },
            },
            fontFamily: {
                sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

