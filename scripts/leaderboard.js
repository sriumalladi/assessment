let players = ([
    {
        id: 0,
        player: "Charlotte",
        score: 1000,
        awards: ["X", "Y", "Z"],
        highScore: 250
    },
    {
        id: 1,
        player: "Olivia",
        score: 4200,
        awards: ["X", "Y", "Z"],
        highScore: 150
    },
    {
        id: 2,
        player: "Noah",
        score: 2000,
        awards: ["X", "Y", "Z"],
        highScore: 550
    },
    {
        id: 3,
        player: "Robert",
        score: 1800,
        awards: ["X", "Y", "Z"],
        highScore: 50
    },
    {
        id: 4,
        player: "Dhruv",
        score: 1800,
        awards: ["X", "Y", "Z"],
        highScore: 250
    }])

let topList = document.getElementById("topPanel");
let openLeaderBoard = document.getElementById("mask2");
let playersList = document.getElementById("topPlayers");
let userProfileDiv = document.getElementById("userProfile");
let sortable = [];
let duplicatePlayers = [];

(function () {
    leaderBoard();
})();

function leaderBoard() {
    duplicatePlayers = [...players];
    sortable = duplicatePlayers.sort(
        function (a, b) {
            if (a.score === b.score) {
                return b.highScore - a.highScore;
            }
            return Math.floor(a.score) < Math.floor(b.score) ? 1 : -1;
        });
    let playersView = sortable;
    let topThree = playersView.slice(0, 3);

    let topView = topThree.map((x, i) => {
        return `<div class="Lb_Score_Top" onclick="userProfile(${i})"><span class="Lb_Rank">Rank${i + 1}</span><span class="Lb_Pic"><img src="./images/${x.id}.jpg" title="${x.id}" /></span><span class="Lb_Name">${x.player}</span><span class="Lb_Marks">${x.score}</span></div>`
    })

    topList.innerHTML = '';
    topList.innerHTML = `<h3>Leader Board</h3>`;
    topList.innerHTML += topView;

    let viewRemaining = playersView.map((x, i) => {
        return `<div class="Lb_Score" onclick="userProfile(${i})"><span class="Lb_Rank">Rank ${i + 1}</span><span class="Lb_Pic"><img src="./images/${x.id}.jpg" title="${x.id}" /></span><span class="Lb_Name">${x.player}</span><span class="Lb_Marks">${x.score}</span></div>`
    })
    playersList.innerHTML = "";
    playersList.innerHTML = viewRemaining;

    return players;

}


let addScore = (x) => {
    let inputVal = document.getElementById("user" + x);
    console.log(inputVal.value)
    if (inputVal.value != '' && inputVal.value <= 10000000) {
        let userPics = document.querySelectorAll(".Lb_Pic");
        players[x].score = inputVal.value
        //console.log(userPics.length)
        // userPics.forEach(e => {
        //     e.classList.add("fadeOut")
        //     setTimeout(() => {
        //         e.classList.add("fadeIn")
        //     }, 1000);
        // });
        console.log(players)
        return leaderBoard();
    } else {
        leaderBoard()
    }
    return leaderBoard()
    
}

const userProfile = (p) => {
    console.log(p)
    userProfileDiv.style.display = "flex";
    let userprofileView = []
    userprofileView = [duplicatePlayers[p]];
    let userData = userprofileView.map((x, i) => {
        return `<div class="user_container">
        <div class="closeBtn3" onclick="closeWindow()"></div>
        <div class="user_pic"><img src="./images/${x.id}.jpg" alt="${x.id}" />
            <div class="usernewData">
                <div class="textBold">${x.player}</div>
            </div>
        </div>
        <div class="user_data">
            <h3>User Profile</h3>
            <div class="usernewData">
                <div>ID:</div>
                <div class="textBold">${x.id}</div>
            </div>
            <div class="usernewData">
                <div>Score:</div>
                <div class="textBold">${x.score}</div>
            </div>
            <div class="usernewData">
                <div>Highest Score :</div>
                <div class="textBold">${x.highScore}</div>
            </div>
            <div class="usernewData">
                <div>Awards :</div>
                <div class="textBold">${x.awards}</div>
            </div>
        </div>
    </div>`
    })

    userProfileDiv.innerHTML = '';
    userProfileDiv.innerHTML = userData;
}

const closeWindow = () => {
    userProfileDiv.classList.add("fadeOut")
    setTimeout(() => {
        userProfileDiv.classList.remove("fadeOut")
        userProfileDiv.style.display = "none"
    }, 500);
}
function startLeaderBoard() {
    openLeaderBoard.style.display = "flex";
}

function closeLB() {
    openLeaderBoard.style.display = "none";
}










