import { luckyUsers,USERS } from './users.js'


// const USERS = [
//   {
//     "id": 0,
//     "name": "JesseLD",
//     "balance":100,
//     "lucky":true
//   },
//   {
//     "id": 1,
//     "name": "Riuqy",
//     "balance":100,
//     "lucky":false
//   }
// ]

const LuckyUsers = luckyUsers;
const users = USERS;
const userName = document.querySelector('.username')
const luckyUsersString = document.querySelector('.lp-text')
const btnRocket = document.querySelector('.rocket')
const scroll1 = document.querySelector('.s1')
const scroll2 = document.querySelector('.s2')
const scroll3 = document.querySelector('.s3')
const tip = document.querySelector('.tip')
const userCash= document.querySelector('.cash')
const btnAddCash = document.querySelector('.add')
const btnRemoveCash = document.querySelector('.remove')
const betValue = document.querySelector('.bet-value')
const devStats = document.querySelector('.dev-stats')




const stopTime = 1000;

let uuid = 5
const betInteval = 10

let bet = 0

// let userMoney = users[uuid].balance
let userMoney = 100

let FirstValue = 0;
let changeGameSortValue = false
let chanceOfWin = 40
let randomChanceSortedValue = 0



sortUser()
getUserStats(uuid)
setInterval(sortUser,9200)
// drawDevStats();


const up = document.querySelector('.up')
const down = document.querySelector('.down')

if(up && down) {

  down.addEventListener('click',()=>{
    uuid = 5
    alert(users[uuid].name)
  })

  up.addEventListener('click',()=>{
    uuid = 6
    alert(users[uuid].name)
  })
  
}



function getUserStats(uuid){
  // let stringUserBalance = users[uuid].balance.toString
  // let userBalance = users[uuid].balance.toFixed(2)

  userName.innerText = `Usuário: ${users[uuid].name}`
  userCash.innerText = `R$: ${userMoney.toFixed(2)}`

  if(users[uuid].lucky == true){
    console.log('admin')
    changeGameSortValue = true
  }

  

}

//   btnRocket.addEventListener('mouseenter',(e)=>{
//   console.log('Pressione para iniciar')
//   tip.classList.toggle('show')
//   tip.innerText = `Ajuda, Pressione Para iniciar!`
// })
// btnRocket.addEventListener('mouseout',(e)=>{
//   console.log('sair')
//   tip.classList.toggle('show')
// })

// btnRocket.addEventListener('mouseover',(e)=>{
//   tip.classList.toggle('show')

// })




btnRocket.addEventListener('click',(e)=>{
  setTimeout(()=>{
    console.log('rolling')
    if((bet <= 0) || (bet > userMoney)) return alert("Valor Inválido!") 
    gameChance()
    rollCards(changeGameSortValue)
    // drawDevStats();
    userMoney -= bet.toFixed(2)
    getUserStats(uuid)
    console.log(userMoney)
    
  },40)
})

btnAddCash.addEventListener('click',(e)=>{
  bet += betInteval
  if(bet >= userMoney) bet = userMoney
  betValue.innerText = `R$ ${bet.toFixed(2)}`
})
btnRemoveCash.addEventListener('click',(e)=>{
  bet -= betInteval
  if(bet <= 0) bet = 0
  betValue.innerText = `R$ ${bet.toFixed(2)}`
})


function gameChance(){
  
  randomChanceSortedValue = Math.random() * 100
  console.log(randomChanceSortedValue)

  if(randomChanceSortedValue < chanceOfWin){
    changeGameSortValue = true
  }else{
    changeGameSortValue = false
  }
  


}

function scrollFirstValue(){
  return new Promise((resolve)=>{

    setTimeout(()=>{
      const IntervalId = setInterval(generateRandom,100);

      function stopFun(){
        clearInterval(IntervalId);
      }
      setTimeout(stopFun,stopTime)
    
      function generateRandom(){
        let value = Math.round(Math.random()*9)
        scroll1.innerText = `${value}`
        FirstValue = value;

      }

      resolve();
    },0)
  })
}

function scrollSecondValue(){
  return new Promise((resolve)=>{

    setTimeout(()=>{
      const IntervalId = setInterval(generateRandom,100);

      function stopFun(){
        clearInterval(IntervalId);
      }
      setTimeout(stopFun,stopTime)
    
      function generateRandom(){
        let value = Math.round(Math.random()*9)
        scroll2.innerText = `${value}`
      }
      resolve();
  },500)

  })
}

function scrollThirdValue(){
  return new Promise((resolve)=>{

    setTimeout(()=>{

      const IntervalId = setInterval(generateRandom,100);

      function stopFun(){
        clearInterval(IntervalId);
      }
      setTimeout(stopFun,stopTime)
    
      function generateRandom(){
        let value = Math.round(Math.random()*9)
        scroll3.innerText = `${value}`
      }
      resolve();
  },1000)

  })
}



function changeGameStats(changeGame){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      if(changeGame == true){
        scroll1.innerText = FirstValue
        scroll2.innerText = FirstValue
        scroll3.innerText = FirstValue
        
        let winMoney = 0;
        if(FirstValue <= 1){

          winMoney = (bet * 2 ) 
        }else{

          winMoney = ((bet * FirstValue ))
        }
        userMoney += winMoney
        console.log("Ganhou: "+winMoney)
        getUserStats(uuid)
        alert("Você Ganhou!")
      }
      resolve();
  },1001)

  })
}


async function rollCards(condition){
  let changeGame = condition || false
  await scrollFirstValue();
  await scrollSecondValue();
  await scrollThirdValue();
  await changeGameStats(changeGame);

}




function sortUser(){
  let sorted = Math.round(Math.random()*LuckyUsers.length);
  let value = Math.round(Math.random()*32);
  let sortedName = LuckyUsers[sorted]

  luckyUsersString.innerText = `${sortedName} acabou de ganhar R$ ${value},00!`

}


function drawDevStats() {
  devStats.style.display = 'flex'
  devStats.innerHTML = `
    <span class="dev-menu-name">Dev Stats </span>
    <span class="dev-text"><span class="dev-title">ChancePercent:</span> ${chanceOfWin}%</span>
    <span class="dev-text"><span class="dev-title">LastSortedValue:</span> ${randomChanceSortedValue}
    
    <div class="dev-buttons">
      <button class="up">UP</button>
      <button class="down">DOWN</button>
    </div>
    </span>




 `



}
