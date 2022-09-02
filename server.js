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
