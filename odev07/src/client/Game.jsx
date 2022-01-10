import React, {Component} from 'react';
import { withRouter } from "react-router";

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
                errorMsg: null,
                game: null
        }

    }
    componentDidMount() {
        this.fetchCurrentGame();
    }
    fetchCurrentGame = async () => {
        const url = "/api/games/ongoing";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if (response.status === 404) {
            await this.startNewGame();
            return;
        }

        if (response.status !== 200) {
            this.setState({
                errorMsg: "Sunucu bağlantısında hata. Hata kodu: " + response.status
            });
            return;
        }

        const game = await response.json();
        this.setState({ game: game, errorMsg: null });
    };
    startNewGame = async () => {
        const url = "/api/games";

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if (response.status !== 201) {
            this.setState({
                errorMsg: "Sunucu bağlantısında hata. Hata kodu: " + response.status
            });
            return;
        }

        const game = await response.json();
        this.setState({ game: game, errorMsg: null });
    };


    answer = (index) => {
        console.log(index);
       // console.log(this.state.game.kart[index]+"-"+this.state.game.img[index]);
        this.doAnswer(this.state.game.img[index],index);
       // console.log(this.state.game.kart[index]+"-"+this.state.game.img[index]);
    };

    doAnswer = async (answerindex,index) => {
        const url = "/api/games/ongoing";

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ answerIndex: answerindex,
                    index:index})
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if (response.status !== 201) {
            this.setState({
                errorMsg: "Sunucu bağlantısında hata. Durum kodu: " + response.status
            });
            return;
        }

        const game = await response.json();
        this.setState({ game: game, errorMsg: null });

        if (game.victory || game.defeat) {
            await this.props.fetchAndUpdateUserInfo();
        }
    };


    // kediSec = (index) => {
    //     const { kart, kediIndex, kartSayac, oyunSonlandi } = this.state;
    //
    //     if(!oyunSonlandi){
    //         const yeniKart = [...kart];
    //         let durum;
    //
    //         if(kediIndex===index){
    //             yeniKart[index] = "img/kedi.webp";
    //             durum = "Kazandınız :)"
    //         }else {
    //             yeniKart[index] = "img/kopek.webp";
    //             if(kartSayac===1){
    //                 durum = "Kaybettiniz :("
    //             }
    //         }
    //         this.setState({
    //
    //                 kart:yeniKart,
    //                 kartSayac: this.state.kartSayac+1,
    //                 hak:this.state.hak-1,
    //                 durum
    //
    //         });
    //
    //         if(durum){
    //             this.setState({
    //                 oyunSonlandi: true
    //             })
    //         }
    //
    //     }
    // }

    // yeniOyun = () => {
    //     this.setState({
    //             kediIndex: Math.floor(Math.random()*3),
    //             durum: undefined,
    //             kart: ["img/default.png","img/default.png","img/default.png"],
    //             kartSayac: 0,
    //             hak:2,
    //             oyunSonlandi: false
    //
    //     })
    // }

    render(){
        const  game=this.state.game;
        console.log(game);
        if(!game){
            return <h2>Yükleniyor...</h2>
        }
        else if(game.defeat)
        {
            return (
                <div className="game-result">
                    <h2>Kaybettin :( Kediyi seçmen gerekiyordu.</h2>
                    <p>Bir daha şansını dene</p>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>Yeni Oyun</button>
                    </div>
                </div>
            )
        }
        else if(game.victory)
        {
            return (
                <div className="game-result">
                    <h2>Kazandınız :)</h2>
                    <img className="kart" src="img/win.gif" onClick={()=>{this.kediSec(0)}}/>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>Yeni Oyun</button>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <p>{game.hak} tane hakkın kaldı.</p>
                    <img className="kart" src={game.kart[0]} onClick={()=>{this.answer(0)}}/>
                    <img className="kart" src={game.kart[1]} onClick={()=>{this.answer(1)}}/>
                    <img className="kart" src={game.kart[2]} onClick={()=>{this.answer(2)}}/>
                    {/*<div className="mesaj">*/}
                    {/*    <p>{durum?durum:"Kedi kartını bulmak için kartın üzerine tıklamalısın."}</p>*/}
                    {/*    {durum && <p>*/}
                    {/*        Yeni bir oyun oynamak istersen <span onClick={this.yeniOyun} className='link'>buraya</span> tıklayabilirsin.*/}
                    {/*    </p>}*/}
                    {/*</div>*/}
                </div>
            );
        }

    }
}