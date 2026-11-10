# Coding Assignment

## Required:

- PixiJS, HTML elements, CSS
- OOP
- MVC, Design pattern

## Would be a plus:

- TypeScript
- Brief build/deployment manual in Readme.md
- A few screenshots of the test-app / working example

## Requirements:

1. Create a rectangular area.
2. Inside the rectangular area generate random shapes with random colours.
3. The shapes must fall down from top to bottom (the generated position is outside the top of the rectangle, the
   bottom position is outside the bottom of the rectangle). The falling is controlled by the Gravity Value,
4. If you click inside the rectangle, a random shape of random colour will be generated at mouse position and start
   falling.
5. If you click a shape, it will disappear

Shape types:

- 3 sides
- 4 sides
- 5 sides
- 6 sides
- circle
- ellipse
- random

---

## Visualization:

1.  In the top left you will have two HTML text fields, one showing the number of shapes being displayed in the
    rectangle. The other text field shows the surface area (in px^2) occupied by the shapes.
2.  In the bottom you will add a couple of controls (HTML):
    -/+ increase or decrease the number of shapes generated per second (update the text field accordingly)
    -/+ increase or decrease the gravity value (update the text value accordingly)

## Run Project:

- npm install
- npm run dev

Or open dist folder and run index.html

![screenshot](screenshot/screenshot.jpg)
