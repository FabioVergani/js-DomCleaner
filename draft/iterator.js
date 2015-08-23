var $w=window, $d=$w.document, $h=$d.documentElement, $b=$d.body;

$h.normalize();
/*
Node.normalize() In a normalized sub-tree,
no text nodes in the sub-tree are empty
and there are no adjacent text nodes.
*/


var pi=$d.createProcessingInstruction('php',' echo 123; ?');
$b.insertBefore(pi,$b.firstChild);
//console.dir(pi);



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



NodeFilter:
1 FILTER_ACCEPT
2 FILTER_REJECT > The children of rejected nodes are not visited
3 FILTER_SKIP > treated as "skip this node but *not* its children".


*/




var nodeIterator=$d.createNodeIterator($d.childNodes[0],-1,function(n){
 var t,s,p,e=n,i=e.nodeType,r=2;//REJECT
 if(/[38]/.test(i)){
	p=e.parentNode;
	if(i===3){//TEXT
		s=p.style.whiteSpace;
		if(/^no/.test(s)){//normal|nowrap
		 p=(s==='nowrap'?/^\s*|\s*$|[\s\n\r]+/gim:/^\s*|\s*$|\s+/gim);
		 s='\u0020';
		 t=e.nodeValue;
		 e.nodeValue=/^\s+$/.test(t)?s:t.replace(p,s);
		};
	}else if(i===8){//COMMENT
		p.removeChild(e);
	};
 }else if(!/[24567]/.test(i)){
	r=1;//ACCEPT
 };
 return r;
});

