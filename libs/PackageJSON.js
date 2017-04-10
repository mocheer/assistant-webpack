/**
 * @author gyb(mocheer)
 * @email mocheer@foxmail.com  
 * @param date 2017.4.7
 */
var packageFile = process.cwd() + '/package.json';
var PackageJSON = require(packageFile)
PackageJSON.toBanner = options => {
    options = options || ["name", "description", "version", "author", "license"]
    var str = ''
    for (var i = 0, l = options.length; i < l; i++) {
        var k = options[i];
        if (str !== '') {
            str += '\n';
        }
        PackageJSON[k] && (str += k + ':' + PackageJSON[k])
    }
    return str
}
module.exports = PackageJSON;