# Puzzle Hunt Engine

A simple, lightweight puzzle hunt engine built with vanilla JavaScript. No frameworks, no complex dependencies - just clean, simple code.

## 🎯 **What It Is**

A modular puzzle engine that lets you create interactive puzzle hunts with:
- **Story sections** - Set the scene for each level
- **Image clues** - Visual hints and clues
- **Interactive puzzles** - Multiple puzzle types (pattern, form, input, dropdown, combination)
- **Simple management** - Easy to add new levels and puzzles

## 📁 **File Structure**

```
├── index.html          # Main HTML file
├── styles.css          # All styling
├── puzzle-engine.js    # Core engine logic
├── puzzles.js          # Your puzzle definitions
├── app.js             # App initialization
└── src/img/           # Place your images here
```

## 🧩 **Puzzle Types**

### **Pattern Lock** (Level 1)
- Click dots in sequence to create a pattern
- Submit button to check your answer
- Reset button to clear and try again
- Visual feedback with connecting lines

### **Form Puzzle** (Level 2)
- Multiple input fields (text, number, select)
- Submit button to check answers
- Automatic form reset on wrong answers

### **Combination Puzzle** (Level 3)
- Multiple fields that must all be correct
- Submit button to check the combination

## 🚀 **How to Use**

1. **Add Images**: Place your images in `src/img/` folder
2. **Define Puzzles**: Edit `puzzles.js` to add your levels
3. **Customize**: Modify `styles.css` for your theme
4. **Deploy**: Upload to any web hosting service

## 📱 **Mobile Ready**

- Responsive design
- Touch-friendly interface
- Works on all devices

## 🔧 **Adding New Levels**

In `puzzles.js`, add a new level object:

```javascript
const level4 = {
    title: "Your Level Title",
    story: "Your story text here...",
    images: [
        {
            type: 'url',
            content: 'src/img/your-image.jpg',
            description: 'Image description'
        }
    ],
    puzzle: {
        type: 'form', // or 'pattern', 'input', 'dropdown', 'combination'
        // ... puzzle configuration
    }
};
```

Then add it to the levels array:
```javascript
window.PUZZLE_LEVELS = [level1, level2, level3, level4];
```

## 🎨 **Customization**

- **Colors**: Edit CSS variables in `styles.css`
- **Layout**: Modify the HTML structure in `index.html`
- **Logic**: Extend the engine in `puzzle-engine.js`

## 🌐 **Deployment**

Simply upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting

No build process, no dependencies to install!

---

**That's it!** Simple, clean, and easy to manage. Perfect for creating puzzle hunts without the complexity of modern frameworks.
