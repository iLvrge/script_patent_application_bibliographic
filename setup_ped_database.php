<?php 
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 0);
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); error_reporting(E_ALL); 
/*ignore_user_abort(true);*/
ini_set("log_errors", 1);
ini_set("error_log", "/var/www/html/trash/daily_file.log");

ini_set('xdebug.max_nesting_level', 1000);
$host = getenv('DB_HOST');
$user = getenv('DB_USER'); 
$password = getenv('DB_PASSWORD');
$dbUSPTO = getenv('DB_USPTO_DB');
$dbBusiness = getenv('DB_BUSINESS');
$dbApplication = getenv('DB_APPLICATION_DB');
$dbPED = 'db_patent_examiner_data';
$con = new mysqli($host, $user, $password, $dbUSPTO);

 


/* $query = 'SELECT applicant_and_inventor_id, name FROM db_patent_examiner_data.applicant_and_inventor WHERE type = 0';
$resultInventor = $con->query($query);			
if($resultInventor && $resultInventor->num_rows > 0) { 
    while($inventor = $resultInventor->fetch_object()){
        $queryUPDATEInventor = "UPDATE db_patent_examiner_data.application_inventor SET applicant_inventor_id = $inventor->applicant_and_inventor_id  WHERE name = '".$con->real_escape_string($inventor->name)."'"; 
        $con->query($queryUPDATEInventor); 
    }
}*/

/* $query = 'SELECT applicant_and_inventor_id, name FROM db_patent_examiner_data.applicant_and_inventor ';
$resultApplicant = $con->query($query);			
if($resultApplicant && $resultApplicant->num_rows > 0) { 
    while($applicant = $resultApplicant->fetch_object()){
        $queryUPDATEApplicant = "UPDATE db_patent_examiner_data.application_applicant SET applicant_inventor_id = $applicant->applicant_and_inventor_id  WHERE applicant_inventor_id = 0 AND name = '".$con->real_escape_string($applicant->name)."'"; 
        $con->query($queryUPDATEApplicant);
    }
}  */

/* $query = 'INSERT IGNORE INTO db_uspto.law_firm(name, instances) SELECT name, count(name) AS instances FROM db_patent_examiner_data.application_correspondence GROUP BY name';
$con->query($query); */
$con->query('UPDATE db_patent_examiner_data.application_correspondence SET name = REPLACE(name, "&amp;", "&")') ;

/* $query = 'SELECT law_firm_id, name FROM db_uspto.law_firm ';
$resultCorrespondence = $con->query($query);	 
if($resultCorrespondence && $resultCorrespondence->num_rows > 0) { 
    while($lawfirm = $resultCorrespondence->fetch_object()){
        $queryUPDATELawfirm = "UPDATE db_patent_examiner_data.application_correspondence SET law_firm_id = $lawfirm->law_firm_id  WHERE law_firm_id = 0 AND name = '".$con->real_escape_string($lawfirm->name)."'"; 
        $con->query($queryUPDATELawfirm); 
    }
}  */



/**
 * Inventors
 */ 
/* $query = 'SELECT name  FROM application_inventor WHERE applicant_inventor_id = 0 GROUP BY name';
$resultInventor = $con->query($query);			
if($resultInventor && $resultInventor->num_rows > 0) { 
    while($inventor = $resultInventor->fetch_object()){
        $queryName = "SELECT name, instances, applicant_inventor_id FROM applicant_and_inventor WHERE name = '".$con->real_escape_string($inventor->name)."'";
        $result = $con->query($queryName);	 
        if($result && $result->num_rows > 0) { 
            $row = $result->fetch_object();
            $queryUPDATE = "UPDATE applicant_and_inventor SET instances = instances + 1 WHERE applicant_inventor_id = ".$row->applicant_inventor_id;
            $queryUPDATEInventor = "UPDATE application_inventor SET applicant_inventor_id = $row->applicant_inventor_id  WHERE name = '".$con->real_escape_string($inventor->name)."'"; 
            $con->query($queryUPDATEInventor);	 
        } else { 
            $queryNameCounter = "SELECT name, COUNT(*) AS instances  FROM application_inventor WHERE name = '".$con->real_escape_string($inventor->name)."'";
            $resultCounter = $con->query($queryNameCounter);	
            if($resultCounter && $resultCounter->num_rows > 0) { 
                $rowCounter = $resultCounter->fetch_object();
                $queryInsert = "INSERT IGNORE INTO applicant_and_inventor (name, instances) VALUES ('".$con->real_escape_string($inventor->name)."', ".$rowCounter->instances.")";
                $con->query($queryInsert);	
                if($con->insert_id > 0) {
                    $queryUPDATEInventor = "UPDATE application_inventor SET applicant_inventor_id = $con->insert_id  WHERE name = '".$con->real_escape_string($inventor->name)."'";
                    $con->query($queryUPDATEInventor);	 
                }
            }  
        }
    }
}  */