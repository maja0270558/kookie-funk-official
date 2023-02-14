/** @type {import('tailwindcss').Config} */

const primaryColor = "#82c91e"

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // rajdhani: [`"Rajdhani"`, `"sans-serif"`],
                // noto: [`"Noto Sans Symbols 2"`, `"sans-serif"`],
                // 'grotesque': [`"Darker Grotesque"`, `"sans-serif"`],
                'economica': [`"Economica"`, `"sans-serif"`],

            },
            gridTemplateColumns: {
                14: "repeat(14, minmax(0, 1fr))",
                fill: "repeat(autofit, minmax(100px, 1fr))",
            },

            screens: {
                'superbig': '200000px'
            }
        },
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
        require("daisyui"),
    ],
    daisyui: {
        themes: [
            {
                dark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
                    primary: primaryColor,
                },
                light: {
                    ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                    primary: primaryColor,
                },
            },
            "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
        ],
    },
};
