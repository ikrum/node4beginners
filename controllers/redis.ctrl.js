var redis = require('redis');

var client = redis.createClient();
client.on('connect', function() {
    console.log('Redis connected');
});

exports.storeResponse = function(key,data, expire){
	 expire = expire || 300; // 5 minuite , 5*60 = 300 seconds
    if(typeof data != "string");
		data = JSON.stringify(obj);

		client.set(key, data);
		client.expire(key, expire);
	}
}


exports.getData = function(keys, callback){
	// get data for fixed/single id
	if(typeof keys == "string")
		return client.get(keys, callback);

  if(!Array.isArray(keys))
    return callback("Invalid keys");

	client.mget(keys, callback);
}

exports.remove = function(key){
	client.del(key, function(err, reply) {

  });
}
