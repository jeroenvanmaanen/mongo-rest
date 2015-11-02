# mongo-rest
Docker container for mongodb sharing via http rest (CROSS ORIGIN)

# Server usage options

	ME_CONFIG_DBSTRING = mongodb://user:password@host:port/database
	ME_CONFIG_READONLY = y  
	ME_CONFIG_APIKEY = apirequestkey
	ME_CONFIG_ROOTURL = /api/
	
	Default application port is 3000, nobody cares, because it work inside of docker container
	
# Rest API (uses [express-mongo-rest](https://github.com/pbatey/express-mongo-rest))

limit , offset , sort options (via [query-to-mongo](https://www.npmjs.com/package/query-to-mongo))

| Route            | Method | Notes                       |
| ---------------- | ------ | --------------------------- |
| /:collection     | GET    | Search the collection (uses [query-to-mongo](https://www.npmjs.com/package/query-to-mongo)) |
| /:collection     | POST   | Create a single document    |
| /:collection     | PUT    | Method Not Allowed          |
| /:collection     | PATCH  | Method Not Allowed          |
| /:collection     | DELETE | Remove all documents        |
| /:collection/:id | GET    | Retrieve a single document  |
| /:collection/:id | POST   | Method Not Allowed          |
| /:collection/:id | PUT    | Create or update a document |
| /:collection/:id | PATCH  | Update fields in a document (uses [jsonpatch-to-mongodb](https://www.npmjs.com/package/jsonpatch-to-mongodb)) |
| /:collection/:id | DELETE | Remove a single document    |


# Examples 

Retreiving records example :
```
$.getJSON('http://server:3000/api/test/?apiKey=qwerty')
```

Creating records example :
```
$.ajax({ 
  type: 'POST', // server not ME_CONFIG_READONLY 
  url: 'http://server:3000/api/test/?apiKey=qwerty', // if ME_CONFIG_APIKEY enabled 
  contentType: 'application/json',
  data: JSON.stringify({hello : "world"})});
```

# Executing Docker's container example 

```
docker run -p 3000:3000 -e ME_CONFIG_DBSTRING="mongodb://user:password@host:port/database" -d linuxenko/mongo-rest
```

```
docker run -p 3000:3000 -e ME_CONFIG_APIKEY=qwerty -e ME_CONFIG_DBSTRING="mongodb://user:password@host:port/database" -d linuxenko/mongo-rest
```

available options:
```
        ME_CONFIG_DBSTRING = (default localhost or --linked mongo without authentication, db - test)
	ME_CONFIG_READONLY = (default read-write)
	ME_CONFIG_APIKEY = (default without key)
	ME_CONFIG_ROOTURL  = (default /api/)
```
