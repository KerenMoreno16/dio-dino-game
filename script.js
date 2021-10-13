const dino = document.querySelector('.dino'); //chamada API - comandos que podem chamar a qualquer momento
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32) { //32 é o número do SPACO -> Site para saber do keycode = keycode.info
        if(!isJumping){ //verificar se esta pulando ou nao
            jump();
        }
    }
}
function jump(){
    isJumping = true;

    let upInterval = setInterval(() =>{
        if (position >= 150){
            clearInterval(upInterval); //limpa o intervalo

            let downInterval = setInterval(() =>{
                if (position <=0){
                    clearInterval(downInterval); 
                    isJumping = false;
                }else{                                    
                    position -=20;
                    dino.style.bottom = position + 'px';
                }
            }, 20); // descendo 
        } else{
            //subindo
            position += 20;
            dino.style.bottom = position + 'px'; //variavel bottom no CSS que tem o valor 0;
        }
    }, 20);
} // vai ser executado a cada 20 milisegundos

function createCactus(){
    const cactus = document.createElement('div');//usa o js para criar tags html novos
    let cactusPosition = 1000; //posicao na direita
    let randomTime = Math.random() * 6000; 

    if(isGameOver) return;
    
    cactus.classList.add('cactus'); //adicionando uma classe 
    background.appendChild(cactus);//adicionando um filho
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class= "game-over">Fim de jogo</h1>';
        }else{
            cactusPosition -=10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus,randomTime); //recursividade -> chamando os cactus
}

createCactus();
document.addEventListener('keyup', handleKeyUp); //quando soltar a tela