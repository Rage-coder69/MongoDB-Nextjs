import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import clientPromise from "../lib/mongo";
import {ObjectId} from "mongodb";

export default function View({ data }){


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [ user, setUser ] = useState({});

    const router = useRouter();

    useEffect(() => {
        setUser(data)
        setEmail(data.email);
        setUsername(data.username);
    },[])


    const handleSubmit = (e, id) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/User',{
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ id: id, email: email, username: username })
        }).then(res => res.json()).then(data => console.log(data)).catch(e => e.message);
        router.push('/');
    }

    return(
        <>
            <form onSubmit={(e) => handleSubmit(e,user._id)}>
                <input type="text" value={ email } onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" value={ username } onChange={(e) => setUsername(e.target.value)}/>
                <button type={"submit"}>Update</button>
            </form>
        </>
    );
}

export async function getServerSideProps(context){
    let { id } = context.query;
    const client = await clientPromise;
    const result = await client.db('test').collection('user').find({
        _id : ObjectId(id)
    }).toArray()
    let data = JSON.parse(JSON.stringify(result[0]));
    return{
        props:{
            data: data
        }
    }
}