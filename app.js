// Main App - Initializes the puzzle engine
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the puzzle engine
    const engine = new PuzzleEngine();
    
    // Add all puzzle levels
    window.PUZZLE_LEVELS.forEach(level => {
        engine.addLevel(level);
    });
    
    // Start the hunt immediately
    engine.startHunt();
    
    console.log('🎉 Puzzle Hunt Engine loaded successfully!');
    console.log(`📱 ${engine.levels.length} levels ready to play`);
});
