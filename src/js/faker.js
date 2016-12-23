var root = 'https://jsonplaceholder.typicode.com';


module.exports = {
  json : function () {

      return new Promise((function (resolve, reject) {
          var oReq = new XMLHttpRequest();
          oReq.addEventListener("load", function (response) {
              resolve(JSON.parse(this.responseText));
          });
          oReq.open("GET", root + '/posts');
          oReq.send();
      }));
  }
};

