import sketch from "sketch";
let document = sketch.getSelectedDocument();
let page = document.selectedPage;
let Shape = sketch.Shape;
let UI = sketch.UI;
let Rectangle = sketch.Rectangle;
var rect = new Rectangle(0, 0, 200, 500);

const colorShape = (color) =>
  new Shape({
    parent: page,
    frame: rect,
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
          colorShape(key)
        }
      }
    }
  );
}
