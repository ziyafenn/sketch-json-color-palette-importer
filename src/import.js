/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from 'sketch'
import { INITIAL_VALUE } from './shared'

const document = sketch.getSelectedDocument()
const page = document.selectedPage
const Artboard = sketch.Artboard
const ShapePath = sketch.ShapePath
const Text = sketch.Text
const Group = sketch.Group
const UI = sketch.UI
const SharedStyle = sketch.SharedStyle

const ARTBOARD_WIDTH = 200
const ARTBOARD_MARGIN = 50

const newArtboard = (name, options) =>
  new Artboard({
    parent: page,
    name,
    frame: { y: 0, width: ARTBOARD_WIDTH, ...options },
    flowStartPoint: true,
  })

const colorItem = (parent, name, y, color) => {
  const group = new Group({
    parent,
    name,
    frame: { x: 0, y, width: 100, height: 100 },
  })
  const shape = new ShapePath({
    parent: group,
    name: `${name}_square`,
    frame: { x: 12, y: 6, width: 20, height: 20 },
    style: {
      fills: [color],
    },
  })
  const text = new Text({
    parent: group,
    name: `${name}_square`,
    text: `${name}   ${color}`,
    frame: { x: 50, y: 5 },
  })
  return { group, text, shape }
}

const newSharedStyle = (name, style) =>
  SharedStyle.fromStyle({
    name,
    style: style.style,
    document,
  })

const initialLayerY = 10
const itemHeight = 40
const artboardPadding = 10

let layerY = initialLayerY
let artboardX = 0

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
          const entries = Object.entries(parsed[palette])
          const artboardHeight =
            entries.length * itemHeight + artboardPadding * 2
          const paletteArboard = newArtboard(palette, {
            x: artboardX,
            height: artboardHeight,
          })
          // eslint-disable-next-line no-restricted-syntax
          for (const [label, hex] of entries) {
            const { shape: newColor } = colorItem(
              paletteArboard,
              label,
              layerY,
              hex
            )
            const newStyle = newSharedStyle(
              `Color/${palette}/${label}`,
              newColor
            )
            newColor.sharedStyleId = newStyle.id
            layerY += itemHeight
          }
          artboardX += ARTBOARD_WIDTH + ARTBOARD_MARGIN
          layerY = initialLayerY
        })
        UI.message('🍭 Color Palettes Generated')
      } catch (error) {
        UI.alert(
          'Error creating palette',
          'This is likely a bug in the code of the palette generator, please report.'
        )
      }
    }
  )
}

// TODO Check if artboard exists, add after
// TODO ask to create a style
