/**
 * Created by dsoentjens on 11/03/15.
 * source: http://www.tagwith.com/question_479755_photoshop-javascript-to-get-all-layers-in-the-active-document
 */

//var allLayers = [];
var all = [];
var theLayers = collectAllLayers(app.activeDocument, 0);


function collectAllLayers (theParent, level)
{
    for (var m = theParent.layers.length - 1; m >= 0; m--)
    {
        var theLayer = theParent.layers[m];
        all.push(theLayer);
        if (theLayer.typename != "ArtLayer")
        {
            //new group
            //allLayers.push(level + theLayer.name);
            collectAllLayers(theLayer, level + 1)
        }
    }
}
//getTypes();
alert("all.length = " + all.length)
function getTypes(){
    for(var i=0; i<all.length; i++){
        alert(all[i].kind);
    }
}