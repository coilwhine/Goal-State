// fetch("https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838")
//     .then((res) => res.json())
//     .then((val) => console.log(val))
// fetch("https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838&from=2021-05-18&to=2021-05-18")
//     .then((res) => res.json())
//     .then((val) => console.log(val))

async function returnPic(id) {
    const result = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Players&playerId=${id}&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838`);
    const playerInfo = await result.json();
    let playerImage = playerInfo.result[0].player_image;
    return playerImage;
}