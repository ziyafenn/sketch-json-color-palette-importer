![sketch-json-color-palette-importer](https://github.com/ziyafenn/sketch-json-color-palette-importer/blob/master/assets/icon.png?raw=true)
# Sketch JSON Color Palette Importer
Create color variables by importing JSON color palettes.

### Sketch >= 69
[Download latest version.](https://github.com/ziyafenn/sketch-json-color-palette-importer/releases/latest)

### Sketch < 69
[Download version 1.1.2](https://github.com/ziyafenn/sketch-json-color-palette-importer/releases/download/v1.1.2/json-color-palette-importer.sketchplugin.zip)

## Description
This plugin will add all the colors from the JSON and create [color variables](https://www.sketch.com/blog/2020/10/15/how-to-make-the-most-of-color-variables/) out of them to be used inside your project.

If you want to create *Shared Styles* instead of *Color Variables*, use version [1.1.2](https://github.com/ziyafenn/sketch-json-color-palette-importer/releases/download/v1.1.2/json-color-palette-importer.sketchplugin.zip).

## Supported JSON Format

```
{
  PALETTE_NAME: {
    COLOR_LABEL: COLOR_HEX,
    ...
  },
  ...
}
```

## Resources to generate colors
You can use [Material Design Palette Generator](https://materialpalettes.com/) to generate accessible color palettes and export them in JSON that will work with this plugin without any modifications.

Another tool generating a JSON file that work out-of-box is [Open Color Tools](http://opencolor.tools/)

You can also use [ColorBox by Lyft Design](https://www.colorbox.io/) to generate a color palette, but it will require slight modification to the JSON code to make it work with the plugin.

## Known issues
Even though generated *color shapes* display that they are linked to the color variables, they are not. Apparently this is an issues with the Sketch API.

## Troubleshooting
If you have any problem with importing JSON code, try to validate it first and then format/prettify it. For validation and formatting you can use any available online tool, such as https://jsonformatter.org/


## TO-DO
- [ ] Check if JSON format is correct
- [ ] Check if any artboard already exisits inside page and create new artboards after them
- [ ] Support any JSON format?


## Licence
MIT
