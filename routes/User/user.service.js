const pool = require("../../Config/db");

module.exports = {
    CheckInDnd: async (data) => {
        console.log(data, "in check dnd");
        const check_dnd_query = process.env.CHECK_IN_DND;
        // console.log(check_dnd_query);

        try {
            const result = await new Promise((resolve, reject) => {
                pool.query(check_dnd_query, [data], (err, result) => {
                    if (err) {
                        console.error("Error in CheckInDnd:", err);
                        reject(err);
                    } else {
                        // console.log("CheckInDnd result:", result);
                        resolve(result);
                    }
                });
            });
            return result;
        } catch (error) {
            throw new Error(`CheckInDnd failed: ${error.message}`);
        }
    },

    existInSubscription: async (data) => {
        console.log(data, "in check sub");

        if (!data) {
            throw new Error("Data is missing for existInSubscription.");
        }

        const check_subscriber_query = process.env.CHECK_SUBSCRIBER;

        try {
            const result = await new Promise((resolve, reject) => {
                pool.query(check_subscriber_query, [data], (err, result) => {
                    if (err) {
                        console.error("Error in existInSubscription:", err);
                        reject(err);
                    } else {
                        // console.log("existInSubscription result:", result);
                        resolve(result);
                    }
                });
            });
            return result;
        } catch (error) {
            throw new Error(`existInSubscription failed: ${error.message}`);
        }
    },

    InsertIntoDnd: async (data) => {
        console.log(data, "in insert dnd");

        if (!data) {
            throw new Error("Data is missing for InsertIntoDnd.");
        }

        const insert_dnd_query = process.env.INSERT_INTO_DND;

        try {
            const result = await new Promise((resolve, reject) => {
                pool.query(insert_dnd_query, [data], (err, result) => {
                    if (err) {
                        console.error("Error in InsertIntoDnd:", err);
                        reject(err);
                    } else {
                        // console.log("InsertIntoDnd result:", result);

                        resolve(result);
                    }
                });
            });
            return result;
        } catch (error) {
            throw new Error(`InsertIntoDnd failed: ${error.message}`);
        }
    },

    InsertIntoUnSubscription: async (data) => {
        console.log(data, "in insert unsub");

        if (!data) {
            throw new Error("Data is missing for InsertIntoUnSubscription.");
        }

        const insert_unSubscription_query = process.env.INSERT_INTO_UNSUBSCRIPTION;
        const delete_Subscription_query = process.env.DELETE_FROM_SUBSCRIPTION;

        try {
            const result = await new Promise((resolve, reject) => {
                pool.query(insert_unSubscription_query, [data], (err, result) => {
                    if (err) {
                        console.error("Error in InsertIntoUnSubscription:", err);
                        reject(err);
                    } else {
                        // console.log("InsertIntoUnSubscription result:", result);
                        pool.query(delete_Subscription_query, [data], (err, deleteResult) => {
                            if (err) {
                                console.error("Error in DeleteFromSubscription:", err);
                                reject(err);
                            } else {
                                console.log("*************** deleted from subscription tbl ***************\n")
                                // console.log("DeleteFromSubscription result:", deleteResult);
                                resolve(deleteResult);
                            }
                        });
                    }
                });
            });
            return result;
        } catch (error) {
            throw new Error(`InsertIntoUnSubscription failed: ${error.message}`);
        }
    }
};






















// const pool = require("../../Config/db")

// module.exports = {
//     CheckInDnd:(data)=>{
//         console.log(data,"in check dnd")
//         // if(!data){
//         //     return;
//         // }

//         const check_dnd_query = process.env.CHECK_IN_DND
//         console.log(check_dnd_query)
//         pool.query(check_dnd_query,[data],(err,result)=>{
//             if(err){
//                 console.log(err)
//                 return err;
//             }
//             else{
//                 console.log(result)
//                 return result
//             }
//         })


//     },
//     existInSubscription:(data)=>{
//         console.log(data,"in check sub")

//         if(!data){
//             return ;
//         }

//         const check_subscriber_query = process.env.CHECK_SUBSCRIBER

//         pool.query(check_subscriber_query,[data],(err,result)=>{
//             if(err){
//                 return err 
//             }
//             else{
//                 return result
//             }
//         })

//     },
//     InsertIntoDnd:(data)=>{
//         console.log(data,"in insert dnd")
//         if(!data){
//             return;
//         }
//         const insert_dnd_query = process.env.INSERT_INTO_DND
//         pool.query(insert_dnd_query,[data],(err,result)=>{
//             if(err){
//                 return err;
//             }
//             else{
//                 return result;
//             }
//         })
//     },
//     InsertIntoUnSubscription:(data)=>{
//         console.log(data,"in insert unsub");
//         if(!data){
//             return;
//         }
//         const insert_unSubscription_query = process.env.INSERT_INTO_UNSUBSCRIPTION
//         pool.query(insert_unSubscription_query,[data],(err,result)=>{
//             if(err){
//                 return err;
//             }
//             else{
//                 const delete_Subscription_query = process.env.DELETE_FROM_SUBSCRIPTION
//                 pool.query(delete_Subscription_query,[data],(err,result)=>{
//                     if(err){
//                         return err;
//                     }
//                     else{
//                         return result;
//                     }
//                 })
//             }
//         })
//     }
// }