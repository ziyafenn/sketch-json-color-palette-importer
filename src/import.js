/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from 'sketch'
import { INITIAL_VALUE } from './shared'

const document = sketch.getSelectedDocument()
const page = document.selectedPage
const Artboard = sketch.Artboard
const ShapePath = sketch.ShapePath
const UI = sketch.UI
const docSwatches = document.swatches

const newArtboard = (name, y) =>
  new Artboard({
    parent: page,
    name,
    frame: { x: 0, y, width: 1000, height: 100 },
    flowStartPoint: true,
  })

const colorShape = (parent, name, x, color) =>
  new ShapePath({
    parent,
    name,
    frame: { x, y: 0, width: 100, height: 100 },
    style: {
      fills: [{ color }],
      borders: [{ enabled: false }],
    },
  })

const newColorVar = (name, color) =>
  sketch.Swatch.from({
    name,
    color,
  })

let layerX = 0
let artboardY = 0

export default function() {
  UI.getInputFromUser(
    'Paste color palette JSON',
    {
      initialValue: INITIAL_VALUE,
      numberOfLines: 30,
      description:
        'This is an example JSON color palette. Replace it with your own JSON code.',
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }

      let parsed
      try {
        parsed = JSON.parse(value)
      } catch (error) {
        UI.alert(
          'Error parsing JSON 😟',
          'Something is wrong with JSON. Please use JSON Validator and Formatter to verify your code.'
        )
      }
      try {
        Object.keys(parsed).forEach(palette => {
          const paletteArboard = newArtboard(palette, artboardY)
          // eslint-disable-next-line no-restricted-syntax
          for (const [label, hex] of Object.entries(parsed[palette])) {
            const colorVarName = `${palette}/${label}`
            const colorVar = newColorVar(colorVarName, hex)
            docSwatches.push(colorVar)
            const colorRef = colorVar.referencingColor
            colorShape(paletteArboard, label, layerX, colorRef)

            layerX += 100
          }
          artboardY += 200
          layerX = 0
        })
        UI.message('🍭 Color Palettes Generated')
      } catch (error) {
        UI.alert(
          'Error creating palette 😟',
          'This is likely a bug in the code of the palette generator, please report.'
        )
      }
    }
  )
}
