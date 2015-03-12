/**
 * Created by Dirk Soentjens on 11/03/15.
 * This file exist out of a collection of functions
 */
function changeTextByLayerWithPrompt(layerName){
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    if(layer.kind == LayerKind.TEXT){
        layer.textItem.contents = prompt("change text into", layer.textItem.contents);
    }
}

//http://stackoverflow.com/questions/1287868/using-javascript-scripting-in-adobe-photoshop-how-to-change-the-contents-of-the
function changeTextByLayerName(layerName,newText){
    var layer = doc.layers.getByName(layerName);
    if(layer.kind == LayerKind.TEXT) layer.textItem.contents = newText;
}

//https://forums.adobe.com/message/2455288
var f = new File('~/Desktop/testing/gallery.xml');
f.open('r');
var xml = new XML( f.read() );
f.close();
// photos node
var photoXML = xml.child('photos');
// first photo
var photo1XML = photoXML.child(0);
var title = photo1XML.child('title');