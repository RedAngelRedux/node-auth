const { json } = require("body-parser");

const { messages } = require("../data/data");
const User = require("../models/User");
const Message = require("../models/Messages");
const Messages = require("../models/Messages");


/* This middleware function returns a list of user { _id, name } that have ever 
| communicated with the logged in user
*/
const getUserThreads = async (req,res,next) => {
    await User.findById(res.locals.user._id)
        .exec((err, docs) => {
            if(err) res.status(500).json({message:`error${err}`});
            else if(docs.length===0) res.status(404).json({message:`no user found`});
            else {
                req.user_threads = docs.user_threads;
                next();
            }
        })
}

const getUserThreadsInfo = async (req,res) => {
    let listOfUserIds = req.user_threads;
    let listOfUserInfo = [];
    for(let i = 0; i < listOfUserIds.length; i++) {
            await User.findById({_id: listOfUserIds[i]})
                .exec((err,docs) => {
                    if(err) res.status(500).json({message: `error ${err}` });
                    else if(docs.length===0) res.status(404).json({message: "No User Found" });
                    else {
                        listOfUserInfo.push(docs);
                        if(i === listOfUserIds.length-1) res.status(200).json(listOfUserInfo);
                    }
                })
    }
}

class SingleMessage {
    constructor(to,from,body,date,authUser) {
        this.to = to;
        this.from = from ;
        this.body = body;
        this.date = date;
        this.authUser = authUser;
    }
}

const getConvoMsgsFromTo = async (req,res,next) => {
    let authUser = res.locals.user._id;
    let partner = req.body.partner;

    res.locals.messages = [];

    console.log(`authUser ${authUser}, partner ${partner}`);
    await Message.find({from: authUser, to: partner})
                    .exec((err,docs) => {
                        if(err) {
                            res.status(500).json({message: `error ${err}` });
                        }
                        else {
                            if(docs.length !== 0) {
                                // console.log(docs);
                                let messages = docs.map(v => {
                                   const  {to, from, body, date} = v;
                                   return new SingleMessage(to,from,body,date,true);
                                    // return new {to:to, from:from, body:body, date:date};
                                });
                                // console.log(messages);
                                // res.locals.messages.push(docs);
                                res.locals.messages = messages;
                            }                        
                            next();
                        }
                    })
}

const getConvoMsgsToFrom = async (req, res, next) => {
  let authUser = res.locals.user._id;
  let partner = req.body.partner;

  await Message.find({ to: authUser, from: partner }).exec((err, docs) => {
    if (err) {
      res.status(500).json({ message: `error ${err}` });
    } else {
      if (docs.length !== 0) {
        //   res.locals.messages.push(docs);
      // console.log(docs);
        let messages = docs.map(v => {
            const {to, from, body, date} = v;
            return new SingleMessage(to,from,body,date,false);
        });
        res.locals.messages = [...res.locals.messages, ...messages];
        console.log(res.locals.messages);
      }
      next();
    }
  });
};

const sortConvoMsgsByDateTime = async(req, res) => {
    const compare = (a,b) => {
        aDate = a.date;
        bDate = b.date;
        let comparison = 0;
        if( aDate > bDate) {
            comparison = 1;
        } else if( aDate < bDate ) {
            comparison = -1;
        }
        return comparison;
    }
    res.locals.messages.sort(compare);
    res.status(200).json(res.locals.messages);
}

const seedDB = async (req, res) => {
    Message.insertMany(messages)
        .then(res.status(201).send({ messages }))
        .catch(err => res.status(500).send({message: err}));
}

module.exports = { seedDB, getUserThreads, getUserThreadsInfo, getConvoMsgsFromTo, getConvoMsgsToFrom, sortConvoMsgsByDateTime };