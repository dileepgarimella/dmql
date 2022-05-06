const { Client } = require("pg")

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
// const connectDb = require('./routes/connection');
// const Student = require('./models/Student.model');
const cors = require('cors');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Dileep@272.",
    database: "Retail"
})

app.use(cors());
const PORT = 5000
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('UB Details!')
})


app.post('/api/data', async(req, resp) => {
    data = null
    console.log(req.body);
    client.query(`select * from products order by id limit 100`, (err, res) => {
        if (!err) {
            console.log(res);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.post('/api/retailer', async(req, resp) => {
    data = null
    console.log(req.body);
    client.query(`select * from retailer order by id`, (err, res) => {
        if (!err) {
            console.log(res);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.post('/api/search', async(req, resp) => {
    data = null
    console.log(req.body);
    client.query(`select * from products where category like '${req.body.searchparameter}%'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.post('/api/insertproduct', async(req, resp) => {
    data = req.body.productDetails
    console.log(req.body);
    client.query(`Insert into products values('${data.id}','${data.category}','${parseFloat(data.retailprice).toFixed(2)}','${data.product_vendor}','${parseFloat(data.marketprice).toFixed(2)}','${parseInt(data.product_stock)}')`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.post('/api/insertretailer', async(req, resp) => {
    data = req.body.retailerDetails
    console.log(req.body);
    client.query(`Insert into retailer values('${data.id}','${data.name}','${data.job_title}','${data.emailid}','${data.phone_num}','${data.reportsto}')`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.put('/api/updateproduct', async(req, resp) => {
    data = req.body.productDetails
    // console.log(req.body);
    // console.log(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${data.marketprice}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`)
    client.query(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${parseFloat(data.marketprice).toFixed(2)}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.put('/api/updateretailer', async(req, resp) => {
    data = req.body.retailerDetails
    console.log(req.body);
    // console.log(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${data.marketprice}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`)
    client.query(`update retailer set name='${data.name}',job_title='${(data.job_title)}',emailid='${data.emailid}',phone_num='${data.phone_num}',reportsto='${data.reportsto}' where id='${data.id}'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
}) 
app.get('/api/retailersdata', async(req, resp) => {
    data = req.body.id
    console.log(req.body);
    // console.log(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${data.marketprice}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`)
    client.query(`select id from retailers'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})

app.post('/api/deleteproduct', async(req, resp) => {
    data = req.body.id
    console.log(req.body);
    // console.log(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${data.marketprice}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`)
    client.query(`delete from products where id='${data}'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.post('/api/deleteretailer', async(req, resp) => {
    data = req.body.id
    console.log(req.body);
    // console.log(`update products set category='${data.category}',retailprice='${parseFloat(data.retailprice).toFixed(2)}',product_vendor='${data.product_vendor}',marketprice='${data.marketprice}',product_stock='${parseInt(data.product_stock)}' where id='${data.id}'`)
    client.query(`delete from retailer where id='${data}'`, (err, res) => {
        if (!err) {
            console.log(res.rows);
            data = res.rows
            resp.send(data)
        } else {
            console.log(err.message);
        }
    })
})
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
    client.connect().then(() => {
        console.log("Pg Connected");
    })
})