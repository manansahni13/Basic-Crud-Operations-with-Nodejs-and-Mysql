const mysql=require('mysql');
const express=require('express');

const app=express();

const bodyparser=require('body-parser');
var jsonParser = bodyparser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: false })

// app.use(bodyparser.json);

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employee'
})

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("Successful");
        app.listen(8082,()=> console.log("Started server at 8082"));
    }
    else{
    console.log("DB connection failed "+ JSON.stringify(err,undefined,2));
    }
})



app.get('/',(req,res)=>{

    res.send("Hello lets start our crud operations");
    })

//Get all employees
app.get('/employees',(req,res)=>{

    mysqlConnection.query("Select * from employee",(err,rows,fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Get an employees
app.get('/employee/:id',(req,res)=>{

    mysqlConnection.query("Select * from employee where empid= ?",[req.params.id],(err,rows,fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Delete an employees
app.delete('/employee/:id',(req,res)=>{

    mysqlConnection.query("Delete from employee where empid= ?",[req.params.id],(err,rows,fields)=>{
        if (!err){
            res.send("Deleted rows no "+req.params.id);
        }
        else{
            console.log(err);
        }
    })
})

//Add an employee
app.post('/add',jsonParser,(req,res)=>{
    let sql = "INSERT INTO employee SET ?";   
        mysqlConnection.query(sql,[req.body],(err,rows,fields)=>{
            if (!err){
                res.send("Succesfully inserted");
            }
            else{
                console.log(err);
            }
        })
})

//Edit an employee
app.put('/edit/:id',jsonParser,(req,res)=>{
    let variable=[req.body, req.params.id]
      
        mysqlConnection.query('UPDATE employee SET ?  WHERE empid = ?', variable,(err,rows,fields)=>{
            if (!err){
                res.send("Updated Succesfully");
            }
            else{
                console.log(err);
            }
        })
})
