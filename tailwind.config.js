/** @type {import('tailwindcss').Config} */

const primaryColor = "#82c91e"

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        backgroundSize: {
            '100%': '100% 100%',
        },
        extend: {
            fontFamily: {
                'economica': [`"Economica"`, `"sans-serif"`],
            },
            gridTemplateColumns: {
                14: "repeat(14, minmax(0, 1fr))",
                fill: "repeat(autofit, minmax(100px, 1fr))",
            },
            screens: {
                'superbig': '200000px'
            },
            backgroundImage: {
                'sidebar-texture-light': "url('https://res.cloudinary.com/dg3zcpbkz/image/upload/v1676877835/bg/sidebar_texture_light_xtdl9s.jpg')",
                'sidebar-texture-dark': "url('https://res.cloudinary.com/dg3zcpbkz/image/upload/v1676877834/bg/sidebar_texture_dark_wb3h4d.jpg')",
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
                    "base-100": "#F5F5F5",
                },
            },
            "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
        ],
    },
};
