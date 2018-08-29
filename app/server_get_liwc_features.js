const Nightmare = require('nightmare')
var url = require('url')
var http = require('http')

function get_LIWC_features(text){ 
          nightmare = Nightmare({ show: false })
          return nightmare
                      .goto('https://liwc.wpengine.com/')
                      .insert('textarea.liwcdemo', text)
                      .click('input.btn')
                      .wait('table.results')
                      .evaluate(() =>{
                           var d = document.querySelectorAll('tr')

                           var dict = {}
                           for (i=0; i < d.length; i++){
                               if (i != 0 & i!= 6){
                                   td = d[i].getElementsByTagName("td")
                                   key = "" + td[1].innerHTML 
                                   value = "" + td[2].innerHTML
                                   dict[key] = value
                               }
                           }

                           return dict    
                       })
                      .end()
                      .catch(error => {
                        console.error('Search failed:', error)
                      })
   
}

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    var text = q.text
    
    
   var get_liwc = () => {
        var promise = get_LIWC_features(text)
        var promise_main = Promise.resolve(promise)
        
        promise_main
                   .then(result =>{
                                    res.write(JSON.stringify(result));
                                    res.end();
                                    console.log(result);
                        })      
                   
       }
   
   get_liwc()
    
    
  
}).listen(8877);





