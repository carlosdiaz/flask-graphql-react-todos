import React, {useState, useEffect} from "react";
import "./App.css";


function getOrders(cb) {
    console.log('getOrders call');
    fetch(`/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query {
        orders {
          id
          name
          description
          priority
        }
      }`,
        }),
    })
        .then((res) => res.json())
        .then((res) => cb(res.data.orders))
        .catch(console.error);
}

function createTodo(name, description, priority, cb) {
    console.log('Posting request');
    console.log('Parameters: ', name, description, priority)
    fetch(`/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation {
        createTodo(name: ${JSON.stringify(name)}, description: ${JSON.stringify(description)}, priority: ${priority}) {
          id
          name
          description
          priority
        }
      }`,
        }),
    })
        .then((res) => res.json())
        .then((res) => cb(res.data))
        .catch(console.error);
}

function App() {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        getOrders((data) => setMyOrders(data));
    }, []);

    function onSubmitOrderForm(order) {
        console.log('Va ', order);
        createTodo(order.name, order.description, order.priority, ({createTodo}) => {
            setMyOrders([...myOrders, createTodo]);
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <OrderForm onSubmit={onSubmitOrderForm}/>
                <Orders orders={myOrders}/>
            </header>
        </div>
    );
}

function OrderForm({onSubmit}) {
    const [order, setOrder] = useState({
        name: "",
        description: "",
        priority: "HIGH",
    });
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(order);
            setOrder({...order, name: "", description: ""});
        }} className="Form">

            <label>
                <span>NAME:</span>
                <input value={order.name} type="text"
                       onChange={({target}) => setOrder({...order, name: target.value})}/>
            </label>

            <label>
                <span>DESCRIPTION:</span>
                <input value={order.description} type="text"
                       onChange={({target}) => setOrder({...order, description: target.value})}/>
            </label>


            <label>
                <span>Priority:</span>
                <select onChange={({target}) => setOrder({...order, priority: target.value})}>
                    <option value="HIGH" defaultValue>HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                </select>
            </label>

            <input type="submit" disabled={order.name === ""} value="Create TODO"/>
        </form>
    );
}

function Orders({orders}) {
    console.log("Initially ", orders);

    if (orders) {
        return (
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.name} - {order.description}{" "} - {order.priority}
                    </li>
                ))}
            </ul>
        );

    }
}

export default App;
