/*
nodeType:
    1 :ELEMENT
    3 :TEXT
    7 :PROCESSING-INSTRUCTION
    8 :COMMENT

    9 :DOCUMENT
   10 :DOCUMENT-TYPE
   11 :DOCUMENT-FRAGMENT

/3|1(0|1)?|[7-9]/.test(x)

::2 ATTRIBUTE
::4 CDATA_SECTION
::5 ENTITY_REFERENCE
::6 ENTITY
:12 NOTATION


nodeFilter:
   -1 :NodeFilter.SHOW_ALL
    1 :NodeFilter.SHOW_ELEMENT
    4 :NodeFilter.SHOW_TEXT
   64 :NodeFilter.SHOW_PROCESSING_INSTRUCTION
  128 :NodeFilter.SHOW_COMMENT
  256 :NodeFilter.SHOW_DOCUMENT
  512 :NodeFilter.SHOW_DOCUMENT_TYPE
 1024 :NodeFilter.SHOW_DOCUMENT_FRAGMENT

1 FILTER_ACCEPT
2 FILTER_REJECT > The children of rejected nodes are not visited
3 FILTER_SKIP > treated as "skip this node but *not* its children".


*/


var $w=window, $d=$w.document, $h=$d.documentElement, $b=$d.body;
$h.normalize();
/*
Node.normalize() In a normalized sub-tree,
no text nodes in the sub-tree are empty
and there are no adjacent text nodes.
*/
function filterAndClean(n){
 var p,e=n,i=e.nodeType,t,r=(i===1?1:t=(i===3),2);//REJECT
 if(t||i===8){
	p=e.parentNode;
	if(t){//TEXT
		p=p.style.whiteSpace;
		if(/^no/.test(p)){//normal|nowrap
		 t=e.nodeValue;
		 e.nodeValue=t.replace(RegExp('^\s+|\s+$|'+(p==='nowrap'?'[\s\n\r]+':'\s+'),'gim'),'\u0020');
		};
	}else if(i===8){//COMMENT
		p.removeChild(e);
	};
 };
 return r;
};
//







function filter(n){
 return 1;
};
//
var nodeIterator=$d.createNodeIterator($h,-1,filter);
//
console.clear();
console.dir(nodeIterator);

//console.dir();



//
function walk(root){
var o=nodeIterator, e=o.usedNode;
if(e &&'style' in e){
e.style.background="";
};

e=o.nextNode();
o.usedNode=e;
if(e &&'style' in e){
e.style.background="red";
};
console.dir(e);
//console.dir(nodeIterator);
};


/*



display:block;border:2px solid red"
var pi=$d.createProcessingInstruction('php',' echo 123; ?');
$b.insertBefore(pi,$b.firstChild);
//console.dir(pi);

e.outerHTML="";
 f=handle[e.nodeType];
*/

/*
//var s=$h.innerHTML;
//console.log($h.innerHTML.length);
console.dirxml($h);

console.log(String($h));
//console.dir($h);
*/

//console.log();
//console.dir();
