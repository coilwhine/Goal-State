fetch("https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838")
    .then((res) => res.json())
    .then((val) => console.log(val))