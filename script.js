// const apiKey = "ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838"
const apiKey = "5aa9fcce24396558941310cd46d3a4499e45318738e277271468dd16c1e5e412"

// getting main live games 


function fetchFromApi() {

    // fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&leagueId=202&APIkey=${apiKey}`)
    fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${apiKey}`)
        .then((res) => res.json())
        .then((val) => {
            console.log(val.result[0])
            gettingLiveGames();

            let homeTeamName = document.querySelector("#main-event-home-team-name");
            homeTeamName.innerText = val.result[0].event_home_team;


            let awayTeamName = document.querySelector("#main-event-away-team-name");
            awayTeamName.innerText = val.result[0].event_away_team;




            let homeImg = document.querySelector("#home-team-img");
            // homeImg.classList.add("live-team-img")
            homeImg.style.background = `url(${val.result[0].home_team_logo})`;
            homeImg.style.backgroundRepeat = `no-repeat`;
            homeImg.style.backgroundPosition = `center`;

            
            let awayImg = document.querySelector("#away-team-img");
            awayImg.style.background = `url(${val.result[0].away_team_logo})`;
            awayImg.style.backgroundRepeat = `no-repeat`;
            awayImg.style.backgroundPosition = `center`;


            score = val.result[0].event_final_result;
            console.log(score)
            let homeScore = score.charAt(0);
            document.querySelector("#main-event-home-team-score").innerText = homeScore;
            let awayScore = score.charAt(4);
            document.querySelector("#main-event-away-team-score").innerText = awayScore;

            console.log(val.result[0].goalscorers)

            for(let i = 0; i < val.result[0].goalscorers.length; i++){
                // if(!result[0].goalscorers) return ;

                // console.log(val)
                let goalScorerImgAwayTeam = document.createElement("img");
                goalScorerImgAwayTeam.setAttribute("class" , "scorer-img");
                goalScorerImgAwayTeam.setAttribute("id" , `away-scorer${i + 1}`);

                
                let goalscorerAwayPlayerID = val.result[0].goalscorers[i].away_scorer_id;
                console.log(goalscorerAwayPlayerID)
                returnPic(goalscorerAwayPlayerID).then((val) =>{
                    goalScorerImgAwayTeam.src = val;
                })
                document.querySelector("#main-event-away-scorers-imgs").append(goalScorerImgAwayTeam);
            }



            // return live game minute time
            function getLiveGameMinuteTime(){
                let liveStatus = val.result[0].event_status;
                console.log(liveStatus)
                if(liveStatus == "Finished"){
                    document.querySelector(".main-live-event-time").innerText = liveStatus;
                    document.querySelector(".main-live-event-time").style.color = "red";
                    document.querySelector(".timeLine").style.display = "none";
                } else {
                    document.querySelector(".main-live-event-time").innerText = liveStatus + "'"
                    document.querySelector(".timeLine").style.display = "block";
                }

            }

                // return 6 live game elements


            getLiveGameMinuteTime();
            // getAllNextGames();

        }).catch((e) => console.log(e))

    }



    // return 6 live games
    function gettingLiveGames(){
         
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    
    const startDateFrom = [year, month, day].join('-');
    console.log(startDateFrom); // 👉️ 2022-10-25
    
    
    let tomorrow = Number.parseFloat(day) + 1;
    if (tomorrow < 10) {
        tomorrow = "0" + tomorrow;
    }

    const endDate = [year, month, tomorrow].join('-');
    console.log(endDate); // 👉️ 2022-10-26
        // fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${apiKey}`)
        fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${apiKey}&from=${startDateFrom}&to=${endDate}`)
        .then((res) => res.json())
        .then((val) => {
            console.log(val)
            for(let i = 0; i < 6; i++){
            
            
                        let liveGameBox = document.createElement("div");
                        liveGameBox.setAttribute("class", "live-game-box");
                        
                        let liveBoxHeading = document.createElement("p");
                        liveBoxHeading.setAttribute("class", "live-box-heading");
                        liveBoxHeading.innerText = val.result[i].event_home_team + "VS" + val.result[i].event_away_team; 
                    
                    let liveBoxWraper = document.createElement("div");
                    liveBoxWraper.setAttribute("class", "live-box-body-wraper");
                    
                    let homeTeamLogo = document.createElement("img");
                    homeTeamLogo.setAttribute("class", "home-team-logo");
                    homeTeamLogo.src = val.result[i].home_team_logo
                    
                    let liveBoxScore = document.createElement("span");
                    liveBoxScore.setAttribute("class", "live-box-score");
                    liveBoxScore.innerText = val.result[i].event_final_result;
                    console.log(val.result[i].event_final_result);
                    
                    let awayTeamLogo = document.createElement("img");
                    awayTeamLogo.setAttribute("class", "away-team-logo");
                    awayTeamLogo.src = val.result[i].away_team_logo
                    
                    liveBoxWraper.append(homeTeamLogo, liveBoxScore, awayTeamLogo)
                    
                    liveGameBox.append(liveBoxHeading, liveBoxWraper);
                    
                    let liveGame = document.querySelector(".live-games-container");
                    
                    liveGame.append(liveGameBox);
                    
                }
            })
            .catch((e) => console.log(e))
    }




    // getting all games in next 24 HOURS
function getAllNextGames(){

    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    
    const startDateFrom = [year, month, day].join('-');
    console.log(startDateFrom); // 👉️ 2022-10-25
    
    
    let tomorrow = Number.parseFloat(day) + 1;
    if (tomorrow < 10) {
        tomorrow = "0" + tomorrow;
    }

    const endDate = [year, month, tomorrow].join('-');
    console.log(endDate); // 👉️ 2022-10-26

    fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${apiKey}&from=${startDateFrom}&to=${endDate}`)
        .then((res) => res.json())
        .then((val) => {

        }).catch((e) => console.log(e))
        
}

// getAllNextGames();
// getting player image by ID (will used to live game goalscores)


async function returnPic(id) {
    const result = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Players&playerId=${id}&APIkey=ca6d66a0a93082ed6d39d08eac0f7e8b3df170738be465f6e4a356ce414b9838`);
    const playerInfo = await result.json();
    let playerImage = playerInfo.result[0].player_image;
    return playerImage;
}

// console.log(returnPic(1506559850).then((val) => console.log(val)))

function fetchFromApiStatistics(index) {
    fetch(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${apiKey}`)
        .then((res) => res.json())
        .then((val) => {
            console.log(val.result[0])

            const homeSub = val.result[index].statistics[1].home;
            const awaySub = val.result[index].statistics[1].away;
            const homeTotalShots = val.result[index].statistics[6].home;
            const AwayTotalShots = val.result[index].statistics[6].away;
            const homeShotsOnTarget = val.result[index].statistics[7].home;
            const awayShotsOnTarget = val.result[index].statistics[7].away;
            const homeShotsOffTarget = val.result[index].statistics[8].home;
            const awayShotsOffTarget = val.result[index].statistics[8].away;
            const homeCorners = val.result[index].statistics[13].home;
            const awayCorners = val.result[index].statistics[13].away;
            const homeBallPossession = val.result[index].statistics[14].home;
            const awayBallPossession = val.result[index].statistics[14].away;
            const homeYellowCards = val.result[index].statistics[15].home;
            const awayYellowCards = val.result[index].statistics[15].away;
            const homeSaves = val.result[index].statistics[16].home;
            const awaySaves = val.result[index].statistics[16].away;
        })
}

