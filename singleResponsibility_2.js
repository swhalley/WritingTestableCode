
//We could further improve this name now
function ProcessTheResponseBeforeReturning( response ){
    let rawSchoolData = response.split(/\r\n|\n/).map( school => school.split( ',') );
    let headerRows = rawSchoolData.slice(0, 1)[0].filter( lineItem => !!lineItem );
    let schoolData = rawSchoolData.slice(1).map( school => school.slice( 0, headerRows.length));

    schoolData.forEach( school => {
        for( var i=1; i < school.length; i++){
            school[i] = +school[i];
        }
    });

    return { headerRows, schoolData };
}

//We could improve this name too
function CreateARequestToLoadData( filePath, callback ){
    return new Promise( resolve => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                resolve( callback( xhr.responseText ) );
            }
        };

        xhr.open('GET', filePath);
        xhr.send(null);
    });
};

//Calling function
CreateARequestToLoadData( '/schoolData?id="PEI"', ProcessTheResponseBeforeReturning);
