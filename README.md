# Sketch JSON Color Palette Importer
Create shared layer styles by importing JSON color palettes

## Description
This plugin will add all the colors from the JSON and create a shared layer styles out of them to be used inside your project.

## Supported JSON Format

```
{
  PALETTE_NAME: {
    COLOR_LABEL: COLOR_HEX,
    ...
  }
  ...
}
```

You can use [Material Design Palette Generator](https://materialpalettes.com/) to generate accessible color palettes and export them in JSON that will work with this plugin without any modifications.
You can also use [ColorBox by Lyft Design](https://www.colorbox.io/) to generate a color palette, but it will require slight modification to the JSON code to make it work with the plugin.
