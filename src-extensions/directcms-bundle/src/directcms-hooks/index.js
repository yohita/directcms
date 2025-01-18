const express = require('express');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');

export default ({ init, filter, action,schedule},{services,database,getSchema}) => { 
	const { ItemsService } = services;

	 

	init("app.before", ({ app }) => {
		
		// Get the current working directory
		const root = process.cwd();
		app.set('view engine', 'ejs');

		app.use(expressLayouts);
		// Serve static files from the /home route
		app.use('/app', express.static(path.join(root, 'app'))); 
		app.set('views', path.join(root, '/web/views'));

		app.use('/app_assets', express.static(path.join(root, 'app/app_assets')));
		app.use('/web_assets', express.static(path.join(root, 'web/web_assets')));
		app.get('/', (req, res, next) => {
			// res.sendFile(path.join(root, 'web', 'index.html'));
			// res.render('index', {
			// 	title: 'Landing',
			// 	layout: 'layouts/layout.ejs'
			// });
			return processRequest(req, res, next);
		});
		// Custom middleware to handle /home/* routes
		app.get('/app/*', (req, res, next) => {
		const ext = path.extname(req.path);
		if (ext !== '') {
			// If it's a static file that wasn't found, pass to the next middleware (which will likely result in a 404)
			next();
		} else {
			// If it's not a static file, serve index.html from the /home directory
			res.sendFile(path.join(root, 'app','index.html'));
		}
		});

		app.get('*',  async function  (req, res, next) {
			// console.log('Request was made to: ' + req.path); 	
			// return next();
			let skip_paths=['auth','translations','api','activity','app','folders','server','admin','settings','assets','presets','flows','panels','collections','dashboards','notifications','relations','policies',
				'revisions','comments','shares','versions','directcms-api','roles','permissions','fields','items','extensions','uploads','users','files','favicon.ico'];
				if(process.env.SKIP_PATHS){
					skip_paths=skip_paths.concat(process.env.SKIP_PATHS.split(','));
				}
				//console.log('skip_paths',skip_paths,process.env);
			if (skip_paths.some((path) => req.path.startsWith('/'+path))) {
				return next();
			}
			else {
			//res.sendFile(path.join(root, 'web', 'index.html'));
			// res.render('auth-signin-basic', {
			// 	title: 'Landing',
			// 	layout: 'web/layout.ejs'
			// });
			return await processRequest(req, res, next);

			}
		  });

		 
	});
	 

	action('items.create', (input) => {
		//console.log('Creating Item!',input);
		updateGlobals(true,input);
	});

	action('items.update', (input) => {
		//console.log('Updating Item action !',input);
		updateGlobals(true,input);
	});

	async function processRequest(req, res, next) {
		console.log('Request was made to: ' + req.path);  
		if(!global.DIRECT_CMS){ await updateGlobals();}
		//console.log(global.dcms_schema);
		 
		 let slug = req.path.split('/')[1];
		 	
		 let blog_slug='';
		 let posts=[];
		 let post={};
		 if(slug=='blog'){
			// blog_slug=	req.path.split('/')[2];
			//check if blog slug exists
			if(req.path.split('/').length>2){
				blog_slug=req.path.split('/')[2];
				let tposts = await new ItemsService('posts',{schema:global.DIRECT_CMS.schema}).readByQuery({fields:["*"],filter:{status:'published',slug:blog_slug},sort:["published_at"]});
				if(tposts.length>0){
					post=tposts[0];
				}
 			} else{
				posts = await new ItemsService('posts',{schema:global.DIRECT_CMS.schema}).readByQuery({fields:["*","author.*"],filter:{status:'published'},sort:["published_at"]});
			}
		 }
		

		 

		 let pagesService = new ItemsService('pages',{schema:global.DIRECT_CMS.schema});
		 let pages = await pagesService.readByQuery({fields:["*","blocks.*","blocks.item.*.*.*"],filter:{_or:[{permalink:slug,permalink:'/'+slug}]}});
		 const page = pages.length > 0 
        ? pages[0] 
        : { title: 'Page not found', permalink: '404', blocks: [] };

		 //console.log('pages',pages);
		 
			res.render('index', {
				title: 'Landing',
				layout: 'layouts/layout.ejs',
				data:{page:page,posts:posts,post:post,navigation_items:global.DIRECT_CMS.navigation_items,globals:global.DIRECT_CMS.globals}
			});
	}

	async function updateGlobals(check_hook=false,input={collection:'xxx'}){

		if(check_hook && input){
			let check_collections =[ 'navigation','globals','pages','posts'];
			if(!check_collections.includes(input.collection)){
				console.log('updateGlobals: skipping',input.collection);
				return;
			}
			console.log('updateGlobals: updating',input.collection);
		}

		if(!global.DIRECT_CMS){ global.DIRECT_CMS={};}

		if(!global.DIRECT_CMS.schema){
			global.DIRECT_CMS.schema = await getSchema();
		 }
		 
		//navigation menu
		let navigation_itemsService = new ItemsService('navigation_items',{schema:global.DIRECT_CMS.schema});
		let globalsService = new ItemsService('globals',{schema:global.DIRECT_CMS.schema});

		let globals = await globalsService.readByQuery({fields:["*"]});
		let navigation_items = await navigation_itemsService.readByQuery({fields:["*","page.*","children.*","children.page.*"],sort:["sort"]});
		
		//group by type and save in menus menu.main and menu.footer
		navigation_items = navigation_items.reduce(function (r, a) {
			r[a.navigation] = r[a.navigation] || [];
			r[a.navigation].push(a);
			return r;
		}, Object.create(null));

		global.DIRECT_CMS.navigation_items = navigation_items;
		global.DIRECT_CMS.globals = globals[0];

		//console.log(global.DIRECT_CMS);
	}

	 
};
