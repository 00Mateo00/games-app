/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
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
            boxShadow: {
                'card': '10px 10px 5px 0px rgba(0,0,0,0.5)',
            }
        },
    },
    plugins: [
        plugin(function({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('childButton', '& button');
          })
    ],
};
