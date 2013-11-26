Natmus = (function() {

  /*
      qwest, ajax library with promises and XHR2 support

      Version     : 0.4.2
      Author      : Aurélien Delogu (dev@dreamysource.fr)
      Homepage    : https://github.com/pyrsmk/qwest
      License     : MIT
  */
  var qwest=function(){var win=window,limit=null,requests=0,request_stack=[],getXHR=function(){return win.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},version2=getXHR().responseType==="",qwest=function(method,url,data,options,before){data=data||null,options=options||{};var typeSupported=!1,xhr=getXHR(),async=options.async===undefined?!0:!!options.async,cache=!!options.cache,type=options.type?options.type.toLowerCase():"json",user=options.user||"",password=options.password||"",headers={"X-Requested-With":"XMLHttpRequest"},accepts={xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},vars="",i,parseError="parseError",serialized,success_stack=[],error_stack=[],complete_stack=[],response,success,error,func,promises={success:function(e){return async?success_stack.push(e):success&&e.apply(xhr,[response]),promises},error:function(e){return async?error_stack.push(e):error&&e.apply(xhr,[response]),promises},complete:function(e){return async?complete_stack.push(e):e.apply(xhr),promises}},promises_limit={success:function(e){return request_stack[request_stack.length-1].success.push(e),promises_limit},error:function(e){return request_stack[request_stack.length-1].error.push(e),promises_limit},complete:function(e){return request_stack[request_stack.length-1].complete.push(e),promises_limit}},handleResponse=function(){var i,req,p;--requests;if(request_stack.length){req=request_stack.shift(),p=qwest(req.method,req.url,req.data,req.options,req.before);for(i=0;func=req.success[i];++i)p.success(func);for(i=0;func=req.error[i];++i)p.error(func);for(i=0;func=req.complete[i];++i)p.complete(func)}try{if(xhr.status!=200)throw xhr.status+" ("+xhr.statusText+")";var responseText="responseText",responseXML="responseXML";if(type=="text"||type=="html")response=xhr[responseText];else if(typeSupported&&xhr.response!==undefined)response=xhr.response;else switch(type){case"json":try{win.JSON?response=win.JSON.parse(xhr[responseText]):response=eval("("+xhr[responseText]+")")}catch(e){throw"Error while parsing JSON body"}break;case"js":response=eval(xhr[responseText]);break;case"xml":if(!xhr[responseXML]||xhr[responseXML][parseError]&&xhr[responseXML][parseError].errorCode&&xhr[responseXML][parseError].reason)throw"Error while parsing XML body";response=xhr[responseXML];break;default:throw"Unsupported "+type+" type"}success=!0;if(async)for(i=0;func=success_stack[i];++i)func.apply(xhr,[response])}catch(e){error=!0,response="Request to '"+url+"' aborted: "+e;if(async)for(i=0;func=error_stack[i];++i)func.apply(xhr,[response])}if(async)for(i=0;func=complete_stack[i];++i)func.apply(xhr)};if(limit&&requests==limit)return request_stack.push({method:method,url:url,data:data,options:options,before:before,success:[],error:[],complete:[]}),promises_limit;++requests;if(win.ArrayBuffer&&(data instanceof ArrayBuffer||data instanceof Blob||data instanceof Document||data instanceof FormData))method=="GET"&&(data=null);else{var values=[],enc=encodeURIComponent;for(i in data)values.push(enc(i)+(data[i].pop?"[]":"")+"="+enc(data[i]));data=values.join("&"),serialized=!0}method=="GET"&&(vars+=data),cache||(vars&&(vars+="&"),vars+="t="+Date.now()),vars&&(url+=(/\?/.test(url)?"&":"?")+vars),xhr.open(method,url,async,user,password);if(type&&version2)try{xhr.responseType=type,typeSupported=xhr.responseType==type}catch(e){}version2?xhr.onload=handleResponse:xhr.onreadystatechange=function(){xhr.readyState==4&&handleResponse()},serialized&&method=="POST"&&(headers["Content-Type"]="application/x-www-form-urlencoded"),headers.Accept=accepts[type];for(i in headers)xhr.setRequestHeader(i,headers[i]);return before&&before.apply(xhr),xhr.send(method=="POST"?data:null),promises};return{get:function(e,t,n,r){return qwest("GET",e,t,n,r)},post:function(e,t,n,r){return qwest("POST",e,t,n,r)},xhr2:version2,limit:function(e){limit=e}}}();

  var CIP_URL = "http://samlinger.natmus.dk/";

  var session_open = function() {
    qwest.get(CIP_URL + "CIP/session/open")
         .success(function(response) {
             console.log(response);
         })
         .error(function(response) {
             console.log(response);
         });
  }

  var search = function() {
    qwest.get(CIP_URL + "CIP/metadata/search/mycatalog/myfields?quicksearchstring=zebra");
  }


  return {
    search: search,
    session_open: session_open
  };
})();
