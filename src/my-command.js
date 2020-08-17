/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from "sketch";

const document = sketch.getSelectedDocument();
const page = document.selectedPage;
const Shape = sketch.Shape;
const UI = sketch.UI;
const Rectangle = sketch.Rectangle;


const rect = (x = 0, y = 0) => new Rectangle(x, y, 100, 100);

const colorShape = (name, color, x, y) =>
  new Shape({
    parent: page,
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
        for (const [label, hex] of Object.entries(parsed[palette])) {
          colorShape(label, hex, rectX, rectY)
          rectX += 100;
        } 
        rectY += 200;
        rectX = 0; 
      }
    }
  );
}
