const cards = ['🤍','💘','🧡','💝','🤍','💘','🧡','💝',];
let gameboard = document.getElementById('gameboard');
let restartbutton = document.getElementById('restartbutton');

let cardArray = [...cards, ...cards]; //duplicate for pairs
let flippedcards = [];
let matchedcards = [];

function shuffle(array){
    return array.sort(()=>0.5 - Math.random());
}

function createcard(content, index){
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = 
    `<div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${content}</div>
        </div>`;
        card.addEventListener('click', () => flipcard(card, content));
        return card;
}

function flipcard(card, symbol){
    if(flippedcards.length<2 && !card.classList.contains('flipped'))
    {
        card.classList.add('flipped');
        flippedcards.push({card, symbol});
        if(flippedcards.length === 2)
        {
            checkmatch();
        }
    }
}

function checkmatch(){
    const [first, second] = flippedcards;
    if(first.symbol === second.symbol)
        {
            first.card.classList.add('matched', 'zoom');
            second.card.classList.add('matched', 'zoom');
            matchedcards.push(first, second);
            flippedcards = [];
            if(matchedcards.length === cardArray.length)
            {
                setTimeout(() => 
                {
                    document.querySelectorAll('.card').forEach(card => 
                    {
                        card.classList.remove('zoom');
                        void card.offsetWidth //force reflow
                        card.classList.add('zoom');
                        card.classList.add('completed'); //optional color change when game completed
                    }
                    );
                }, 500);
            }

        }
        else
        {
            setTimeout(() => 
            {
                first.card.classList.remove('flipped');
                second.card.classList.remove('flipped');
                flippedcards = [];
            }, 800);
        }
}

function restartgame()
{
    gameboard.innerHTML = '';
    flippedcards = [];
    matchedcards = [];
    initgame();
}

function initgame()
{
    let shuffled = shuffle([...cardArray]);
    shuffled.forEach((symbol,index) => 
    {
        const card = createcard(symbol, index);
        gameboard.appendChild(card);
    });
}

restartbutton.addEventListener('click', restartgame);
initgame();