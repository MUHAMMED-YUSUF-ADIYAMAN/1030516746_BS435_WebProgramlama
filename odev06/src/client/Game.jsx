import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {

                kediIndex: Math.floor(Math.random()*3),
                durum: undefined,
                kart: ["img/default.png","img/default.png","img/default.png"],
                kartSayac: 0,
                hak:2,
                oyunSonlandi: false}

    }

    kediSec = (index) => {
        const { kart, kediIndex, kartSayac, oyunSonlandi } = this.state;

        if(!oyunSonlandi){
            const yeniKart = [...kart];
            let durum;

            if(kediIndex===index){
                yeniKart[index] = "img/kedi.webp";
                durum = "Kazandınız :)"
            }else {
                yeniKart[index] = "img/kopek.webp";
                if(kartSayac===1){
                    durum = "Kaybettiniz :("
                }
            }
            this.setState({

                    kart:yeniKart,
                    kartSayac: this.state.kartSayac+1,
                    hak:this.state.hak-1,
                    durum

            });

            if(durum){
                this.setState({
                    oyunSonlandi: true
                })
            }

        }
    }

    yeniOyun = () => {
        this.setState({
             kediIndex: Math.floor(Math.random()*3),
                durum: undefined,
                kart: ["img/default.png","img/default.png","img/default.png"],
                kartSayac: 0,
                hak:2,
                oyunSonlandi: false

        })
    }

    render(){
        const { kart, durum } = this.state;
        const  game=this.state;

        if(!game){
            return <h2>Yükleniyor...</h2>
        }
        else if(this.state.durum==="Kaybettiniz :(")
        {
            return (
                <div className="game-result">
                    <h2>{this.state.durum}</h2>
                    <p>Bir daha şansını dene</p>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>Yeni Oyun</button>
                    </div>
                </div>
            )
        }
        else if(this.state.durum==="Kazandınız :)")
        {
            return (
                <div className="game-result">
                    <h2>{this.state.durum}</h2>
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
                    <p>{this.state.hak} tane hakkın kaldı.</p>
                    <img className="kart" src={kart[0]} onClick={()=>{this.kediSec(0)}}/>
                    <img className="kart" src={kart[1]} onClick={()=>{this.kediSec(1)}}/>
                    <img className="kart" src={kart[2]} onClick={()=>{this.kediSec(2)}}/>
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