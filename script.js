const apiKey = "ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838"

// getting all live games 


function fetchFromApi(){

    fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${apiKey}`)
    .then((res) => res.json())
    .then((val) => {
        console.log(val.result[0])

        let img = document.createElement("img")
        img.src = val.result[0].home_team_logo;
        document.body.append(img)
        
        let score = document.createElement("span")
        score.innerText = val.result[0].event_final_result;
        document.body.append(score)
        
        let img2 = document.createElement("img")
        img2.src = val.result[0].away_team_logo;
        document.body.append(img2)
    });
    
    
    
    // getting all games in next 24 HOURS
    
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month < 10){
        month = "0" + month
    }
    let day = date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    
    const startDateFrom = [year, month,  day].join('-');
    console.log(startDateFrom); // 👉️ 2022-10-25
    
    
    let tomorrow = Number.parseFloat(day) + 1;
    if (tomorrow < 10){
        tomorrow = "0" + tomorrow;
    }
    
    const endDate = [year, month, tomorrow].join('-');
    console.log(endDate); // 👉️ 2022-10-26
    
    fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${apiKey}&from=${startDateFrom}&to=${endDate}`)
    .then((res) => res.json())
.then((val) => {
    console.log(val)
}).catch((e) => console.log(e))




    // getting player image by ID (will used to live game goalscores)


async function returnPic(id) {
    const result = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Players&playerId=${id}&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838`);
    const playerInfo = await result.json();
    let playerImage = playerInfo.result[0].player_image;
    return playerImage;
}