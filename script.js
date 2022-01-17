
    let input = document.querySelector("#search-field");
    let listResults = document.querySelector(".list-results");
    let counteFavtorie = document.querySelector(".count");
    let button = document.querySelector("button");
    const musicList = [];

    input.addEventListener('input', function(event){
        result(event.target.value);
    })

    //get Music
    async function getMusic() {
        const music = await fetch('https://api.jsonbin.io/b/61e42e5cdbe5d1308326a1b6');

        const data = await music.json();
       
        data.tracks.items.forEach (function(oneSong){

           let song = document.createElement("div");
               song.className = 'song';

            let count = document.querySelector(".number");

            song.innerHTML += (`
            <div class="row">
                <div class="number"></div>
                <div class="thumbnail"><img src="${oneSong.track.album.images[2].url}"></div>
                <div class="row names">
                    <div class="name-song">${oneSong.track.name}</div>
                    <div class="name-artist">${oneSong.track.artists[0].name}</div>     
                </div>
                <div class="row icons">
                    <div class="like"></div>
                    <div class="play"></div>
                </div>
            </div>
                <audio controls>
                    <source src="${oneSong.track.preview_url}" type="audio/mpeg">
                </audio>
            `);     

            
           listResults.append(song);

            musicList.push(song);
        })


        // play and like
        musicList.forEach (function(songList){
            //audio
            let play = songList.querySelector(".play");
            let audio = songList.querySelector("audio");
            let audioPlayIcon = songList.querySelector(".play")
            
            //audio togle
            play.addEventListener('click', function(event){
                audio.classList.toggle("show");
                audioPlayIcon.classList.toggle("close");
                audio.pause();
                audio.currentTime = 0;
            })

            //favorite
            let like = songList.querySelector(".like");
            //set up key to musicList - favorite song
            songList.favorite = false;
       

            like.addEventListener('click', function(event){
                if(songList.favorite == false){
                    songList.favorite = true;
                    like.classList.add("love-it");
                    //counting plus
                    let favoritePlus = musicList.filter(function(n){
                        return n.favorite
                    }).length
          
                    counteFavtorie.innerHTML = favoritePlus

                } else {
                    songList.favorite = false;
                    like.classList.remove("love-it");
                    //counting minus
                    let favoriteMinues = musicList.filter(function(n){
                        return n.favorite
                    }).length
          
                     counteFavtorie.innerHTML = favoriteMinues
                }
            })
        })
    }

    getMusic();

    
    //vyhledávání favorite
    function resultFavorite(){
        button.addEventListener("click", function(){
            musicList.forEach (function(song){       
                if(song.favorite == false){
                    song.classList.add("hide");
                } else {
                    song.classList.remove("hide");
                }
            })
        })
    }

    resultFavorite();

    //vyhledávání
    function result(searching){
        musicList.forEach (function(searchSong){
            if(searchSong.innerText.toLowerCase().includes(searching.toLowerCase())){
                searchSong.classList.remove("hide");
            } else {
                searchSong.classList.add("hide");
            }
            listResults.append(searchSong);
        })
    }

    result();
