
function loadData( filePath ){
    //Return a promise.
    //So this function will be async
    return new Promise( resolve => {
        //This is an XHRHttpRequest
        //The documentation for the object can be found here
        //http://www.w3schools.com/ajax/ajax_xmlhttprequest_create.asp
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            //Only want to go into this block when the request is done
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //store the response of the service
                //for xhr requests use the responseText variable to get the response
                let response = xhr.responseText;

                //Use a regular expression to break the response up by new lines and then split again
                //on the comma so the result is a multidemensional array of school data
                //The regular expression can be explained as 
                // \r\n are line breaks for windows
                // \n is for line breaks on *nix systems
                //The regular expression is using an | to check in case the data is coming from a windows or unix system
                let rawSchoolData = response.split(/\r\n|\n/).map( school => school.split( ',') );
                //Get the header row and store it in a variable
                let headerRows = rawSchoolData.slice(0, 1)[0].filter( lineItem => !!lineItem );
                //the school data wont include the header row that we just stored in the variable above. 
                let schoolData = rawSchoolData.slice(1).map( school => school.slice( 0, headerRows.length));

                //Loop on the school data
                schoolData.forEach( school => {
                    //Looping on each school, incrementing by 1 as we go
                    for( var i=1; i < school.length; i++){
                        school[i] = +school[i];
                    } 
                });

                //Resolve the promise with Header Rows and School Data
                resolve( { headerRows, schoolData });
            }
        }; //This line has a semicolon

        //Here is where we open the GET request to the server. The file path is an argument that should be passed in.
        xhr.open('GET', filePath);

        //Dont send any arguments when the call is initiated
        xhr.send(null);
    });
};
