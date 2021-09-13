### Installation

Download the package and include **Ajax.js** file to your project.

### How it works

You only have to include this code with your parametrs in your JavaSript file.

```markdown
// ### Arguments
// 1. url = "" (your request url)
// 2. post = [] (POST data could be empty. Then it will be GET request.
// If you need POST then you should serialize form data.)
// 3. handle = {} (You may to handle events ahead (it's on before), always, success, error.
// The value of object paramets is function to do)

// Call response text with **var**.connection.responseText

let get = new Ajax(, "", {
	ahead   : function() {
		console.log("Start AJAX request");
	}
	success : function(){
		console.log("AJAX request is done successfully");
		console.log(get.connection.responseText);
	}
	error   : function() 
		alert("Ajax request have not done!");
		console.error(get.connection.responseText);
	}
})
```
