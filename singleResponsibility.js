function loadData( filePath ){
    return new Promise( resolve => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let response = xhr.responseText;

                let rawSchoolData = response.split(/\r\n|\n/).map( school => school.split( ',') );
                let headerRows = rawSchoolData.slice(0, 1)[0].filter( lineItem => !!lineItem );
                let schoolData = rawSchoolData.slice(1).map( school => school.slice( 0, headerRows.length));

                schoolData.forEach( school => {
                    for( var i=1; i < school.length; i++){
                        school[i] = +school[i];
                    }
                });

                resolve( { headerRows, schoolData });
            }
        };

        xhr.open('GET', filePath);
        xhr.send(null);
    });
};
