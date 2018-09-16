const _ = require('lodash');

function hex2RGB (hex) {
  "use strict";
  if (hex.charAt(0) === '#') {
      hex = hex.substr(1);
  }
  if ((hex.length < 2) || (hex.length > 6)) {
      return false;
  }
  var values = hex.split(''),
      r,
      g,
      b;

  if (hex.length === 2) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = r;
      b = r;
  } else if (hex.length === 3) {
      r = parseInt(values[0].toString() + values[0].toString(), 16);
      g = parseInt(values[1].toString() + values[1].toString(), 16);
      b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = parseInt(values[2].toString() + values[3].toString(), 16);
      b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
      return false;
  }
  return [r, g, b];
}

module.exports = function({variants, opacities, defaultColor = '#000', bgColors}) {
  return function({addUtilities, config, e}) {
    let colors;
    if(!bgColors) {
      colors = config('colors');
    } else {
      colors = bgColors 
    }
    const darkenDefault = _.map(opacities, (opacity, scale) => {
      if(hex2RGB(defaultColor)) {
        const [r, g, b] = hex2RGB(defaultColor);
        return {
          [`.bg-darken-${scale}`]: {
            boxShadow: `inset 0 0 0 9999px rgba(${r}, ${g}, ${b}, ${opacity})`
          }
        } 
      }
    })
    const darkenWithColors = _.map(colors, (hex, name) => {
      if(hex2RGB(hex)) {
        const [r, g, b] = hex2RGB(hex)
        return _.map(opacities, (opacity, scale) => ({
          [`.bg-darken-${scale}--${name}`]: {
            boxShadow: `inset 0 0 0 9999px rgba(${r}, ${g}, ${b}, ${opacity})`
          } 
        }))
      }
    })

    const darkenUtilities = darkenDefault.concat(darkenWithColors);

    addUtilities(darkenUtilities, variants);
  }
}
