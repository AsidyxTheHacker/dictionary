const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.querySelector('.result');
const sound = document.getElementById('sound');
const soundBtn = document.querySelector('.btn-group > button:nth-child(1)');
const searchBtn = document.getElementById('searchBtn');
const changeBtn = document.querySelector('.btn-group > button:nth-child(2)');
let input = document.getElementById('input');
let startNum = 0;

searchBtn.addEventListener('click', () => {
    startNum = 0;
    fetch(url + input.value).then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.querySelector('.word > h3').innerHTML = data[0].word;
        document.querySelector('.detail p:nth-child(1)').innerHTML = data[0].meanings[startNum].partOfSpeech;
        document.querySelector('.detail p:nth-child(2)').innerHTML = data[0].phonetics[1].text;
        document.querySelector('.definition').innerHTML = data[0].meanings[startNum].definitions[0].definition;
        document.querySelector('.example').innerHTML = data[0].meanings[startNum].definitions[0].example;
        sound.src = data[0].phonetics[startNum].audio;
        input.value = '';

        changeBtn.addEventListener('click', () => {
            if (startNum >= data[0].meanings.length - 1){
                startNum = 0;
            } else {
                startNum++;
            };
            document.querySelector('.definition').innerHTML = data[0].meanings[startNum].definitions[0].definition;
            document.querySelector('.example').innerHTML = data[0].meanings[startNum].definitions[0].example;
            document.querySelector('.detail p:nth-child(1)').innerHTML = data[0].meanings[startNum].partOfSpeech;
        })
    })
    .catch( () => {
        document.querySelector('.word > h3').innerHTML = 'ERROR';
        document.querySelector('.detail p:nth-child(1)').innerHTML = '';
        document.querySelector('.detail p:nth-child(2)').innerHTML = '';
        document.querySelector('.definition').innerHTML = '';
        document.querySelector('.example').innerHTML = '';
        sound.src = '';
        changeBtn.disabled = true;
    })
})

input.addEventListener('keydown', function(e) {
    if(e.key === 'Enter'){
        e.preventDefault;
        searchBtn.click();
    }
})
soundBtn.addEventListener('click', () => {sound.play()})