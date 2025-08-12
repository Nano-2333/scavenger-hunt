// Puzzle Hunt Engine
class PuzzleEngine {
    constructor() {
        this.currentLevel = 0;
        this.levels = [];
        this.startTime = null;
        
        // DOM elements
        this.elements = {
            screens: {
                puzzle: document.getElementById('puzzle-screen')
            },
            level: document.getElementById('current-level'),
            progress: document.getElementById('progress-text'),
            storyTitle: document.getElementById('story-title'),
            storyText: document.getElementById('story-text'),
            imageContainer: document.getElementById('image-container'),
            puzzleContainer: document.getElementById('puzzle-container'),
            prevBtn: document.getElementById('prev-level'),
            nextBtn: document.getElementById('prev-level'),
            navTask: document.getElementById('nav-task'),
            navPassword: document.getElementById('nav-password'),
            navSubmit: document.getElementById('nav-submit')
        };
        
        this.bindEvents();
    }

    // Add levels to the engine
    addLevel(level) {
        this.levels.push(level);
    }

    // Start the hunt
    startHunt() {
        this.currentLevel = 0;
        this.startTime = Date.now();
        this.showScreen('puzzle');
        this.loadLevel(0);
    }

    // Load a specific level
    loadLevel(levelIndex) {
        if (levelIndex < 0 || levelIndex >= this.levels.length) return;
        
        const level = this.levels[levelIndex];
        this.currentLevel = levelIndex;
        
        // Update UI
        this.elements.level.textContent = levelIndex + 1;
        this.elements.progress.textContent = `${levelIndex + 1}/${this.levels.length}`;
        this.elements.storyTitle.textContent = level.title;
        this.elements.storyText.textContent = level.story;
        
        // Load images
        this.loadImages(level.images);
        
        // Load puzzle
        this.loadPuzzle(level.puzzle);
        
        // Update navigation
        this.updateNavigation();
    }

    // Load images for the level
    loadImages(images) {
        this.elements.imageContainer.innerHTML = '';
        
        if (!images || images.length === 0) {
            this.elements.imageContainer.innerHTML = '<p style="color: #666; font-style: italic;">No images for this level</p>';
            return;
        }
        
        images.forEach(image => {
            if (image.type === 'url') {
                const img = document.createElement('img');
                img.src = image.content;
                img.alt = image.description || 'Puzzle clue';
                this.elements.imageContainer.appendChild(img);
            } else if (image.type === 'emoji') {
                const div = document.createElement('div');
                div.style.fontSize = '4rem';
                div.style.margin = '10px';
                div.textContent = image.content;
                div.title = image.description || 'Puzzle clue';
                this.elements.imageContainer.appendChild(div);
            }
        });
    }

    // Load puzzle interface
    loadPuzzle(puzzle) {
        this.elements.puzzleContainer.innerHTML = '';
        
        if (!puzzle) {
            this.elements.puzzleContainer.innerHTML = '<p style="color: #666; font-style: italic;">No puzzle for this level</p>';
            return;
        }
        
        // Create puzzle based on type
        switch (puzzle.type) {
            case 'pattern':
                this.createPatternPuzzle(puzzle);
                break;
            case 'form':
                this.createFormPuzzle(puzzle);
                break;
            case 'input':
                this.createInputPuzzle(puzzle);
                break;
            case 'dropdown':
                this.createDropdownPuzzle(puzzle);
                break;
            case 'combination':
                this.createCombinationPuzzle(puzzle);
                break;
            case 'button':
                this.createButtonPuzzle(puzzle);
                break;
            case 'endscreen':
                this.createEndScreen(puzzle);
                break;
            default:
                this.elements.puzzleContainer.innerHTML = '<p style="color: #666; font-style: italic;">Unknown puzzle type</p>';
        }
    }

