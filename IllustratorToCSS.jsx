/**
 Illustrator object to CSS   
 
Autor: Simon Perdrisat
Date: Jun 2011

License: GPL2 http://www.gnu.org/licenses/gpl-2.0.html
 
Export Illustrator ojbect attribute like size, color,  gradiant, border, .... to CSS.
 
Usage:  Select an object and run the script.

Note: I want first to do a plugin... but you need to use flash for the interface.
So this is just a prof of concept but he do the job.
 */


// if a document is open
if(documents.length >0)
{
    var doc = app.activeDocument;
    var css = '';
    try
        {
    
            var selectedItem = doc.selection[0]
            
            css = '//CSS export\n';
            css += '.' + selectedItem.layer .name + ' {\n';
            
            //box size
            if(selectedItem.width)
                css += 'width: ' + Math.floor(selectedItem.width) + 'px;\n';
            if(selectedItem.height)
               css += 'height: ' + Math.floor(selectedItem.height) + 'px;\n';
                           
            //color
            if(selectedItem.fillColor.typename == "RGBColor"){
                if(selectedItem.opacity != 100){
                    css += 'background-color: '  + colorTorgb(selectedItem.fillColor) + ';\n';
                    css += 'background-color: '  + colorTorgba(selectedItem.fillColor,selectedItem.opacity) + ';\n';
                }else if(selectedItem.fillColor){
                  css += 'background-color: '  + colorTorgb(selectedItem.fillColor) + ';\n';
                 }
             }
         
             //gradiant
             if(selectedItem.fillColor.typename == "GradientColor") {
               css += '//gradiant\n';
               css += gradiantToCSS(selectedItem.fillColor) +'\n';
             }
             css += '}';
            //debug output
            $.writeln(css);
            
            //output
            alert(css);
        }
    catch (e)
    {

        alert("Error (sorry...)\n"  + e);
        
    }

}

function colorTorgb(color){
    	var redColor = Math.floor(color.red);
		var greenColor = Math.floor(color.green);
		var blueColor = Math.floor(color.blue);
        var rgb = 'rgb(' + redColor + ',' + greenColor + ',' +blueColor + ')';
        return rgb;
 }

function colorTorgba(color,opacity){
    	var redColor = Math.floor(color.red);
        var greenColor = Math.floor(color.green);
	    var blueColor = Math.floor(color.blue);
        var alpha = Math.floor(opacity) / 100;
        var rgba = 'rgba(' + redColor + ',' + greenColor + ',' +blueColor + ',' + alpha + ')';
        return rgba;
 }


function gradiantToCSS(color){
        var angle = color.angle; //todo illustrator angle and CSS  are not the same
        
        var cssStopColor = ''; //we should use an array instead of a string

        var numOfStops = color.gradient.gradientStops.length;  
        for(var k=0; k < numOfStops; k++)  
        {  
            curentStop = color.gradient.gradientStops[k]; 
            cssStopColor += ', ';
             if(curentStop.opacity != 100){
                cssStopColor +=  colorTorgba(curentStop.color,curentStop.opacity);
            }else if(selectedItem.fillColor){
                cssStopColor += colorTorgb(curentStop.color) ;
             }
         cssStopColor += ' ' + Math.floor(curentStop.rampPoint) + '%';
            
        }//end for k  
        
         /* Keep as a reference
            background: -moz-linear-gradient(top, rgba(30,87,153,1) 0%, rgba(125,185,232,0) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,87,153,1)), color-stop(100%,rgba(125,185,232,0)));
            background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(125,185,232,0) 100%);
            background: -o-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(125,185,232,0) 100%);
            background: -ms-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(125,185,232,0) 100%);
            background: linear-gradient(top, rgba(30,87,153,1) 0%,rgba(125,185,232,0) 100%);
            */
        var cssGradiant = 'background: linear-gradient(' + angle +'deg'  + cssStopColor + ')';
        return cssGradiant;
}
