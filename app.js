
// const { name } = require("ejs")
const express = require("express")
const http = require("http")
const path = require ("path")
const SocketIO = require("socket.io")

const app = express()

const Server = http.createServer(app)
const io = SocketIO(Server)




app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())



let  socketsConnected = new Set()
let currentOrder = [];
let OrderHistory = [];

io.on('connection', (socket)=>{
  console.log('User connected', socket.id)
  socketsConnected.add(socket.id)

 

  socket.on('disconnect', ()=>{
    console.log('User disconnected', socket.id)
    socketsConnected.delete(socket.id)
  })

  
  
  socket.on('message', (msg)=>{
    console.log(socket.id, msg)
       
    

    let response = '';
    switch(msg.message){
    case "1" :
   response = `Welcome to Hanson Food Menu:.
   <ul>
    <li> Press 10 for Rice (N1,500).</li>
    <li> Press 20 for Bean (N1,000).</li>
     <li> Press 12 for Indomie (N900).</li>
     <li> Press 21 for Fry Egg (N650).</li>
    <li>  Press 7 for Vegetable Soup (N1500).</li>
    <li>  Press 22 for Egusi Soup (N1000).</li>
     <li> Press 16 for Beef (N2,100).</li>
    <li>  Press 19 for Eba (N750).</li>
     <li> Press 23 for Semo (N1,000).</li>
    <li>  Press 25 for Fufu (N650).</li>
     <li> Press 23 for Coke (N450).</li>
    <li>  Press 17 for cow Meat (N850).</li>
     <li> Press 26 for Fish (N650).</li>
    <li>  Press 36 for Ice Cream (N1,500).</li>
     <li> Press 35 for Bottle water (N1,200).</li>
     <li> Press 40 for Stew (N500).</li>
     <li> Press 42 for Moi-Moi (N1,250)</li>
      </ul> `;

     break;
     case "2":
      response = `Your Order History: ${OrderHistory.map(item=> item.name).join(', ')}`;
           
      break;

     case "3":
      const total = currentOrder.reduce((sum, item)=>sum + item.price, 0);
      response = `The total sum of your current is N${total}`;

      break;
           
      case "4":     
      currentOrder = [];
      response = "Your current order is cancelled.";
      
      break;
      case "44":     
      OrderHistory.push(...currentOrder);
      response = `you have checked out with the following items: ${currentOrder.map(item=> item.name).join(', ')}`;
      currentOrder = [];
    
      break;
      case "0":   
      response = `
      <ul>    <li>Press 1 to Place an order.</li>
               <li>Press 2 Order History.</li> 
                <li>Press 3 To Check sum of Item.</li>
                <li>Press 4 To Cancel Order.</li>
                <li>Press 44 To Checkout Order.</li>`;

      break;
      
      case "10":   
      currentOrder.push({name: 'Rice', Price: 1500});
      response = "Rice have been added to you order.";

      break;
      case "20" :
      currentOrder.push({name: 'Bean', Price: 1000});
      response = "Bean have been added to you order.";

      break;
      case "40":
      currentOrder.push({name: 'Stew', Price: 400});
      response = "Stew have been added to you order.";

      break;
      case "12":
        currentOrder.push({name: 'Indomie', Price: 900});
        response = "Indomie have been added to you order.";

        break;
        case "21":
          currentOrder.push({name: 'Fry-Egg', Price: 650});
          response = "Fry-Egg have been added to you order.";

          break;
          case "7":
            currentOrder.push({name: 'Vegetable-soup', Price: 1500});
            response = "Vegetable-soup have been added to you order.";

            break;
            case "22":
              currentOrder.push({name: 'Egusi', Price: 1000});
              response = "Egusi have been added to you order.";
  
              break;
              case "16":
                currentOrder.push({name: 'Beef', Price: 2100});
                response = "Beef have been added to you order.";

      break;
      case "19":
                currentOrder.push({name: 'Eba', Price: 2100});
                response = "Eba have been added to you order.";
      
      break;
      case "23":
                currentOrder.push({name: 'Semo', Price: 2100});
                response = "Semo has been added to you order.";
      
    break;
    case "25":
                currentOrder.push({name: 'Fufu', Price: 2100});
                response = "Fufu has been added to you order.";
      break;
      case "23":
        currentOrder.push({name:"Coke", Price: 450});
        response = "Coke has been added to your Order"
      
        break;
        case "17":
          currentOrder.push({name:"Cow-Meat", Price: 850});
          response = "Cow-Meat has been added to your Order";

        
          break;
          case "26":
            currentOrder.push({name:"Fish", Price: 650});
            response = "Fish has been added to your Order";

            break;
            case "36":
              currentOrder.push({name:"Ice-Cream", Price: 1500});
              response = "Fish has been added to your Order";

          break;
          case "35":
            currentOrder.push({name:"Bottle water", Price: 1200});
            response = "Bottle-Water has been added to your Order";
           
            break;
            case "42":
              currentOrder.push({name:"Moi-Moi", Price: 1250});
              response = "Moi-Moi has been added to your Order";
           
              break;
              
               
      default:
   
       response = "Invalid Selection"
      
    
  }
    const responseData = {
      message: response,
      name: "Bot",
      dateTime: new Date()
    };

    socket.emit('message', responseData);
    socket.broadcast.emit('message', responseData);
  })

})







module.exports = Server