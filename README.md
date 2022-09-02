# Memcached

I was looking for the redis alternative and found that memcahced is one of the them. So instead of looking other alternative, I just checked the memcahced and feel that it's a good alternative for simple in-memory key value store operations. And during this researching process I found one very interesting crash course on Memcached architecture [video](https://www.youtube.com/watch?v=NCePGsRZFus) from the [Hussein Nasser youtube channel](https://www.youtube.com/c/HusseinNasser-software-engineering) which explain everything in detail its pros and cons. I highly recommend this [channel](https://www.youtube.com/c/HusseinNasser-software-engineering), you will get lots of information related to software engineering, databases etc. Basically What I am trying to explain in this article is basically taken from that [video](https://www.youtube.com/watch?v=NCePGsRZFus).

so first question is what is Memcahced? The answer according to [Memcached website](https://www.memcached.org/),

> "**Free & open source, high-performance, distributed memory object caching system**, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.  
> <br /> Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering."

Instead of going into theory about memcached, it is better to watch the [video](https://www.youtube.com/watch?v=NCePGsRZFus), I will directly implement it in the nodejs, and try to understand how it works with simple example.

Before writing the code, we need to start memcached server, and docker is the best option for us to start a simple server. I assume that docker is available on your machine. I am using ubuntu 22.04 and ideally it should work on other operating systems as well.

First step is to start server with docker using the following command on terminal

```bash
$ docker run --name memcachedserver -p 11211:11211 -d memcached
```

and we will have the memcachedserver running on port 11211. We can see that if docker is running or not using the following command

```bash
$ docker ps
```

Now as our memcached server is ready we can use it, and we will access it using nodejs. I assume that you have nodejs installed on your machine.

we create a folder named MamcachedCrashCourse

```bash
$ mkdir MamcachedCrashCourse
$ cd MamcachedCrashCourse
```

once folder is created, we will run the following command to start our project, and install required packages.

```bash
$ npm init -y
$ npm install memcached
```

once packages are installed, we will create a new file with name index.js using following command

```bash
$ touch index.js
```

and write the following lines in index.js

```js
const os = require("os");
const MEMCACHED = require("memcached");
const serverPool = new MEMCACHED([`${os.hostname()}:11211`]);

const write = () => {
  // writing to the memcached server
  serverPool.set("foo", "bar", 3600, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

// we first write the data to the memcached server
write();

const read = () => {
  // read the data from the memcached server
  serverPool.get("foo", (error, data) => {
    if (error) {
      console.log(error);
    }
    console.log(data);
  });
};

// After writing we will read the data from the memcached server
read();
```

In the code above we first bring the packages, which are os and memcached, and then we connected to the cluster which is connected to the hostname:11211

```bash
const serverPool = new MEMCACHED([`${os.hostname()}:11211`]);
```

The write function write bar value to the foo key to the memcached server, while read function read the foo key and subsequently we will have bar value. Running the index.js file using the following command

```bash
$ node index.js
```

we will have the output bar.

Hope this simple example, will show how to use memcached in our nodejs application without any additional configuration.
