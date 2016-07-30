// app port
process.env.PORT = process.env.PORT || '80';
process.env.URL = process.env.URL || 'http://localhost/';

process.env.sessionSecret = 'secret key for live now asdjaksdkansjdkasjnd';

// database credentials
process.env.DB_HOST = process.env.DB_HOST || '127.0.0.1';
process.env.DB_NAME = process.env.DB_NAME || 'live_now_local';
process.env.DB_PORT = process.env.DB_PORT || '27017';
process.env.DB_USER = process.env.DB_USER || '';
process.env.DB_PASS = process.env.DB_PASS || '';

//VK
process.env.client_id = '5563809';
process.env.scope = 'notifications';
process.env.redirect_uri = process.env.URL + 'vk/auth';
