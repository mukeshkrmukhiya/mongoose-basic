// getting-started.js
const mongoose = require('mongoose');
const validator = require("validator");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydatabase');
  console.log("Connection Successfull...");

}

const mydatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    lowercase: true,
    // uppercase: true,
    // trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is not vailid");
      }

    }
  },
  age: {
    type: Number,

    validate(value) {
      if (value < 0) {
        throw new Error("age should be only positive");
      }
    }
  },
  edu: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["btech", "bsc", "bcom", "llb", "ba"]
  },
  income: {
    type: Number,
    default: 50000
  },
  date: {
    type: Date,
    default: Date.now
  }
})


const Databasemodel = new mongoose.model('collection2', mydatabaseSchema);

const createDocument = async () => {
  try {
    // const docName1 =  new Databasemodel(
    //   {
    //     name: "ram",
    //     age: 1009,
    //     edu: "wisdom",
    //     income: 300000

    //   })

    //   const docName2 =  new Databasemodel(
    //     {
    //       name: "laksham",
    //       age: 1000,
    //       edu: "wind",
    //       income: 4000

    //     })

    const docName3 = new Databasemodel(
      {
        name: "hina m jika mjkk k  mk kkhan",
        email: "mukeshgmail.c",
        age: 700,
        edu: "btech",
        income: 400000

      })


    const result = await Databasemodel.insertMany([docName3]);
    console.log(result);

  } catch (err) {
    console.log(err);
  }
}

createDocument();

const getDocument = async () => {

  // const result = await Databasemodel.find({age: {$gt: 20}}, {name: 1}).select({age: 1}).limit(2);
  // const result = await Databasemodel.find({age: {$gt: 5}}).countDocuments();
  const result = await Databasemodel.find({ age: { $gt: 5 } }).sort({ age: -1 });
  console.log(result);

}

// getDocument();

const updateDocument = async (id) => {
  try {
    // const result = await Databasemodel.updateOne({_id: id}, {$set:{name: "MUKKU"}});
    const result = await Databasemodel.findByIdAndUpdate({ _id: id }, { $set: { name: "MUKKU-0Kumar" } }, { new: true });
    console.log(result);

  } catch (err) {
    console.log(err);
  }
}

// updateDocument("623cbfa0f51f23c9e7e0e356");

const deleteDocument = async (_id) => {
  try {
    // const result = await Databasemodel.deleteOne({_id});
    const result = await Databasemodel.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }

}

// deleteDocument("623cbfa0f51f23c9e7e0e356");