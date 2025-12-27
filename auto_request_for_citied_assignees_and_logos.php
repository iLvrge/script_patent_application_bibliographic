<?php 

require_once('/var/www/html/trash/vendor/autoload.php');
require_once('/var/www/html/trash/noti_config.php');
ignore_user_abort(true);
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 0);
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL); 
/*ignore_user_abort(true);*/
ini_set('xdebug.max_nesting_level', 1000); 
$host = getenv('DB_HOST');
$user = getenv('DB_USER'); 
$password = getenv('DB_PASSWORD');
$dbUSPTO = getenv('DB_USPTO_DB');
$dbBusiness = getenv('DB_BUSINESS');
$dbApplication = getenv('DB_APPLICATION_DB');
$con = new mysqli($host, $user, $password, $dbUSPTO);
$con->query('SET GLOBAL range_optimizer_max_mem_size=0');
$con->query('SET global internal_tmp_mem_storage_engine=Memory;');


$query = "SELECT organisation_id FROM ".$dbBusiness.".organisation ORDER BY organisation_id DESC";

$resultOrganisation = $con->query($query);
            
if($resultOrganisation && $resultOrganisation->num_rows > 0) {
    while($row = $resultOrganisation->fetch_object()) {
        echo 'node /var/www/html/script/retrieve_cited_patents_assignees.js '.$row->organisation_id.' ""<br/>';
        exec('node /var/www/html/script/retrieve_cited_patents_assignees.js '.$row->organisation_id.' ""');
        echo 'node /var/www/html/script/name_to_domain_api.js '.$row->organisation_id.' "rapidapi", "", 0<br/>';
        exec('node /var/www/html/script/name_to_domain_api.js '.$row->organisation_id.' "rapidapi", "", 0');
    }
}