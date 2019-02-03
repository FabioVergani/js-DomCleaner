(w1=>{
	const ready=(w,f)=>{
		const d=w.document;
		if(d.readyState!=='complete'){
			const g=o=>{
				w.removeEventListener('load',g);
				f(o.target)
			};
			w.addEventListener('load',g)
		}else{
			f(d)
		}
	},
	tags=w1.Object.create(null),
	matrix=[];
	//
	ready(w1,d1=>{
		if(d1.body){
			const w1=d1.defaultView,
			frag=d1.createDocumentFragment(),
			walk=(branch,depth,nth,e,ancestors)=>{
				if(0!==e.offsetHeight){
					let path=ancestors;
					switch(e.nodeType){
						case 3:
							branch.appendChild(d1.createTextNode(e.nodeValue));//todo:skip blank
							break
						case 1:
							const x=e.tagName.toLowerCase();
							let m=tags;
							if(x in m){(m=m[x])[m.length]=e}else{m[x]=[e]};
							m=matrix;
							m[m.length]=[
								depth,//:0
								(path=[ancestors,e]),//:1
								x,//:2
								nth,//:3
								[
									e,//:4.0
									null//:4.1
								],
								[
									(branch=branch.appendChild(d1.createElement(x))),//:5.0
									null//:5.1
								]
							];
							break
					};
					if((e=e.firstChild) && 1===e.nodeType){++depth};
					while(null!==e){
						walk(branch,depth,nth,e,path);
						if(null!==(e=e.nextSibling) && 1===e.nodeType){++nth}
					}
				}
			};
			//
			walk(frag,0,1,d1.documentElement,[]);
			//
			console.dir(matrix);
			//
			ready(w1.open(),d2=>{
				let e=d1,t=e.doctype;
				e=t?t.cloneNode():d2.implementation.createDocumentType('html',null,null);
				if(t=d2.doctype){d2.replaceChild(t,e)}else{d2.insertBefore(e,d2.childNodes[0])};
				if(e=frag.firstElementChild){
					d2.documentElement.replaceWith(e);
					ready(d2.defaultView,d2=>{
						//...
					})
				}
			})
		}
	})
})(window);
