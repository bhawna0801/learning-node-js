const {
  insertUser,
  findoneUser,
  varifyUsre,
  creatUser,
  instertask,
  updateTask,
  findoneTask,
  getTask,
  deleteTask,
  getUser,
  pagination,
  shortTask,
  getUsertask,
  findUser,
} = require("../model/usre");
const { registervalidation } = require("../function/validatetion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.creatuser = async (request, response) => {
  const results = await creatUser();

  response.status(200).json({ status: true, Msg: "table created" });
};
exports.insertuser = async (request, response) => {
  const { email, password } = request.body;
  let validet = registervalidation({ email, password });

  if (validet.error) {
    return response.json({ status: false, error: error.details[0].message });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      let data = await findoneUser(email, password);

      if (data.rows.length == 1) {
        response.json({
          status: false,
          msg: "user alredy exist",
        });
      } else {
        let data = await insertUser(email, hashPassword);

        response.json({
          status: "true",
          data: data.rows,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};
exports.login = async (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    response.json({
      status: false,
      msg: "email is required",
    });
  }
  if (!password) {
    response.json({
      status: false,
      msg: "password is required",
    });
  }

  let data = await findoneUser(email, password);

  if (data.rows.length > 0) {
    let pass = data.rows[0].password;

    const hashPassword = await bcrypt.compare(password, pass);

    if (hashPassword == true) {
      let data = await varifyUsre(email, pass);

      const options = {
        expiresIn: "24h",

        audience: String(data.rows[0].id),
      };
      jwt.sign({ id: data.rows[0].id }, key, options, (err, token) => {
        if (err) {
          console.log(err);
          response.json({
            status: false,
            msg: err,
          });
        } else {
          return response
            .cookie("token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌" ,token:token});
        }
      });
    } else {
      response.json({
        status: false,
        msg: "invailid crdentional",
      });
    }
  } else {
    response.json({
      status: false,
      msg: "invailid crdentional",
    });
  }
};

exports.insertTask = async (request, response) => {
  const { name, dec, user_id } = request.body;
  if (!name) {
    response.json({
      status: false,
      msg: "name is required",
    });
  } else {
    let token;

    if (request.token) {
      token = request.token;
    }
    const data = jwt.decode(token);
    const iddd = data.aud;
    let results = await instertask(name, dec, iddd);
    response.json({
      status: "true",
      data: results.rows,
    });
  }
};

exports.updatetask = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);
  const iddd = data.aud;

  const id = request.params.id;
  let task = await findoneTask(id);
  let tname = task.rows[0].name;
  let tdec = task.rows[0].dec;
  let usre = task.rows[0].user_id;
  if (iddd != usre) {
    return response.status(401).json({
      status: false,
      msg: " Unauthorized",
    });
  }
  let { name, dec } = request.body;
  if (!name) {
    name = tname;
  }
  if (!dec) {
    dec = tdec;
  }

  let results = await updateTask(name, dec, iddd, id);

  return response.status(200).json({
    status: true,
    data: results.rows,
  });
};
exports.getTask = async (request, response) => {
  const pageno = request.query.page;
  const name = request.query.name;
  const short = request.query.short;
  const pageSize = pageno;

  const limitValue = request.query.limit || 5;
  const skipValue = limitValue * (pageSize - 1);

  let results = await pagination(limitValue, skipValue, short);

  response.json({
    status: true,
    data: results.rows,
  });
};

exports.deleteTask = async (request, response) => {
  let id = request.params.id;
  let task = await deleteTask(id);
  response.status(200).json({
    status: true,
    msg: "1 record Deleted",
  });
};
exports.getUser = async (request, response) => {
  let task = await getUser();
 // console.log({task, response});
  if(task){
   try{
  return response.json({ status: 200,data :task.rows });
  } catch(e){
    console.log(e)
  }
   }
};
exports.getUserTask = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);

  const userid = data.aud;
  let task = await getUsertask(userid);
  response.status(200).json({
    status: true,
    //data: task.rows,
  });
};
exports.me = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);

  const id = data.aud;
  let task = await findUser(id);
  response.status(200).json({
    status: true,
    // data: task.rows,
  });
};
