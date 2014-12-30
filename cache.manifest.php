<?php
  header('Content-Type: text/cache-manifest; charset=UTF-8');
  
  echo 'CACHE MANIFEST';
  echo "\n";
  echo 'CACHE:';
  echo "\n";
  $oDir = new RecursiveDirectoryIterator(".");
  $sVersionHash = "";
  foreach(new RecursiveIteratorIterator($oDir) as $oFile) {
    if(use_offline($oFile)) {
      $sVersionHash .= md5_file($oFile);
      echo substr($oFile,2) . "\n";
    }
  }
  echo '# Versionhash: ' . md5($sVersionHash);

  function use_offline($oFile) {
    $aIgnoreFiles = array("cache_manifest.php");

    if($oFile->isFile() 
    && !in_array($oFile->getFilename(), $aIgnoreFiles)
    && substr($oFile->getFilename(), 0, 1) != ".") {
      return true;
    }
    return false;
  }
?>