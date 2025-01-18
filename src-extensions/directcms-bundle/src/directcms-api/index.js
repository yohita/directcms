export default (router,{services,database}) => {
	const { ItemsService } = services;


	router.get('/', (req, res) => res.send('Hello, World!'));
	router.get('/su', async (req, res) => {
		global.dcms_schema=req.schema;
	});

	router.get('/prepare-before-release', async (req, res) => {
		//delete logo dark and logo from globals
		let gp = await database('globals').update({logo_dark_mode:null,logo:null});
		res.send({data:gp});
	});

	router.get('/product-list-item-service-api-test', async (req, res) => {
		//access the products using ItemService
		//this will trigger all flows and hooks attached to this collection

		let productsService = new ItemsService('products',{schema:req.schema,accountability:req.accountability});
		//filter documentation
		//fields is array of fields to return can be * for all
		//for foreign fields use supplier.* to get all fields from supplier of product
		
		let products = await productsService.readByQuery({fields:["id","name"],filter:{}});
		res.send({data:products});

	});

};
