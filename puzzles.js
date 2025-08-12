// Puzzle Definitions - Add your puzzles here!

// Level 1: Phone Unlock Pattern
const level1 = {
    title: "Lost Memories - The Phone Discovery",
    story: "After escaping from that mysterious escape room, you found something unexpected... An old phone, lying on the ground as if it was waiting for you. Was it fate? The phone's wallpaper shows a familiar store logo, but it's locked. You need to unlock it to discover what secrets it holds...",
    images: [
        {
            type: 'url',
            content: 'src/img/green-party.jpg',
            description: 'A mysterious phone waiting to be unlocked'
        }
    ],
    puzzle: {
        type: 'pattern',
        instructions: "Tap the buttons of your path one by one",
        correctPattern: [4, 2, 5, 8, 7], // Middle, top-right, right-mid, bottom-right, middle-bottom
        selectedDots: []
    }
};

// Level 2: Kuromi's Question
const level2 = {
    title: "Kuromi's Welcome",
    story: "The phone unlocks with a satisfying click! The wallpaper changes to show Kuromi eating ice cream. She looks at you with a friendly smile and asks a question...",
    images: [
        {
            type: 'url',
            content: 'src/img/kuromi-unlock.jpg',
            description: 'What is are my favourite number and color?'
        }
    ],
    puzzle: {
        type: 'form',
        fields: [
            {
                id: 'favoriteNumber',
                label: "What's Kuromi's favorite number?",
                type: 'number',
                placeholder: 'Enter a number...'
            },
            {
                id: 'favoriteColor',
                label: "What's Kuromi's favorite color?",
                type: 'select',
                options: [
                    { value: 'pink', text: 'Pink' },
                    { value: 'purple', text: 'Purple' },
                    { value: 'black', text: 'Black' },
                    { value: 'white', text: 'White' },
                    { value: 'red', text: 'Red' },
                    { value: 'blue', text: 'Blue' }
                ]
            }
        ],
        checkAnswer: function(answers) {
            return answers.favoriteNumber === '31' && answers.favoriteColor.toLowerCase() === 'pink';
        }
    }
};

// Level 3: Memory Flash Puzzle
const level3 = {
    title: "Memory Connections",
    story: "Kuromi is amazed that you got her favorite number and color right! While you were solving that puzzle, she saw something flash... It looks like 'Coupled eights' next to escalators... What could that mean?",
    images: [
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'memoryNumber',
                label: "What number do you see in the memory?",
                type: 'select',
                placeholder: 'Select number...'
            },
            {
                id: 'memoryObject',
                label: "What object do you see in the memory?",
                type: 'select',
                placeholder: 'Select object...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.memoryNumber === '4' && answers.memoryObject.toLowerCase() === 'leaves';
        }
    }
};

// Level 4: Colors Puzzle
const level4 = {
    title: "Colors... What Could It Mean?",
    story: "The phone screen flickers. Kuromi says she saw something from your memories... leaves.. four... did you ever leave somewhere at four? Colors... what could it mean? Is there an correct order?",
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'color1',
                label: "First color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'color2',
                label: "Second color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'color3',
                label: "Third color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'color4',
                label: "Fourth color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'color5',
                label: "Fifth color:",
                type: 'select',
                placeholder: 'Select color...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.color1.toLowerCase() === 'orange' && 
                   answers.color2.toLowerCase() === 'white' && 
                   answers.color3.toLowerCase() === 'green' && 
                   answers.color4.toLowerCase() === 'white' && 
                   answers.color5.toLowerCase() === 'red';
        }
    }
};

// Level 5: More Memories
const level5 = {
    title: "More Memories?",
    story: "Kuromi slowly fades. Instead, a faint image appears. Is it your childhood? Where would this be?",
    images: [
        {
            type: 'url',
            content: 'src/img/uob.png',
            description: 'Childhood puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'memoryNumber1',
                label: "First number (red):",
                type: 'number',
                placeholder: 'Enter number...'
            },
            {
                id: 'memoryNumber2',
                label: "Second number (blue):",
                type: 'number',
                placeholder: 'Enter number...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.memoryNumber1 === '5' && answers.memoryNumber2 === '90';
        }
    }
};

