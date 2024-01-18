
$.response.contentType = "application/json";
var query = "";
var rs = "";
var successBody = "{message:Time Dimensional Data Generated successfully}";
var errorBody = "{message:Time Dimensional Data not generated}";
try{
	var connection = await $.hdb.getConnection();
	query = "SELECT CURRENT_SCHEMA FROM \"DUMMY\""; 
	rs = await connection.executeQuery(query);
	var currentSchema = rs[0].CURRENT_SCHEMA;
	
	//selecting current year
	query = 'SELECT YEAR(CURRENT_DATE) as CURRENT_YEAR FROM DUMMY';
	rs = await connection.executeQuery(query);
	var currentYear = rs[0].CURRENT_YEAR;
	
	query = 'MDX UPDATE TIME DIMENSION HOUR 2017 '+currentYear+' MONDAY TARGET_TABLE \"Core.SHINE_TIME_DIM\" TARGET_SCHEMA "'+currentSchema+'"';
	rs = await connection.executeQuery(query);
	await connection.commit();
	await connection.close();
	$.response.status = $.net.http.OK;
	await $.response.setBody(JSON.stringify(successBody));
}catch(e){
	console.log(e);
	await connection.close();
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	await $.response.setBody(JSON.stringify(errorBody));
}
export default {query,rs,successBody,errorBody};