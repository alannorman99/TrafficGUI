const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	//next forwards to next middleware unless passed an error then it forwards to an error handler
	next(error);
};

const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		//process.env.NODE_ENV makes it so stack traces aren't displayed if the app is in production
		stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
	});
};

module.exports = {
	notFound,
	errorHandler
};