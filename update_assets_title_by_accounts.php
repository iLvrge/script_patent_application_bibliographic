<?php 

ini_set('max_execution_time', '0');
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$dbUSPTO = getenv('DB_USPTO_DB');
$dbBusiness = getenv('DB_BUSINESS');
$dbApplication = 'db_new_application';
$con = new mysqli($host, $user, $password, $dbApplication);
 

$queryOrganisation = "SELECT application, patent FROM db_new_application.dashboard_items WHERE type = 31 AND organisation_id = 216 GROUP BY application";
		
echo $queryOrganisation."<br/>";
$resultOrg = $con->query($queryOrganisation);
//echo $resultOrg->num_rows."<br/>";

if($resultOrg && $resultOrg->num_rows > 0) {	
	while($row = $resultOrg->fetch_object()) { 
		//exec('php -f /var/www/html/trash/create_data_for_company_db_application.php "'.$row->organisation_id.'" ""');
        $queryPublication = "Select file_name from db_patent_grant_bibliographic.application_publication 
        where (title IS NULL OR title = '') AND appno_doc_num = '".$row->application."'";
        echo $queryPublication;
        $resultPub = $con->query($queryPublication);
        if($resultPub && $resultPub->num_rows > 0) {	
            $rowPub = $resultPub->fetch_object();
            print_r($rowPub); 
            if($rowPub->file_name != '' && $rowPub->file_name != null) {
                $fileName = str_replace('.XML', '', $rowPub->file_name);
                echo 'node /var/www/html/script/update_application_title.js '.$fileName;
                exec('./node_modules/.bin/env-cmd node /var/www/html/script/update_application_title.js '.$fileName, $output, $return); 
                print_r($output); 
            }
        }

        $queryGrant = "Select file_name from db_patent_application_bibliographic.application_grant
        where (title IS NULL OR title = '') AND appno_doc_num = '".$row->application."'";
        $resultGrant = $con->query($queryGrant);
        if($resultGrant && $resultGrant->num_rows > 0) {	
            $rowGrant = $resultGrant->fetch_object();
            print_r($rowGrant); 
            if($rowGrant->file_name != '' && $rowGrant->file_name != null) { 
                $fileName = str_replace('.XML', '', $rowGrant->file_name);
                echo 'node /var/www/html/script/update_application_title.js '.$fileName;
                exec('./node_modules/.bin/env-cmd node /var/www/html/script/update_grant_title.js '.$fileName, $output1, $return1); 
                print_r($output1); 
            }
        } 
	}
}