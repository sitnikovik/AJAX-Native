class Ajax
{
    /*
        * @version: 1.2
        * @author: Ilya Sitnikov
    */

    constructor(url, post="", handle="" )
    {
        this.doing = false;
        this.connection = this.connect();
        if (!this.connection) return false;

        if (url === undefined || url == "" || !url)
        {
            this.connection.abort();
            return false;
        }

        this.url = url;

        if (post != "") // if there are post data
        {
          this.method = "POST";
          this.post = post;
        }

        else this.method = "GET";
        if (handle != "" && typeof(handle) == "object") {
            this.do(handle); //  if the event listenter is not declared then execute at initializtion  
        }

        
    }

    connect()
    {
        let connection = false;

        if (window.XMLHttpRequest) {
          connection = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) // если IE
        {
            try
            {
                connection = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (CatchException)
            {
                connection = new ActiveXObject("Msxml2.XMLHTTP");
            }
        }

        if (!connection) alert("Невозможно создать XMLHttpRequest");
        return connection;
    }

    do(handle)
    {
      let method = this.method;
      let url = this.url;
 
      //initializing the new link at now request resending
      if (this.doing)
      {
        console.log(this.connection.readyState );
        this.connection.abort();
        if(this.connect() !== false) this.do();
      } 

      this.connection.open(method, url, true);
      // for server understanding that it is 100% ajax req
      this.connection.setRequestHeader('X-Requested-With','XMLHttpRequest');

        /* 
        https://developer.mozilla.org/ru/docs/Web/HTTP/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8/Accept
        */
        //this.connection.setRequestHeader ("Accept", "text/html"); 
        
        // Hack to send bites without change
        this.connection.overrideMimeType('text/html');

        // if (handle.dataType !== undefined && handle.dataType !== false)
        // {
        //     if (handle.dataType.toLowerCase() == "text") this.connection.setRequestHeader("Content-Type","text/plain; charset=utf-8");
        //     else if (handle.dataType.toLowerCase() == "html" ) this.connection.setRequestHeader("Content-Type","text/html; charset=utf-8");
        //     else if (handle.dataType.toLowerCase() == "xml") this.connection.setRequestHeader("Content-Type","application/xml; charset=utf-8");
        // }
        // else  this.connection.setRequestHeader("Content-Type","application/json; charset=utf-8");

      // Set header
      if (method == "POST" || method == "post")
      {
        // this.connection.setRequestHeader('Content-Type', 'multipart/form-data; boundary=-------------573cf973d5228');
        this.connection.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // WARNING! This shit may reset charset. SUCK
        this.connection.send(this.post);
      }
      else this.connection.send(null); // If it is GET req - send null-req
          
          
      this.doing = true; // abort flag
      // -------------------------------------------------

      //--------------------------------------
      // the handling the request status changes
      //--------------------------------------
      let connection = this.connection;
      let thiS = this;
      this.connection.onreadystatechange = function()
      {
          // do something before executing 
          if (handle.ahead !== '' && handle.ahead !== undefined && handle.ahead !== false && typeof(handle.ahead) == "function")  handle.ahead();

          // do always
          if (handle.always !== '' && handle.always !== undefined && handle.always !== false && typeof(handle.always) == "function" )  handle.always();

          // req is done
          if (connection.readyState == 4)
          {
              // ok
              if (connection.status == 200){ // do what we saing
                  if (handle.success !== '' && handle.success !== undefined && handle.success !== false && typeof(handle.success) == "function") handle.success();
              }
              else // handle error
              {
                if (handle.error != '' && handle.error !== undefined && handle.error !== false && typeof(handle.error) == "function") handle.error();
              }
              thiS.doing = false;
              connection.abort();
          }

        }

    }


}

