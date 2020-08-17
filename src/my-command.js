/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from 'sketch'

const document = sketch.getSelectedDocument()
const page = document.selectedPage
const Artboard = sketch.Artboard
const Shape = sketch.ShapePath
const UI = sketch.UI

const newArtboard = (name, y) =>
  new Artboard({
    parent: page,
    name,
    frame: { x: 0, y, width: 1000, height: 100 },
  })

const colorShape = (parent, name, x, sharedStyle) =>
  new Shape({
    parent,
    name,
    frame: { x, y: 0, width: 100, height: 100 },
    sharedStyle,
    /*    style: {
      fills: [style],
    },
    */
  })

const newSharedStyle = (name, style) =>
  document.sharedLayerStyles.push({
    name,
    styleType: 'Layer',
    style: {
      fills: [style],
    },
  })

let rectX = 0
let rectY = 0

export default function() {
  UI.getInputFromUser(
    'Paste color palette JSON',
    {
      initialValue: 'Appleseed',
      numberOfLines: 30,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      const parsed = JSON.parse(value)
      for (const palette in parsed) {
        const paletteArboard = newArtboard(palette, rectY)
        for (const [label, hex] of Object.entries(parsed[palette])) {
          const paletteStyle = newSharedStyle(`${palette}/${label}`, hex)
          //     log(paletteStyle.id);
          colorShape(paletteArboard, label, rectX, hex)
          rectX += 100
        }
        rectY += 200
        rectX = 0
      }
    }
  )
}

// TODO Create artboard,
// TODO create layer styles with palette/label
