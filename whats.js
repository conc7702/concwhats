//const c = require('config');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client, Location, List, Buttons, Chat, Message, LocalAuth } = require('./node_modules/whatsapp-web.js/index');

const SESSION_FILE_PATH = './node_modules/whatsapp-web.js/session.json';


exports.iniciaClient = () => {


	
	const client = new Client({ puppeteer: { 
					headless: true,
					args: [
					      "--no-sandbox",
					      "--no-first-run",
					      "--disable-setuid-sandbox",
					      "--disable-dev-shm-usage",
					      "--disable-accelerated-2d-canvas",
					      "--disable-gpu",
					      "--single-process",
					      "--no-zygote",
					], },
					authStrategy: new LocalAuth({
					clientId: 'client-one'
					
					})
				 });
	
	client.initialize();
	
	client.on('qr', (qr) => {
    	qrcode.generate(qr, {small: true});    	
	});
	
	client.on('authenticated', (session) => {
    	console.log('AUTHENTICATED', session);
    	
	});
	
	client.on('auth_failure', msg => {
    	// Fired if session restore was unsuccessfull
    	console.error('AUTHENTICATION FAILURE', msg);
	});
	
	client.on('ready', () => {
    	client.ready = true;

    	console.log('READY');
	});
	
	client.on('change_state', state => {
    	console.log('CHANGE STATE', state );
	});
	
	client.on('disconnected', (reason) => {
    	console.log('Client was logged out', reason);
	});

	return client;

}
