let randomNumber=Math.floor(Math.random() * 3);
        let step=2;
        selected=(x)=>{
            if(step==2 || step==1)
                if(randomNumber==x)
                {
                    document.getElementById("img"+x).src = "https://i4.hurimg.com/i/hurriyet/75/750x0/5efd782445d2a04ed8f62cba.jpg";
                    document.getElementById("alanId").style="display: none;";
                    document.getElementById("kazandiId").style="display: block ;";
                }
                else 
                    document.getElementById("img"+x).src = "https://imgrosetta.mynet.com.tr/file/9897198/640xauto.jpg";
            else if(step==0)
                {
                    document.getElementById("alanId").style="display: none;";
                    document.getElementById("yenildiId").style="display: block ;";
                }
            else if(step<0)
                document.location.reload(true);
            step--;
        }
