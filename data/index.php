<?php

$user = trim($_GET['username']);

if(!$user){ $user = "r00tdan"; }

$url = "http://ws.audioscrobbler.com/2.0/?method=library.gettracks&api_key=2e12b69187474d8792e177c9a3267b9b&user=" . $user . "&limit=8";
$xml = simplexml_load_file($url);

if (!$xml) 
{
	
	echo "Sorry, I couldn't get any data!";
	exit;
	
} 
	else 
{


	$xml_tracks = $xml->tracks;
	$json_tracks = array();
	
	foreach($xml_tracks->track as $track) {
		
		$artist = $track->artist->name;
		$title = $track->name;
		$album = $track->album->name;
		$artwork = $track->image[2];
		$playcount = $track->playcount;
		$url = $track->artist->url;
		
		$track_arr = array(	"artist" => (string)$artist, 
							"title" => (string)$title, 
							"album" => (string)$album, 
							"artwork" => (string)$artwork, 
							"playcount" => (string)$playcount, 
							"url" => (string)$url);
		
		array_push($json_tracks,$track_arr);		

	}
	
	echo json_encode($json_tracks);

}


?>