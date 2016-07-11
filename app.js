var colors = require('colors');
var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
  colors  : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
    Crawler.fs      = require('fs');
		Crawler.colors      = require('colors');
		Crawler.getMovies();
	},
	getMovies: function(){

    setInterval(function(){
      // Crawler.request('http://websro.correios.com.br/sro_bin/txect01%24.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=DW340379409BR', function(err, res, body){
      Crawler.request('http://websro.correios.com.br/sro_bin/txect01%24.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=PJ959240884BR', function(err, res, body){
  			if(err)
  				console.log('Error: ' + err);
  			var $ = Crawler.cheerio.load(body);
        var table = $('table').html();

        var status = (table.indexOf('Entrega Efetuada') != -1) ? 'Chegou!!! \\o/' : 'Ainda não, calmae. :P';
        console.log(status == 'Chegou!!! \\o/' ? status.green : status.red);

        Crawler.fs.appendFile('log.txt', status+' '+ new Date().toString() + '\n');
  		});
    }, 30000);

	}
};
Crawler.init();
