/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from 'sketch'
import { INITIAL_VALUE } from './shared'

const document = sketch.getSelectedDocument()
const page = document.selectedPage
const Artboard = sketch.Artboard
const Shape = sketch.ShapePath
const UI = sketch.UI
const SharedStyle = sketch.SharedStyle

const newArtboard = (name, y) =>
  new Artboard({
    parent: page,
    name,
    frame: { x: 0, y, width: 1000, height: 100 },
    flowStartPoint: true,
  })

const colorShape = (parent, name, x, color) =>
  new Shape({
    parent,
    name,
    frame: { x, y: 0, width: 100, height: 100 },
    style: {
      fills: [color],
    },
  })

const newSharedStyle = (name, style) =>
  SharedStyle.fromStyle({
    name,
    style: style.style,
    document,
  })

let layerX = 0
let artboardY = 0

export default function() {
  UI.getInputFromUser(
    'Paste color palette JSON',
    {
      initialValue: INITIAL_VALUE,
      numberOfLines: 30,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }

      try {
        const parsed = JSON.parse(value)
        Object.keys(parsed).forEach(palette => {
          const paletteArboard = newArtboard(palette, artboardY)
          // eslint-disable-next-line no-restricted-syntax
          for (const [label, hex] of Object.entries(parsed[palette])) {
            const newColor = colorShape(paletteArboard, label, layerX, hex)
            const newStyle = newSharedStyle(
              `Color/${palette}/${label}`,
              newColor
            )
            newColor.sharedStyleId = newStyle.id
            layerX += 100
          }
          artboardY += 200
          layerX = 0
        })
        UI.message('🍭 Color Palettes Generated')
      } catch (error) {
        UI.alert(
          'Error parsing JSON 😟',
          'Something is wrong with JSON. Please use JSON Validator and Formatter to verify your code.'
        )
      }
    }
  )
}

// TODO Check if artboard exists, add after
// TODO ask to create a style