// Level 6: Number Input
const level6 = {
    title: "Tired",
    story: "You feel tired as you traverse down memories. Caffeine?",
    images: [
        {
            type: 'url',
            content: 'src/img/coffee.png',
            description: 'Coffee puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "Enter the number:",
        placeholder: "Enter the number...",
        checkAnswer: function(answer) {
            return answer.toLowerCase() === '520';
        }
    }
};

// Level 7: Gate with Missing Colors
const level7 = {
    title: "The Gate",
    story: "A gate appears within your memories. 3 missing colors needed to open it. Which colors will unlock the way forward?",
    images: [
        {
            type: 'url',
            content: 'src/img/MUJI.png',
            description: 'puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'gateColor1',
                label: "Leftmost missing color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'gateColor2',
                label: "Middle missing color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'gateColor3',
                label: "Rightmost missing color:",
                type: 'select',
                placeholder: 'Select color...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.gateColor1.toLowerCase() === 'grey' && 
                   answers.gateColor2.toLowerCase() === 'pink' && 
                   answers.gateColor3.toLowerCase() === 'black';
        }
    }
};

// Level 8: Sun Rays
const level8 = {
    title: "The First Drawings",
    story: "Is this what the first drawings looked like? Why are there two suns? Is that a bunny? Something's not right... That's it! There are no sunrays! How many rays shall we fill in?",
    images: [
        {
            type: 'url',
            content: 'src/img/sun.png',
            description: 'Sun puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'sunRays1',
                label: "Rays of the first sun:",
                type: 'select',
                placeholder: 'Select number...'
            },
            {
                id: 'sunRays2',
                label: "Rays of the second sun:",
                type: 'select',
                placeholder: 'Select number...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.sunRays1 === '7' && answers.sunRays2 === '7';
        }
    }
};

// Level 9: Child Feelings
const level9 = {
    title: "Child Feelings",
    story: "The sun shines brightly. Why did it dim? Was it... representing your childness and pureity? Please dont let it fade. Is there still a bit of childness left? The question seems to probe at something deeper within. When's the last time you played with a toy?",
    images: [
        {
            type: 'url',
            content: 'src/img/toys.png',
            description: 'Puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        instructions: "What could this mean... some sort of a... posture?",
        fields: [
            {
                id: 'childAnswer1',
                label: "What's the pose?:",
                type: 'select',
                placeholder: 'Select answer...'
            },
            {
                id: 'childAnswer2',
                label: "Upper color:",
                type: 'select',
                placeholder: 'Select color...'
            },
            {
                id: 'childAnswer3',
                label: "Lower color:",
                type: 'select',
                placeholder: 'Select color...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.childAnswer1 === 'C' && 
                   answers.childAnswer2.toLowerCase() === 'red' && 
                   answers.childAnswer3.toLowerCase() === 'blue';
        }
    }
};

// Level 10: Go Fishing
const level10 = {
    title: "Old Man",
    story: "As you feel your memories slowly fade, you see a man in the distance, next to the dock. He's old. The scene blurs into abstract art as he sees you. 'Want to see what's important to you?' he asks. 'But first, can you help me? I forgot what I was doing here...'",
    images: [
        {
            type: 'url',
            content: 'src/img/overlay.png',
            description: 'Overaly puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'activity1',
                label: "First word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'activity2',
                label: "Second word:",
                type: 'select',
                placeholder: 'Select word...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.activity1.toLowerCase() === 'no' && answers.activity2.toLowerCase() === 'fishing';
        }
    }
};

// Level 11: Water Memory (No Puzzle)
const level11 = {
    title: "Water Memory",
    story: "The old man suddenly pushes you. When you open your eyes again, you seemed to be submerged. Up is down. Down is up. Did we... fall into the water? Let's go down the stairs. The memory seems to lead somewhere deeper.",
    images: [
        {
            type: 'emoji',
            content: '💧',
            description: 'Water memory'
        }
    ],
    puzzle: {
        type: 'button',
        instructions: "Do not lose yourself, to the reflections",
        buttonText: "Continue"
    }
};

// Level 12: FILA Kids
const level12 = {
    title: "The Brand",
    story: "An image appears. KID2..? What could that mean? Is it a brand? ",
    images: [
        {
            type: 'url',
            content: 'src/img/kid.png',
            description: 'puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "What is this?",
        placeholder: "Enter the brand name...",
        checkAnswer: function(answer) {
            return answer.toLowerCase() === 'fila kids';
        }
    }
};

// Level 13: Food Color
const level13 = {
    title: "Hunger",
    story: "As you go further down in the water from the kid clothing store, you feel hungry. If only there was a republic for that. You always thought there were countries with unlimited food to eat. Anyways, What color is the food?",
    images: [
        {
            type: 'emoji',
            content: '🍽️',
            description: 'Food puzzle'
        }
    ],
    puzzle: {
        type: 'dropdown',
        question: "What color is the food?",
        options: [
            { value: 'red', text: 'Red' },
            { value: 'blue', text: 'Blue' },
            { value: 'green', text: 'Green' },
            { value: 'yellow', text: 'Yellow' },
            { value: 'purple', text: 'Purple' },
            { value: 'orange', text: 'Orange' }
        ],
        checkAnswer: function(answer) {
            return answer.toLowerCase() === 'purple';
        }
    }
};

// Level 14: Eyes Watching
const level14 = {
    title: "Eyes Watching",
    story: "Something's watching. You feel your childness and pureness fade. Your sensations return to you. Singapore is the current chapter. But why do I feel observed? Am I in a glass container? What is here?",
    images: [
        {
            type: 'emoji',
            content: '👁️',
            description: 'Watching eyes'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'watching1',
                label: "First word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'watching2',
                label: "Second word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'watching3',
                label: "Third word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'watching4',
                label: "Fourth word:",
                type: 'select',
                placeholder: 'Select word...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.watching1.toLowerCase() === 'fun' && 
                   answers.watching2.toLowerCase() === 'animal' && 
                   answers.watching3.toLowerCase() === 'nature' &&
                   answers.watching4.toLowerCase() === 'history';
        }
    }
};

// Level 15: Here Again (No Puzzle)
const level15 = {
    title: "Here Again",
    story: "You realize that the lines of reality and memories are blurring. As you go down the stairs in reality, you see a familiar place. Have we been here before? Was it a dream? Is it a distant memory?",
    images: [
        {
            type: 'emoji',
            content: '🔄',
            description: 'Return'
        }
    ],
    puzzle: {
        type: 'button',
        buttonText: "Continue"
    }
};

// Level 16: Which is Real
const level16 = {
    title: "What is Real?",
    story: "What is real? You wonder to yourself as you take the path you believe you have yet to take. Your visions blurs. Is someone hiding the truth? What do these squiggles mean? Which one is real? What color was it? Questions challenges you to distinguish truth from illusion.",
    images: [
        {
            type: 'url',
            content: 'src/img/smiggles.png',
            description: 'puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'realAnswer1',
                label: "First answer:",
                type: 'select',
                placeholder: 'Select answer...'
            },
            {
                id: 'realAnswer2',
                label: "Second answer:",
                type: 'select',
                placeholder: 'Select color...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.realAnswer1 === 'D' && answers.realAnswer2.toLowerCase() === 'red';
        }
    }
};

// Level 17: Orange
const level17 = {
    title: "Orange...",
    story: "The word 'orange' appears on the screen, What could it mean?",
    images: [
        {
            type: 'url',
            content: 'src/img/daiso.png',
            description: 'Daiso puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "What does 'orange' refer to?",
        placeholder: "Enter your answer...",
        checkAnswer: function(answer) {
            return answer.toLowerCase() === 'daiso';
        }
    }
};

// Level 18: Number Range
const level18 = {
    title: "The first date",
    story: "You remember that fateful day. The first date. The first kiss. The first time you knew you were in love. But you werent ready. You remember. 'Am I ready for the next step? You feel your memories rushing back, blurring reality again. The cat that's still not done, the pieces that holds our fashion, and the bag that held love letters. Where are they? What do they add up to?'",
    images: [
        {
            type: 'emoji',
            content: '🔢',
            description: 'Number range puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "Enter the total:",
        placeholder: "Enter a number...",
        checkAnswer: function(answer) {
            const num = parseInt(answer);
            return num >= 64 && num <= 68;
        }
    }
};

// Level 19: Letter and Number
const level19 = {
    title: "Letter and Number",
    story: "That date... Was it good? Was it bad? Did you guys talk about some special things? You wonder to yourself as you take the path downstairs. It's almost time to go home. But before that, something is showing...",
    images: [
        {
            type: 'url',
            content: 'src/img/rina lee.png',
            description: 'Puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'letter',
                label: "Enter the letter:",
                type: 'text',
                placeholder: 'Enter letter...'
            },
            {
                id: 'number',
                label: "Select the answer:",
                type: 'select',
                placeholder: 'Select answer...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.letter.toLowerCase() === 'r' && answers.number === 'B';
        }
    }
};

// Level 20: Four Words
const level20 = {
    title: "Life COACH",
    story: "What is important to you? Is it to be successful? Is it to be happy? Do I take my path, or the path that is COACHed to me? You wonder to yourself. You try to clear your mind. You need to focus on what's here. Person, dress, jug, large wheel... These options... What do they mean?",
    images: [
        {
            type: 'emoji',
            content: '📝',
            description: 'Word selection puzzle'
        }
    ],
    puzzle: {
        type: 'combination',
        fields: [
            {
                id: 'word1',
                label: "First word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'word2',
                label: "Second word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'word3',
                label: "Third word:",
                type: 'select',
                placeholder: 'Select word...'
            },
            {
                id: 'word4',
                label: "Fourth word:",
                type: 'select',
                placeholder: 'Select word...'
            }
        ],
        checkAnswer: function(answers) {
            return answers.word1.toLowerCase() === 'horse' && 
                   answers.word2.toLowerCase() === 'person' && 
                   answers.word3.toLowerCase() === 'door' && 
                   answers.word4.toLowerCase() === 'large wheel';
        }
    }
};

// Level 21: Six Letters
const level21 = {
    title: "Maze",
    story: "Your memories blurs further. Who are you? What is your dream? You don't want to answer. You want to leave. Let's go downstairs. As another blur goes, you find yourself in a maze. What is the correct way out? You hear a voice. Always face forward. Always plan ahead.",
    images: [
        {
            type: 'url',
            content: 'src/img/maze.png',
            description: 'Maze puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "Enter the six letters:",
        placeholder: "Enter the letters...",
        checkAnswer: function(answer) {
            return answer.toLowerCase() === 'flflrf';
        }
    }
};

// Level 22: Keep
const level22 = {
    title: "Backwards",
    story: "You finally understand. The future is forwards. Branching off will only slow you down. But is that really true? What about memories? Maybe you should go back to grab them first. K... what's after that?",
    images: [
        {
            type: 'url',
            content: 'src/img/keep.png',
            description: 'Keep puzzle'
        }
    ],
    puzzle: {
        type: 'input',
        question: "What word do you see?",
        placeholder: "Enter the word...",
        checkAnswer: function(answer) {
            return answer.toLowerCase() === 'keep';
        }
    }
};

// Level 23: End Screen
const level23 = {
    title: "Keep being yourself",
    story: "Keep... being yourself. You hear someone say. Memories, present, future. No one knows. But you have made all the right choices. You have made it to the end. You have made it to the end. Maybe, you can take your memories, and keep going forward. Im proud of you.",
    images: [
        {
            type: 'emoji',
            content: '❤️',
            description: 'Celebration'
        }
    ],
    puzzle: {
        type: 'endscreen',
        message: "You've unlocked all the memories! Well done on completing this journey.",
        showStats: true
    }
};

// Export all levels
window.PUZZLE_LEVELS = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18, level19, level20, level21, level22, level23];
