/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-unresolved
import sketch from "sketch";

const document = sketch.getSelectedDocument();
const page = document.selectedPage;
const Shape = sketch.Shape;
const UI = sketch.UI;
const Rectangle = sketch.Rectangle;

let rectX = 0;
let rectY = 0;
const rect = (x = 0, y = 0) => new Rectangle(x, y, 100, 100);

const colorShape = (color, x, y) =>
  new Shape({
    parent: page,
    frame: rect(x, y),
    style: {
      fills: [color],
    },
  });

export default function() {
  UI.getInputFromUser(
    "What's your name?",
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
        for (const key of Object.values(parsed[palette])) {
          colorShape(key, rectX, rectY)
          rectX += 100;
        }
        rectY += 100;
        rectX = 0;
      }
    }
  );
}
