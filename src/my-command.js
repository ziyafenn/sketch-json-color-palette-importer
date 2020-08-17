/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from "sketch";

const document = sketch.getSelectedDocument();
const page = document.selectedPage;
const Artboard = sketch.Artboard;
const Shape = sketch.ShapePath;
const UI = sketch.UI;
const Rectangle = sketch.Rectangle;


const newArtboard = (name, y) => new Artboard({
  parent: page,
  name,
  flowStartPoint: true,
  frame: { x: 0, y, width: 1000, height: 100 },
})

const rect = (x = 0) => new Rectangle(x, 0, 100, 100);

const colorShape = (parent, name, color, x, y) =>
  new Shape({
    parent,
    name,
    frame: rect(x, y),
    style: {
      fills: [color],
    },
  });

  let rectX = 0;
  let rectY = 0;

export default function() {
  UI.getInputFromUser(
    "Paste color palette JSON",
    {
      initialValue: "Appleseed",
      numberOfLines: 30,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return;
      }
      const parsed = JSON.parse(value);
      for (const palette in parsed) {
        const paletteArboard = newArtboard(palette, rectY);
       // paletteArboard
       // let paletteArtboardId = paletteArboard.id
        for (const [label, hex] of Object.entries(parsed[palette])) {
          colorShape(paletteArboard, label, hex, rectX)
          rectX += 100;
        } 
        rectY += 200;
        rectX = 0; 
      }
    }
  );
}

// TODO Create artboard, 
// TODO create layer styles with palette/label