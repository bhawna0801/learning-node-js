const {
  creatuser,
  insertuser,
  login,
  insertTask,
  updatetask,
  getTask,
  deleteTask,
  getUser,
  getUserTask,
  me
} = require("../controller/user");
const { tokenverify } = require("../function/tokenverify");
const express = require("express");
const router = express.Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required :
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: intiger
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *               
 *                  email: user@gmail.com
 *                  password: user@123
 *
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Task:
 *              type: object
 *              required :
 *                  - name
 *                  - dec
 *              properties:
 *                  id:
 *                      type: intiger
 *                  name:
 *                      type: string
 *                  dec:
 *                      type: string
 *                  user_id:
 *                       type: intiger 
 *              example:
 *                  
 *                  name: Task name
 *                  dec: about task
 *                 
 */

 router.get("/users/User", creatuser);

/**
 * @swagger
 * /users/User:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 * 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 
 */ 
 
router.post("/users/User", insertuser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      
 *     responses:
 *         
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 
 */ 
router.post("/users/login", login);
/**
 * @swagger
/users/insertTask:
 *  post:
 *      summary: insert Task
 *      tags: [Task]
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Task'
 *      responses:
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
router.post("/users/insertTask", tokenverify, insertTask);
/**
 * @swagger
 * /users/updatetask/{id}:
 *    put:
 *      summary: Update Task
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: this is the id for Task
 *    
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Task'
 *      responses:
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
router.put("/users/updatetask/:id", tokenverify, updatetask);

/**
 * @swagger
 *  /users/getTasks:
 *   get:
 *     summary: Returns the list of all the Task
 *     tags: [Task]
 *     parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: intiger
 *              description: this is page of records
 *          - in: query
 *            name: page
 *            schema:
 *              type: intiger
 *          - in: query
 *            name: short
 *            schema:
 *              type: string
 *              description: this is short of records        
 *     responses:
 *       200:
 *         description: The list of the Task
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/users/getTasks", getTask);

/**
 * @swagger
 *  /users/getUser:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users/getUser", getUser);

router.get("/users/getUSerTask", tokenverify, getUserTask);
/**
 * @swagger
 * /users/deleteTask/{id}:
 *    delete:
 *      summary: delete Task
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: this is the id for Task
 *    
 *      responses:
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
router.delete("/users/deleteTask/:id", deleteTask);

/**
 * @swagger
 *  /users/me:
 *   get:
 *     summary: Returns  User record
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The record of the User
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users/me", tokenverify, me);
module.exports = router;
