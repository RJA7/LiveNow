// app port
process.env.PORT = process.env.PORT || '8080';
process.env.URL = process.env.URL || 'http://localhost/';

process.env.sessionSecret = 'secret key for live now asdjaksdkansjdkasjnd';

//VK
process.env.client_id = '5563809';
process.env.scope = 'notifications';
process.env.redirect_uri = process.env.URL + 'vk/auth';
