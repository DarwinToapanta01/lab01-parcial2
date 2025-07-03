/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/**/*.html",
        "./src/**/*.js", // Asegúrate de que Tailwind escanee tus archivos LitElement
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
};