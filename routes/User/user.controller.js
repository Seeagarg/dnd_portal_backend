const fs = require("fs");
const path = require("path");
const readline = require("readline");
const {
  existInSubscription,
  CheckInDnd,
  InsertIntoDnd,
  InsertIntoUnSubscription
} = require("./user.service");


module.exports = {
  LoginUser: (req, res) => {
    const data = req.body;
    if (data.number == "12345" && data.password == "12345") {
      return res.json({ status: 1, message: "User Login Successfully!!" });
    }
    return res.json({ message: "Wrong Credentials!!", status: 0 });
  },

  InsertDnd: async (req, res) => {
    const file = req.file;
    const data = req.params;

    console.log(file, req.body);
    const filePath = path.resolve(file.path);
    console.log(filePath);
    const fileData = fs.readFileSync(filePath, "utf-8");
    const lines = fileData.split("\n");
    console.log(lines);

    for (const line of lines) {
      const number = line.trim();
      if (!number) {
        continue; 
      }

      try {
        const dndResult = await CheckInDnd(number);
        if (dndResult.length === 0) {
          console.log("*************** not found in dnd ***************\n")
          await InsertIntoDnd(number);
          console.log("*************** Inserted To Dnd ***************\n");

          const subscriptionResult = await existInSubscription(number);
          if (subscriptionResult.length === 0) {
            console.log("*************** Not Found in tbl_subscription ***************\n");
          } else {
            console.log("*************** Found in tbl_subscription ***************\n");
            await InsertIntoUnSubscription(number);
            console.log("*************** Inserted to tbl_unsub ***************\n");
          }
        } else {
            console.log("*************** found in dnd ***************\n")
          const subscriptionResult = await existInSubscription(number);
          if (subscriptionResult.length === 0) {
            console.log("*************** Not Found in tbl_subscription ***************\n");
          } else {
            await InsertIntoUnSubscription(number);
            console.log("*************** Inserted to tbl_subscription_unsub ***************\n");
          }
        }
      } catch (err) {
        console.error("Error processing number:", number, err);
        res.status(500).json({ error: err, message: "Error processing number" });
        return;
      }
    }

    return res.json({ result: "Success" });
  },

  InsertNumber:async(req,res)=>{
    const {ani} = req.body;
    console.log(ani,'ani')
    try {
      const dndResult = await CheckInDnd(ani);
      if (dndResult.length === 0) {
        console.log("*************** not found in dnd ***************\n")
        await InsertIntoDnd(ani);
        console.log("*************** Inserted To Dnd ***************\n");

        const subscriptionResult = await existInSubscription(ani);
        if (subscriptionResult.length === 0){
          console.log("*************** Not Found in tbl_subscription ***************\n");
        } else {
          console.log("*************** Found in tbl_subscription ***************\n");
          await InsertIntoUnSubscription(ani);
          console.log("*************** Inserted to tbl_unsub ***************\n");
        }
      } 
      
      else {
          console.log("*************** found in dnd ***************\n")
        const subscriptionResult = await existInSubscription(ani);
        if (subscriptionResult.length === 0) {
          console.log("*************** Not Found in tbl_subscription ***************\n");
        } else {
          await InsertIntoUnSubscription(ani);
          console.log("*************** Inserted to tbl_subscription_unsub ***************\n");

        }
      }
      res.send("success");
    } catch (err) {
      console.error("Error processing number:", ani, err);
      res.status(500).json({ error: err, message: "Error processing number" });
      return;
    }
    
  }
};
