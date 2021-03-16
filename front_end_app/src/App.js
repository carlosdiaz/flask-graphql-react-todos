import React, {useState, useEffect} from "react";
import "./App.css";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


function getOrders(cb) {
    console.log('getOrders call');
    fetch(`/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query {
        todos {
          id
          name
          description
          priority
        }
      }`,
        }),
    })
        .then((res) => res.json())
        .then((res) => cb(res.data.todos))
        .catch(console.error);
}

function createTodo(name, description, priority, cb) {
    console.log('Posting request');
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
                {/*<span>Name:</span>*/}
                <TextField value={order.name} label="Name:" type="text"
                           onChange={({target}) => setOrder({...order, name: target.value})}/>
            </label>
            <br/><br/>
            <label>
                {/*<span>Description:</span>*/}
                <TextField value={order.description} label="Description:" type="text"
                           onChange={({target}) => setOrder({...order, description: target.value})}/>
            </label>
            <br/><br/>
            {/*<span>Priority:</span>*/}
            <Select defaultValue="HIGH" onChange={({target}) => setOrder({...order, priority: target.value})}>

                <MenuItem value="HIGH">HIGH</MenuItem>
                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                <MenuItem value="LOW">LOW</MenuItem>
            </Select>
            <br/><br/>

            {/*<input type="submit" disabled={order.name === ""} value="Create TODO"/>*/}
            <Button type="submit"  variant="contained" color="primary" disabled={order.name === ""}>
                Create Task
            </Button>
            <br/><br/><br/><br/>
        </form>
    );
}

function Orders({orders}) {
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
