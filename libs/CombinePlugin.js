/**
 * @author gyb(mocheer)
 * @email mocheer@foxmail.com  
 * @param date 2017.4.6
 * example:
 * {
 * 	 test:/\.js$/,
 * 	 pre:['./node_modules/requirejs/require.js'],
 *   push:"\n"+"T.require = require; T.define = define;"
 * }
 */
var ConcatSource = require("webpack-core/lib/ConcatSource");
var ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");
var fs = require("fs");

function CombinePlugin(options) {
    this.options = options || {};
}
module.exports = CombinePlugin;

CombinePlugin.prototype.apply = function(compiler) {
	var options = this.options;
	options.test = options.test || /\.js$/;
	//
	compiler.plugin("compilation", function(compilation) {
		compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
			chunks.forEach(function(chunk) {
				if(!chunk.initial) return;
				chunk.files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options)).forEach(function(file) {
                    var read = function(urls){
                        if(!urls || urls.length===0){
                            return "";
                        }
                        var data = "";
                        for(var i=0,l=urls.length;i<l;i++){
                            data += fs.readFileSync(urls[i],"utf-8") + "\n";
                        }
                       return data;
                    }
					var anonymous = (str)=>{
						return "(function(){" +str + "})();"+"\n";
					}
					var shift = options.shift?anonymous(options.shift):"";
					var push = options.push?anonymous(options.push):"";

					compilation.assets[file] = new ConcatSource(shift,read(options.pre), "\n", compilation.assets[file],read(options.post),"\n",push);
				});
			});
			callback();
		});
	});
};