    // Create pattern lock puzzle
    createPatternPuzzle(puzzle) {
        const container = document.createElement('div');
        container.className = 'pattern-lock';
        
        // Create 3x3 grid of dots
        for (let i = 0; i < 9; i++) {
            const dotElement = document.createElement('div');
            dotElement.className = 'pattern-dot';
            dotElement.dataset.index = i;
            container.appendChild(dotElement);
        }
        
        this.elements.puzzleContainer.appendChild(container);
        
        // Add instructions
        const instructions = document.createElement('div');
        instructions.style.marginTop = '20px';
        instructions.style.textAlign = 'center';
        instructions.style.color = '#666';
        instructions.innerHTML = `<p><strong>Instructions:</strong> ${puzzle.instructions}</p>`;
        this.elements.puzzleContainer.appendChild(instructions);
        
        // Add buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit Pattern';
        submitBtn.addEventListener('click', () => this.checkPatternAnswer(puzzle));
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-secondary';
        resetBtn.textContent = 'Reset';
        resetBtn.addEventListener('click', () => this.resetPattern(puzzle));
        
        buttonContainer.appendChild(submitBtn);
        buttonContainer.appendChild(resetBtn);
        this.elements.puzzleContainer.appendChild(buttonContainer);
        
        // Initialize pattern lock functionality
        this.initPatternLock(container, puzzle);
    }

    // Initialize pattern lock with click functionality
    initPatternLock(container, puzzle) {
        // Click to select dots
        container.addEventListener('click', (e) => {
            const dot = e.target.closest('.pattern-dot');
            if (dot) {
                const index = parseInt(dot.dataset.index);
                if (!puzzle.selectedDots.includes(index)) {
                    puzzle.selectedDots.push(index);
                    dot.classList.add('selected');
                    this.drawPatternLines(container, puzzle.selectedDots);
                }
            }
        });
    }
    

    
    // Draw lines between selected dots
    drawPatternLines(container, path) {
        // Remove existing lines
        container.querySelectorAll('.pattern-line').forEach(line => line.remove());
        
        // Draw new lines
        for (let i = 0; i < path.length - 1; i++) {
            const currentDot = container.querySelector(`[data-index="${path[i]}"]`);
            const nextDot = container.querySelector(`[data-index="${path[i + 1]}"]`);
            
            if (currentDot && nextDot) {
                const line = document.createElement('div');
                line.className = 'pattern-line';
                
                const currentRect = currentDot.getBoundingClientRect();
                const nextRect = nextDot.getBoundingClientRect();
                
                const containerRect = container.getBoundingClientRect();
                
                const x1 = currentRect.left + currentRect.width / 2 - containerRect.left;
                const y1 = currentRect.top + currentRect.height / 2 - containerRect.top;
                const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
                const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;
                
                const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.transformOrigin = '0 50%';
                
                container.appendChild(line);
            }
        }
    }

