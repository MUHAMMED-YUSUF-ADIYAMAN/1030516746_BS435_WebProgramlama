import React from "react";
import ReactDOM from "react-dom";


class App extends  React.Component{

    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }

    }
    render() {

        return(
            <>
                <img id="img0" className="kart" src="https://imagesbyheatherm.files.wordpress.com/2009/08/lattice-card1.png?w=584" onClick={()=>selected(0)}/>
                <img id="img1" className="kart" src="https://imagesbyheatherm.files.wordpress.com/2009/08/lattice-card1.png?w=584" onClick={()=>selected(1)}/>
                <img id="img2" className="kart" src="https://imagesbyheatherm.files.wordpress.com/2009/08/lattice-card1.png?w=584" onClick={()=>selected(2)}/>
                <div className="mesaj">
                    <p id="alanId">Kedi kartını bulmak için kartın üzerine tıklamalısın</p>
                    <p>{this.sonuc()}</p>
                </div>
            </>




    )}
    handleRefresh = () => {
        document.location.reload(true);
        window.location.reload();
        // by calling this method react re-renders the component
        this.setState({});
    };
    sonuc=()=>{

        {return(<>{this.state.message}  Bir daha oynamak için <span className="link"onClick={this.handleRefresh} >buraya</span> tıklayınız</>

        )}

    };


}

let randomNumber=Math.floor(Math.random() * 3);
let step=2;
   function selected(x){
    if(step==2 || step==1)
        if(randomNumber==x)
        {
            document.getElementById("img"+x).src = "https://i4.hurimg.com/i/hurriyet/75/750x0/5efd782445d2a04ed8f62cba.jpg";
            this.setState({message: "Tebrikler kazandın"},()=>{})

            this.setState((state) => {
                return {message: "Tebrikler kazandın"};
            });
        }
        else
            document.getElementById("img"+x).src = "https://imgrosetta.mynet.com.tr/file/9897198/640xauto.jpg";
    else if(step==0)
    {
        alet("üzülme")
        this.setState({message: "Bir dahaki Sefere"},()=>{})
        this.setState((state) => {
             {message: "Bir dahaki Sefere"};
        });

    }
    else if(step<0)
        document.location.reload(true);
    step--;
}
ReactDOM.render(<App/>, document.getElementById("root"));