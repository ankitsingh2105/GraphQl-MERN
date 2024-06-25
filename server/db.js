const games = [
    { id: '1', title: 'The Legend of Zelda', platform: ['Nintendo Switch', 'Wii U', 'Nintendo 3DS', 'GameCube'] },
    { id: '2', title: 'God of War', platform: ['PlayStation 4', 'PlayStation 5', 'PC', 'PlayStation 3'] },
    { id: '3', title: 'Halo', platform: ['Xbox One', 'Xbox 360', 'PC', 'Xbox Series X'] },
    { id: '4', title: 'Minecraft', platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'] }
];

const authors = [
    { id: '1', name: 'John Doe', verified: true },
    { id: '2', name: 'Jane Smith', verified: false },
    { id: '3', name: 'Emily Johnson', verified: true },
    { id: '4', name: 'Michael Brown', verified: false }
];

const reviews = [
    { id: '1', name: 'Alice', content: 'Amazing game with stunning visuals!', authorId: '1', gameId: '1' },
    { id: '2', name: 'Bob', content: 'Great gameplay and storyline.', authorId: '2', gameId: '2' },
    { id: '3', name: 'Charlie', content: 'Engaging and fun for all ages.', authorId: '3', gameId: '3' },
    { id: '4', name: 'David', content: 'A must-play for everyone!', authorId: '4', gameId: '4' }
];

module.exports = { games, authors, reviews };
