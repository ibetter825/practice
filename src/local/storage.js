//本地存储api
/**
 * localStorage
 * key
 * value == null 删除
 */
let local = function(key, value) {
    let storage = window.localStorage
        //如果浏览器不支持localStorage存到Cookie中
        //...
        //如果value未定义则为获取key对应的值
    if (value === undefined)
        return storage.getItem(key)
    else //反之则为设置或修改值或添加值或删除值
        value === null ? storage.removeItem(key) : storage.setItem(key, value)
};

/**
 * sessionStorage
 * key
 * value == null 删除
 */
let session = function(key, value) {
    let storage = window.sessionStorage
        //如果浏览器不支持localStorage存到Cookie中
        //...
        //如果value未定义则为获取key对应的值
    if (value === undefined)
        return storage.getItem(key)
    else //反之则为设置或修改值或添加值或删除值
        value === null ? storage.removeItem(key) : storage.setItem(key, value)
};

/**
 * cookie
 * key
 * days 过期天数
 * value 值
 * opt 'del' 删除
 */
let cookie = function(key, value, days) {
    if (value === undefined && document.cookie.length > 0) { //获取cookie
        let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2])
        else
            return null
    } else {
        let exdate = new Date();
        if (value === null) {
            exdate.setTime(exdate.getTime() - 1);
            let cval = cookie(key);
            if (cval != null)
                document.cookie = key + "=" + cval + ";expires=" + exdate.toGMTString();
        } else {
            exdate.setDate(exdate.getDate() + days ? days : 0)
            document.cookie = key + "=" + escape(value) +
                (days ? "" : ";expires=" + exdate.toGMTString())
        }
    }
};

/**
 * IndexedDB
 */
let indexedDB = function(dbName, dbVersion) {
    //window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!this.inDB) {
        console.log("你的浏览器不支持IndexedDB");
        return;
    }
    this.dbName = dbName; //数据库名称
    this.dbVersion = dbVersion === undefined ? 1 : dbVersion; //数据库版本
    //第一个参数是数据库的名称，第二个参数是数据库的版本号。版本号可以在升级数据库时用来调整数据库结构和数据
    this.request;
    this.db; //db对象
    this.tbName; //表名
    this.tbPk; //表的主键
    //打开或创建一个对象存储空间
    this.open = (_tbName, _keyPath) => {
        this.tbName = _tbName;
        this.tbPk = _keyPath;
        this.request = this.inDB.open(this.dbName, this.dbVersion); //"practiceDB", 1
        this.request.onerror = (event) => {
            console.log("打开DB失败", event);
        }
        this.request.onupgradeneeded = (event) => {
            console.log("Upgrading");
            this.db = event.target.result;
            //if (callback) callback(); //回掉函数
            let objectStore = this.db.createObjectStore(_tbName, { keyPath: _keyPath }); //"practices", { keyPath: "no"  'no'字段编号为主键
            // 创建一个索引来通过 no 搜索客户。
            // 不会有重复的，因此使用 unique 索引。
            objectStore.createIndex(_keyPath, _keyPath, { unique: true });
        };
        this.request.onsuccess = (event) => {
            console.log("成功打开DB");
            this.db = event.target.result;
        };
    };

    //新增
    //为了往数据库里新增数据，我们首先需要创建一个事务，并要求具有读写权限。在indexedDB里任何的存取对象的操作都需要放在事务里执行。
    this.add = (obj) => {
        let transaction = this.db.transaction([this.tbName], "readwrite");
        transaction.oncomplete = function(event) {
            console.log("Success");
        };
        transaction.onerror = function(event) {
            console.log("Error");
        };
        let objectStore = transaction.objectStore(this.tbName);
        objectStore.add(obj); //{ no: 1, title: '第一题' }
    };

    //删除
    //删除跟新增一样，需要创建事务，然后调用删除接口，通过key删除对象。
    this.delete = (key) => {
        this.db.transaction([this.tbName], "readwrite").objectStore(this.tbName).delete(key); //no
    };

    //查询
    this.select = (key, callback) => {
        let request = this.db.transaction([this.tbName], "readwrite").objectStore(this.tbName).get(key); //no
        request.onsuccess = function(event) {
            console.log("Title : " + request.result.title);
            if (callback)
                callback(request.result);
        };
    }

    //修改
    this.update = (key, obj) => {
        let transaction = this.db.transaction([this.tbName], "readwrite");
        let objectStore = transaction.objectStore(this.tbName);
        let request = objectStore.get(key); //获取该对象
        request.onsuccess = function(event) {
            //console.log("Updating : " + request.result.title + " to " + '第一题修改后');
            //request.result.title = '第一题修改后';
            //objectStore.put(request.result);
            objectStore.put(obj);
        };
    }

}
export default {
    $local: function(key, value) {
        return local(key, value)
    },
    $session: function(key, value) {
        return session(key, value)
    },
    $cookie: function(key, value, days) {
        return cookie(key, value, days)
    },
    $indexedDB: function(dbName, dbVersion) {
        return new indexedDB(dbName, dbVersion);
    }
}