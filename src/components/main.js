import React, { useState } from 'react'
import './main.css'
import { useSelector,useDispatch } from 'react-redux';
import { Mint} from '../state/ui/index'
import Logo from '../images/LOGO_YELLOW.png'
import Gif from '../images/Untitled.gif'
import McText from 'mctext-react'

export default function Main() {
    const [NFTSelected,setNFTSelected] = useState()
    const [quantity,setQuantity] = useState(1)

    const dispatch = useDispatch();

    const balanceArray = useSelector((state)=>{
       const result =  state.adoptReducer.balance; 
      return result
      });

      console.log("balance array",balanceArray)

      const Active = useSelector((state)=>{
        return state.adoptReducer.Active;
      });

      const Price = useSelector((state)=>{
        return state.adoptReducer.Price;
      });

      const remaining = useSelector((state)=>{
        return state.adoptReducer.remaining;
      });

      const address = useSelector((state)=>{
        return state.adoptReducer.address;
      });

      const ethBalance = useSelector((state)=>{
        return state.adoptReducer.ethBalance;
      });






    window.ethereum.on('accountsChanged',async (accounts)=>{window.location.reload() })


      async function handleConnect(e){
        e.preventDefault()
        
        window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{
            eth_accounts: {},
          }]
        }); 
       }
      

       function  handleSubmit(e){
            e.preventDefault()
            dispatch(Mint({quantity,value:quantity*Price}))
            
       }

       var remaininingQty = balanceArray&&  10-balanceArray.length-quantity

      return (

        <div className="Main">
         
{/* <McText>
  {{
    text: '',
    extra: [
      {
        text: 'red ',
        color: 'dark_red'
      },
      {
        text: 'bold red ',
        bold: true,
        color: 'dark_red'
      },
      {
        text: 'obfuscated',
        obfuscated: false
      }
    ]
  }}
</McText> */}
            <div style={{display:"flex"}}>
            <a href={'/'}><img src={Logo} className="Main-Logo" ></img></a>
            <div >
                   <select className="Main-DropDown" value= {NFTSelected} onChange = {(e)=>{setNFTSelected(e.target.value)}}>
                  {balanceArray &&  balanceArray.map((entry,index)=><option key={index} value={index}>{index}</option>)}
                  </select>

            </div>
            </div>
            
            <div className="Center">
                <img src={Gif} className="Pic">
                    
                </img>
                <div className="MintText">
             Mint your Token
                </div>
                <button onClick={handleConnect} className="ConnectButton">{address? `${address.slice(0,3)}...${address.slice(38,42)}` :"Connect MetaMask"}</button>
                <div className="QtyPrice">
                    <div className= "QtyPriceBox" style={{fontSize:"18px"}}>
                    My Eth balance :  {ethBalance && (ethBalance/1000000000000000000).toFixed(4)}
                    </div>
                    <div className= "QtyPriceBox" style={{borderTop:"1px solid grey", borderBottom:"1px solid grey"}}>
                        <label>                    Qty  {' '}
                        <button style={{color:"white", backgroundImage: 'linear-gradient(180deg, black, pink)'}} onClick={()=>{if(quantity>=1){setQuantity(quantity-1)} }}> -</button>                            
                            {' '}
                           <input style={{position:"relative", width:"80px",background:"transparent", border:"none",color:"red",fontWeight:"bold", textAlign:"center", fontSize:"20px"}}
                            value={quantity} type="value"            
                            onChange={({ target }) => {setQuantity(target.value)}}/></label>
                            <button style={{color:"white", backgroundImage: 'linear-gradient(180deg, black, pink)'}} disabled={balanceArray &&  balanceArray.length+quantity >= 10} onClick={()=>{setQuantity(quantity+1)}}>+</button>

                            <button 
                            style={{color:"white", backgroundImage: 'linear-gradient(180deg, black, red)'}}
                            onClick={()=>{
                              if((balanceArray.length + (ethBalance/Price)) <10){setQuantity((ethBalance/Price/100).toFixed(0))}
                              else {setQuantity(10-balanceArray.length)}
                              }}>max</button><br/>
                            <p style={{fontSize:"12px",  minWidth:"150px", height:"5px",marginTop:"0px", lineHeight:"5px"}}>you can buy {remaininingQty} more NFTs </p>
                    </div>
                    <div className= "QtyPriceBox">
                    Total Value =  { (quantity*Price/1000000000000000000).toFixed(2)} Eth
                    </div>

                </div>
                    <button onClick={handleSubmit} 
                    style={{position:"relative", left:"45px", height:"50px", width:"450px", background:"pink", borderRadius:"15px",color:"white", backgroundColor:"#4c87e6", fontFamily: 'Minecraft, sans-serif', fontSize:"25px"}}>M I N T</button>

            </div>

            <div className="Main-bottom">
                <div className="BottomBox">
                status
                    <div style={{border:"2px solid black", width:"120px",height:"35px",position:"relative",left:"20px", marginTop:"10px", color:"red"}}>{Active? "Active" : "Non-Active"}</div>
                </div>
                <div className="BottomBox" style={{borderLeft:"1px solid grey",borderRight:"1px solid grey"}}>
                Price

                    <div style={{ width:"120px",height:"35px",position:"relative",left:"20px", marginTop:"10px"}}>{Price && (Price/10000000000000000000).toFixed(4)} Eth</div>
                </div>
                <div className="BottomBox">
                remaining items
                    <div style={{ width:"120px",height:"35px",position:"relative",left:"20px", marginTop:"10px", color:"red"}}>{remaining && remaining   }</div>
                </div>
            </div>
        </div>
    )
}
