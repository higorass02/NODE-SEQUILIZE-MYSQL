const express = require('express');
const app = express();
const models = require("./models/");
const Order = models.Order;
const OrderItem = models.OrderItem;
const User = models.User;
const Product = models.Product;

app.use(express.json());

app.get('/', (req,resp)=>{
	resp.send('ok');
});

app.listen(8080,()=>{
	console.log('OLÁ MUNDO!');
});

app.post("/orders", (req,resp)=>{
	Order.create(req.body, {include:[OrderItem]}).then( o => { 
		resp.send(o.dataValues);
	});
});

app.get("/orders/:id", (req,resp)=>{
	Order.findByPk(req.params.id, {
		include: [User, {association: Order.OrderItems, include: [OrderItem.Product] }] 
		}).then( r => {
			resp.send(r.dataValues)
		}) 
});


app.put("/orders/:id", (req,resp)=>{
	Order.findByPk(req.params.id).then( o => { 
		o.update(req.body).then( o2 => {
			resp.send(o2.dataValues)
		})
	})
});