    // Check pattern answer
    checkPatternAnswer(puzzle) {
        const isCorrect = puzzle.selectedDots.length === puzzle.correctPattern.length &&
                         puzzle.selectedDots.every((dot, index) => 
                             dot === puzzle.correctPattern[index]
                         );
        
        if (isCorrect) {
            this.showSuccess('Pattern correct!');
            // Disable submit button to prevent multiple clicks
            const submitBtn = document.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => this.nextLevel(), 1500);
        } else {
            this.showError('Pattern incorrect. Try again.');
            setTimeout(() => this.resetPattern(puzzle), 1000);
        }
    }

    // Reset pattern
    resetPattern(puzzle) {
        puzzle.selectedDots = [];
        document.querySelectorAll('.pattern-dot').forEach(dot => {
            dot.classList.remove('selected');
        });
        // Clear pattern lines
        document.querySelectorAll('.pattern-line').forEach(line => line.remove());
    }

    // Create form puzzle
    createFormPuzzle(puzzle) {
        const form = document.createElement('form');
        form.className = 'form-container';
        
        puzzle.fields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            
            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                input.id = field.id;
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = field.placeholder || 'Select...';
                input.appendChild(defaultOption);
                
                // Add options if they exist, otherwise add common options
                if (field.options) {
                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.text;
                        input.appendChild(optionElement);
                    });
                } else {
                    // Add common options based on field ID
                    const commonOptions = this.getCommonOptions(field.id);
                    commonOptions.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.text;
                        input.appendChild(optionElement);
                    });
                }
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                input.placeholder = field.placeholder || '';
            }
            
            group.appendChild(label);
            group.appendChild(input);
            form.appendChild(group);
        });
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit Answer';
        form.appendChild(submitBtn);
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkFormAnswer(puzzle);
        });
        
        this.elements.puzzleContainer.appendChild(form);
    }

    // Check form answer
    checkFormAnswer(puzzle) {
        const answers = {};
        puzzle.fields.forEach(field => {
            const input = document.getElementById(field.id);
            answers[field.id] = input.value;
        });
        
        const isCorrect = puzzle.checkAnswer(answers);
        
        if (isCorrect) {
            this.showSuccess('Correct answer!');
            // Disable submit button to prevent multiple clicks
            const submitBtn = document.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => this.nextLevel(), 1500);
        } else {
            this.showError('Incorrect answer. Try again.');
            // Reset form
            puzzle.fields.forEach(field => {
                const input = document.getElementById(field.id);
                input.value = '';
            });
        }
    }

    // Create input puzzle
    createInputPuzzle(puzzle) {
        const container = document.createElement('div');
        container.className = 'form-container';
        
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.htmlFor = 'answer-input';
        label.textContent = puzzle.question;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'answer-input';
        input.placeholder = puzzle.placeholder || 'Enter your answer...';
        
        group.appendChild(label);
        group.appendChild(input);
        container.appendChild(group);
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', () => {
            this.checkInputAnswer(puzzle, input.value);
        });
        
        container.appendChild(submitBtn);
        this.elements.puzzleContainer.appendChild(container);
    }

    // Check input answer
    checkInputAnswer(puzzle, answer) {
        const isCorrect = puzzle.checkAnswer(answer.toLowerCase());
        
        if (isCorrect) {
            this.showSuccess('Correct answer!');
            // Disable submit button to prevent multiple clicks
            const submitBtn = document.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => this.nextLevel(), 1500);
        } else {
            this.showError('Incorrect answer. Try again.');
            document.getElementById('answer-input').value = '';
        }
    }

    // Create dropdown puzzle
    createDropdownPuzzle(puzzle) {
        const container = document.createElement('div');
        container.className = 'form-container';
        
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.htmlFor = 'answer-select';
        label.textContent = puzzle.question;
        
        const select = document.createElement('select');
        select.id = 'answer-select';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an answer...';
        select.appendChild(defaultOption);
        
        puzzle.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
        
        group.appendChild(label);
        group.appendChild(select);
        container.appendChild(group);
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', () => {
            this.checkDropdownAnswer(puzzle, select.value);
        });
        
        container.appendChild(submitBtn);
        this.elements.puzzleContainer.appendChild(container);
    }

    // Check dropdown answer
    checkDropdownAnswer(puzzle, answer) {
        const isCorrect = puzzle.checkAnswer(answer);
        
        if (isCorrect) {
            this.showSuccess('Correct answer!');
            // Disable submit button to prevent multiple clicks
            const submitBtn = document.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => this.nextLevel(), 1500);
        } else {
            this.showError('Incorrect answer. Try again.');
            document.getElementById('answer-select').value = '';
        }
    }

    // Create combination puzzle
    createCombinationPuzzle(puzzle) {
        const container = document.createElement('div');
        container.className = 'form-container';
        
        puzzle.fields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            
            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                input.id = field.id;
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = field.placeholder || 'Select...';
                input.appendChild(defaultOption);
                
                // Add options if they exist, otherwise add common options
                if (field.options) {
                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.text;
                        input.appendChild(optionElement);
                    });
                } else {
                    // Add common options based on field ID
                    const commonOptions = this.getCommonOptions(field.id);
                    commonOptions.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.text;
                        input.appendChild(optionElement);
                    });
                }
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                input.placeholder = field.placeholder || '';
            }
            
            group.appendChild(label);
            group.appendChild(input);
            container.appendChild(group);
        });
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', () => {
            this.checkCombinationAnswer(puzzle);
        });
        
        container.appendChild(submitBtn);
        this.elements.puzzleContainer.appendChild(container);
    }

    // Check combination answer
    checkCombinationAnswer(puzzle) {
        const answers = {};
        puzzle.fields.forEach(field => {
            const input = document.getElementById(field.id);
            answers[field.id] = input.value;
        });
        
        const isCorrect = puzzle.checkAnswer(answers);
        
        if (isCorrect) {
            this.showSuccess('Correct combination!');
            // Disable submit button to prevent multiple clicks
            const submitBtn = document.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            setTimeout(() => this.nextLevel(), 1500);
        } else {
            this.showError('Incorrect combination. Try again.');
            puzzle.fields.forEach(field => {
                const input = document.getElementById(field.id);
                input.value = '';
            });
        }
    }

    // Create button-only puzzle
    createButtonPuzzle(puzzle) {
        const container = document.createElement('div');
        container.className = 'form-container';
        
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-primary';
        button.textContent = puzzle.buttonText || 'Continue';
        button.addEventListener('click', () => {
            this.showSuccess('Continuing...');
            setTimeout(() => this.nextLevel(), 1500);
        });
        
        container.appendChild(button);
        this.elements.puzzleContainer.appendChild(container);
    }

    // Create end screen
    createEndScreen(puzzle) {
        const container = document.createElement('div');
        container.className = 'form-container';
        container.style.textAlign = 'center';
        
        // Main message
        const message = document.createElement('h2');
        message.textContent = puzzle.message || 'Congratulations!';
        message.style.color = '#4CAF50';
        message.style.marginBottom = '20px';
        container.appendChild(message);
        
        // Stats if enabled
        if (puzzle.showStats) {
            const stats = document.createElement('div');
            stats.style.marginBottom = '20px';
            stats.style.padding = '15px';
            stats.style.backgroundColor = '#f5f5f5';
            stats.style.borderRadius = '8px';
            
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(timeSpent / 60);
            const seconds = timeSpent % 60;
            
            stats.innerHTML = `
                <p><strong>Total Time:</strong> ${minutes}m ${seconds}s</p>
                <p><strong>Levels Completed:</strong> ${this.levels.length}</p>
            `;
            container.appendChild(stats);
        }
        
        // You can customize this further by editing the puzzle object in puzzles.js
        // Add any additional content you want to display on the end screen
        
        this.elements.puzzleContainer.appendChild(container);
    }

    // Navigation methods
    nextLevel() {
        if (this.currentLevel < this.levels.length - 1) {
            this.loadLevel(this.currentLevel + 1);
        } else {
            // Game completed - just show a success message
            this.showSuccess('Congratulations! You completed all levels!');
        }
    }

    prevLevel() {
        if (this.currentLevel > 0) {
            this.loadLevel(this.currentLevel - 1);
        }
    }

    // Update navigation buttons
    updateNavigation() {
        this.elements.prevBtn.style.display = this.currentLevel > 0 ? 'block' : 'none';
        this.elements.nextBtn.style.display = 'none'; // Only show after puzzle completion
    }

    // Show different screens
    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.elements.screens[screenName].classList.add('active');
    }



    // Show success/error messages
    showSuccess(message) {
        this.showFeedback(message, 'success');
    }

    showError(message) {
        this.showFeedback(message, 'error');
    }

    showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        
        this.elements.puzzleContainer.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    // Get common options for select fields
    getCommonOptions(fieldId) {
        // Handle specific field IDs for better control
        if (fieldId === 'gateColor1' || fieldId === 'gateColor2' || fieldId === 'gateColor3') {
            return [
                { value: 'red', text: 'Red' },
                { value: 'blue', text: 'Blue' },
                { value: 'green', text: 'Green' },
                { value: 'yellow', text: 'Yellow' },
                { value: 'orange', text: 'Orange' },
                { value: 'purple', text: 'Purple' },
                { value: 'pink', text: 'Pink' },
                { value: 'black', text: 'Black' },
                { value: 'white', text: 'White' },
                { value: 'grey', text: 'Grey' }
            ];
        } else if (fieldId === 'sunRays1' || fieldId === 'sunRays2') {
            return [
                { value: '1', text: '1' },
                { value: '2', text: '2' },
                { value: '3', text: '3' },
                { value: '4', text: '4' },
                { value: '5', text: '5' },
                { value: '6', text: '6' },
                { value: '7', text: '7' },
                { value: '8', text: '8' },
                { value: '9', text: '9' },
                { value: '10', text: '10' }
            ];
        } else if (fieldId === 'childAnswer1') {
            return [
                { value: 'A', text: 'A' },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' },
                { value: 'D', text: 'D' },
                { value: 'E', text: 'E' },
                { value: 'F', text: 'F' }
            ];
        } else if (fieldId === 'childAnswer2' || fieldId === 'childAnswer3') {
            return [
                { value: 'red', text: 'Red' },
                { value: 'blue', text: 'Blue' },
                { value: 'green', text: 'Green' },
                { value: 'yellow', text: 'Yellow' },
                { value: 'orange', text: 'Orange' },
                { value: 'purple', text: 'Purple' },
                { value: 'pink', text: 'Pink' },
                { value: 'black', text: 'Black' },
                { value: 'white', text: 'White' },
                { value: 'grey', text: 'Grey' }
            ];
        } else if (fieldId === 'activity1') {
            return [
                { value: 'go', text: 'Go' },
                { value: 'come', text: 'Come' },
                { value: 'no', text: 'No' }
            ];
        } else if (fieldId === 'activity2') {
            return [
                { value: 'swimming', text: 'Swimming' },
                { value: 'diving', text: 'Diving' },
                { value: 'running', text: 'Running' },
                { value: 'fishing', text: 'Fishing' },
                { value: 'sleeping', text: 'Sleeping' },
                { value: 'walking', text: 'Walking' },
                { value: 'skating', text: 'Skating' }
            ];
        } else if (fieldId === 'watching1' || fieldId === 'watching2' || fieldId === 'watching3' || fieldId === 'watching4') {
            return [
                { value: 'fun', text: 'Fun' },
                { value: 'nature', text: 'Nature' },
                { value: 'animal', text: 'Animal' },
                { value: 'history', text: 'History' },
            ];
        } else if (fieldId === 'realAnswer1') {
            return [
                { value: 'A', text: 'A' },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' },
                { value: 'D', text: 'D' },
                { value: 'E', text: 'E' },
                { value: 'F', text: 'F' }
            ];
        } else if (fieldId === 'realAnswer2') {
            return [
                { value: 'red', text: 'Red' },
                { value: 'blue', text: 'Blue' },
                { value: 'green', text: 'Green' },
                { value: 'yellow', text: 'Yellow' },
                { value: 'orange', text: 'Orange' },
                { value: 'purple', text: 'Purple' },
                { value: 'pink', text: 'Pink' },
                { value: 'black', text: 'Black' },
                { value: 'white', text: 'White' },
                { value: 'grey', text: 'Grey' }
            ];
        } else if (fieldId === 'word1' || fieldId === 'word2' || fieldId === 'word3' || 
                   fieldId === 'word4') {
            return [
                { value: 'horse', text: 'Horse' },
                { value: 'person', text: 'Person' },
                { value: 'dress', text: 'Dress' },
                { value: 'spike', text: 'Spike' },
                { value: 'door', text: 'Door' },
                { value: 'large wheel', text: 'Large Wheel' },
                { value: 'jug', text: 'Jug' },
                { value: 'cup', text: 'Cup' }
            ];
        } else if (fieldId === 'memoryNumber') {
            return [
                { value: '1', text: '1' },
                { value: '2', text: '2' },
                { value: '3', text: '3' },
                { value: '4', text: '4' },
                { value: '5', text: '5' },
                { value: '6', text: '6' },
                { value: '7', text: '7' },
                { value: '8', text: '8' },
                { value: '9', text: '9' },
                { value: '10', text: '10' }
            ];
        } else if (fieldId === 'memoryObject') {
            return [
                { value: 'leaves', text: 'Leaves' },
                { value: 'tree', text: 'Tree' },
                { value: 'flower', text: 'Flower' },
                { value: 'rock', text: 'Rock' },
                { value: 'water', text: 'Water' },
                { value: 'sun', text: 'Sun' },
                { value: 'moon', text: 'Moon' },
                { value: 'star', text: 'Star' }
            ];
        } else if (fieldId === 'number') {
            return [
                { value: 'A', text: 'A' },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' },
                { value: 'D', text: 'D' }
            ];
        }
        
        // Fallback for any unmatched patterns
        if (fieldId.toLowerCase().includes('color')) {
            return [
                { value: 'red', text: 'Red' },
                { value: 'blue', text: 'Blue' },
                { value: 'green', text: 'Green' },
                { value: 'yellow', text: 'Yellow' },
                { value: 'orange', text: 'Orange' },
                { value: 'purple', text: 'Purple' },
                { value: 'pink', text: 'Pink' },
                { value: 'black', text: 'Black' },
                { value: 'white', text: 'White' },
                { value: 'grey', text: 'Grey' }
            ];
        } else if (fieldId.toLowerCase().includes('number') || fieldId.toLowerCase().includes('ray')) {
            return [
                { value: '1', text: '1' },
                { value: '2', text: '2' },
                { value: '3', text: '3' },
                { value: '4', text: '4' },
                { value: '5', text: '5' },
                { value: '6', text: '6' },
                { value: '7', text: '7' },
                { value: '8', text: '8' },
                { value: '9', text: '9' },
                { value: '10', text: '10' }
            ];
        }
        
        // Default fallback
        return [
            { value: 'option1', text: 'Option 1' },
            { value: 'option2', text: 'Option 2' },
            { value: 'option3', text: 'Option 3' },
            { value: 'option4', text: 'Option 4' },
            { value: 'option5', text: 'Option 5' }
        ];
    }

    // Navigate to specific level
    navigateToLevel(taskNumber, password) {
        if (password === '5201314') {
            const levelIndex = taskNumber - 1;
            if (levelIndex >= 0 && levelIndex < this.levels.length) {
                this.loadLevel(levelIndex);
                this.showSuccess(`Jumped to level ${taskNumber}!`);
            } else {
                this.showError('Invalid task number!');
            }
        } else {
            this.showError('Incorrect password!');
        }
    }

    // Bind event listeners
    bindEvents() {
        this.elements.prevBtn.addEventListener('click', () => this.prevLevel());
        this.elements.nextBtn.addEventListener('click', () => this.nextLevel());
        this.elements.navSubmit.addEventListener('click', () => {
            const taskNumber = parseInt(this.elements.navTask.value);
            const password = this.elements.navPassword.value;
            if (taskNumber && password) {
                this.navigateToLevel(taskNumber, password);
                this.elements.navTask.value = '';
                this.elements.navPassword.value = '';
            }
        });
    }
}

// Make engine globally available
window.PuzzleEngine = PuzzleEngine;

