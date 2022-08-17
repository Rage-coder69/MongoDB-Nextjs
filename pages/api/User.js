import clientPromise from "../../lib/mongo";
import {ObjectId} from "mongodb";

export default async function User(req, res){
    const client= await clientPromise;
    const method = req.method;
    switch (method){
        case 'POST':{
            try{
                const { email, username } = req.body;
                const result = await client.db('test').collection('user').insertOne({
                    email : email,
                    username: username
                });
                if( result.acknowledged === true)
                {
                    const data = await client.db('test').collection('user').find({}).toArray();
                    res.json({
                        data: data,
                        message: "Record Inserted!"
                    });
                }
                else{
                    res.json({
                        message: "Record not Inserted!"
                    })
                }
            }catch (e){
                res.json(`Record not Inserted, Error: ${e}`);
            }
            break;
        }
        case 'GET':{
            try {
                const results = await client.db('test').collection('user').find({}).toArray();
                res.json({
                    results: results
                })
            }catch (e) {
                res.json(`Record not Fetched, Error: ${e}`);
            }
            break;
        }
        case 'DELETE':{
            try {
                const { userId } = req.body;
                console.log(userId)
                const result = await client.db('test').collection('user').deleteOne({
                    _id : ObjectId(userId)
                });
                res.json({
                    result: result
                })
            }catch (e) {
                res.json(`Record not Deleted, Error: ${e}`);
            }
            break;
        }
        case 'PUT':{
            try {
                const { id, email, username } = req.body;
                console.log(id, email, username)
                const result = await client.db('test').collection('user').updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: {
                        email: email,
                        username: username
                    }
                });
                res.json({
                    result: result
                })
            }catch (e) {
                res.json(`Record not Deleted, Error: ${e}`);
            }
            break;
        }
    }
}