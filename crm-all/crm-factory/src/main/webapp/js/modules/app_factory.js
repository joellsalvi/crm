app.factory('utilsFactory', function() {
    
	function getCurrentDateTime(){ 
        var d = new Date();
        var hours = d.getHours();
        if (hours<10){ hours = "0" + hours; };
        var minutes = d.getMinutes();
        if (minutes<10){ minutes = "0" + minutes; };
        var seconds = d.getSeconds();
        if (seconds<10){ seconds = "0" + seconds; };
        return getCurrentDate() + " " +hours+ ":" +minutes+ ":" +seconds;
    };
	 
	function getCurrentDate(){ 
        var d = new Date();
        var year = d.getFullYear();
        var day = d.getDate();
        if (day<10){ day = "0" + day; };
        var month = d.getMonth()+1;
        if (month<10){ month = "0" + month; };
        return year + "-" + month + "-" + day;
    };

	return {
		getCurrentDateTime		: getCurrentDateTime,
		getCurrentDate			: getCurrentDate
	};
});
