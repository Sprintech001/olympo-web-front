/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', 
    './node_modules/layerchart/**/*.{svelte,js}'
  ],

  theme: {
    extend: {
      fontFamily: {
        "karantina": ['Karantina', 'sans-serif']
      }
    },
  },

  plugins: []
};