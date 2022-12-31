/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                "background":{
                    'optional':'#0e0e0e',
                    '1':'#2c193c',
                    "2":'#220f31',
                    'card':'#261536',
                    'primaryButton':'#5c0b96',
                    'alternative':'#441b5b',
                },
                'text-color': '#f7c8b2',
            },
        },
    },
    plugins: [],
};
