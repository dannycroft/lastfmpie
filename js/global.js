(function($) {
	
	
	var music;
	var r;
    		

		legend_titles = [];
		legend_plays = [];
		legend_links = [];
		
		
		process = {


			tracks: function(track) {
	        
				if (track) {
	            
					$.each(track, function(i, item) {

						legend_titles.push('%% ' + item.artist + ' - ' + item.title);
						legend_plays.push(parseInt(item.playcount));
						legend_links.push(item.url);
    
					});

				} 

				process.piechart();
				//process.barchart();
	
			},
	
	
			piechart: function() {
			
					
				r = Raphael("chart");
				
				r.g.txtattr.font = "12px 'Copse', arial, serif";		
				r.g.text(264, 60, "Top Played Last.fm Tracks").attr({
					"font-size": 20
				});
				
				
				var pie = r.g.piechart(260, 300, 200, legend_plays, {
					legend: legend_titles,
					legendpos: "east",
					href: legend_links
				});
				
				pie.hover(function() {
					this.sector.stop();
					this.sector.scale(1.1, 1.1, this.cx, this.cy);
					if (this.label) {
						this.label[0].stop();
						this.label[0].scale(1.5);
						this.label[1].attr({
							"font-weight": 800
						});
					}
				}, function() {
					this.sector.animate({
						scale: [1, 1, this.cx, this.cy]
					}, 500, "bounce");
 					if (this.label) {
						this.label[0].animate({
							scale: 1
						}, 500, "bounce");
						this.label[1].attr({
							"font-weight": 400
						});
					}
				});
			
			},
	        
	        
	        
			barchart: function() {
	
				var r = Raphael("chart"),
	
					pcountin = function() {
						this.flag = r.g.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
					},
					pcountout = function() {
						this.flag.animate({
							opacity: 0
						}, 300, function() {
							this.remove();
						});
					};
	
				r.g.txtattr.font = "12px 'Copse', arial, serif";
				r.g.text(160, 10, "Top 10 Last.fm Tracks");
				r.g.barchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10]]).hover(pcountin, pcountout);
	
	        }
	 
        

	 };
 
 
	$("form").live('submit', function(){
		init();
		return false;
	});
 
	
	function init(){

		username = $('#user').val();
		
		$("#chart").html("Loading...");
		
		legend_titles.length = 0;
		legend_plays.length = 0;
		legend_links.length = 0;

		jqxhr = $.ajax({ type: "GET", url: "data/?callback=?", data: "username="+username+""})
				.success(function(data) { $("#chart").empty(); music = jQuery.parseJSON(data); })
				.error(function() { $("#chart").html("Sorry, there was a problem!"); music = false; })
				.complete(function() { process.tracks(music); });
		
	};

	init();
    	
		
})(this.jQuery);