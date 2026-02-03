<?php 
ignore_user_abort(true);
ini_set('max_execution_time', '0');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_WARNING);
error_reporting(E_ALL);


require_once '/var/www/html/trash/connection.php';

$variables = $argv;
if(count($variables) > 1) {
	$organisationID = $variables[1];
	$companyID = 0;
    if(isset($variables[2]) && $variables[2] != ''){
        $companyID = $variables[2];
    }
	if((int)$organisationID > 0) {	
       /*  $queryAssets = "SELECT assets.grant_doc_num, COUNT(apf.grant_doc_num) AS counter FROM assets LEFT JOIN db_uspto.assets_family AS apf ON apf.grant_doc_num = assets.grant_doc_num  WHERE  assets.grant_doc_num <> '' AND assets.organisation_id = ".(int)$organisationID;

        if($companyID != '' && $companyID > 0) {
            $queryAssets .= " AND assets.company_id = ".$companyID;
        }
        
        $queryAssets .= " AND date_format(assets.appno_date, '%Y') > 1999  GROUP BY assets.grant_doc_num HAVING counter = 0 "; */

        $queryAssets = "SELECT di.patent AS grant_doc_num, COUNT(apf.grant_doc_num) AS counter FROM db_new_application.dashboard_items AS di LEFT JOIN db_uspto.assets_family AS apf ON apf.grant_doc_num = di.patent  WHERE di.type IN (30, 21, 36)  AND di.patent <> '' AND di.organisation_id = ".(int)$organisationID;

        if($companyID != '' && $companyID > 0) {
            $queryAssets .= " AND di.representative_id = ".$companyID;
        }

        //$queryAssets .= "  GROUP BY di.patent HAVING counter = 0 ";
        $queryAssets .= "  GROUP BY di.patent HAVING counter = 0 ";

        echo $queryAssets;
        $resultAllAssetsList = $con->query($queryAssets);
		if($resultAllAssetsList && $resultAllAssetsList->num_rows > 0) {
            echo "TOTAL: ".$resultAllAssetsList->num_rows;
			while($rowAsset = $resultAllAssetsList->fetch_object()) {

                echo "ASSET: ".$rowAsset->grant_doc_num;
                
                echo "FINDDDDDDDD";
                $output = shell_exec('./node_modules/.bin/env-cmd node /var/www/html/script/assets_family.js "'.$rowAsset->grant_doc_num.'" > /var/www/html/log/assets_family_'.$organisationID.'.log 2>&1 &');

                print_r($output);

                echo "---------------IN SLEEPING MODE-------------";

                sleep(15); // 5 seconds sleep;
			}
		}
    }
}
