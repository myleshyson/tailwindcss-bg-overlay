# Tailwindcss Background Overlays
A Tailwindcss plugin that adds box-shadow background overlay utilities.
Basically the tailwindcss version of the [tachyons plugin](https://github.com/lowmess/tachyons-background-overlays)

## How To Use
This plugin will automatically use the colors set in your tailwind config. You can override this by adding your own colors in the colors option.

The generated css will look like this.

```css
.bg-darken-{opacity} {
  inset 0 0 0 9999px rgba(defaultColor, opacity);
}
.bg-darken-{opacity}--{color} {
  inset 0 0 0 9999px rgba(color, opacity);
}
```

The default color for this plugin is #000000 but you can update this to whatever you want.

Here's all of the available options.

```js
plugins: [
  ...other plugins,
  require('tailwindcss-bg-overlays')({
    opacities: {
      '25': 0.25 //required
    },
    colors: {
      'black': '#000000' //optional
    },
    defaultColor: '#000000' //default
    variants: ['hover'] //optional
  })
]
```
