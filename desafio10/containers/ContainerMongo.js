import mongoose from 'mongoose';


const URI = 'mongodb+srv://admin:camilo2676@cluster0.kjy2oj9.mongodb.net/eccomerce?retryWrites=true&w=majority';

class ContainerMongo {
    constructor() {
        console.log('>>> Connecting to Mongo please wait...');
        try{
            mongoose.connect(URI).then(() => {
                console.log(`[MongoDB]: Connected to database`);
            });
            
        }catch(error){
            console.log('[Connection error]: ', error.message);
        }
    }
}


export { ContainerMongo };