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
		matrix=[],
		tags=w1.Object.create(null);
		//
		ready(w1,d1=>{
			if(d1.body){
				let frag=d1.createDocumentFragment();
				const walk=(branch,depth,nth,e,ancestors)=>{
					if(0!==e.offsetHeight){
						let path=ancestors;
						switch(e.nodeType){
							case 3:
								branch.appendChild(d1.createTextNode(e.nodeValue));//todo:skip blank
								break
							case 1:
								const x=e.tagName.toLowerCase();
								let m=tags;
								if(x in m){
									m=m[x];
									m[m.length]=e
								}else{
									m[x]=[e]
								};
								m=matrix;
								m[m.length]=[
									depth,//0
									(path=[ancestors,e]),//1
									x,//2
									nth,//3
									[
										e,//4.0
										null//4.1
									],
									[
										(branch=branch.appendChild(d1.createElement(x))),//5.0
										null//5.1
									]
								];
								break
						};
						//console.log('\t'.repeat(depth),nth,e.tagName||e.nodeValue);
						if((e=e.firstChild) && 1===e.nodeType){
							++depth
						};
						while(null!==e){
							walk(branch,depth,nth,e,path);
							if(null!==(e=e.nextSibling) && 1===e.nodeType){
								++nth
							}
						}
					}
				};
				//
				walk(frag,0,1,d1.documentElement,[]);
				/*
				console.dir(frag);
				console.dir(matrix);
				console.dir(tags);
				*/
				if(frag=frag.firstElementChild){
					ready(d1.defaultView.open(),d2=>{
						let t=d1.doctype,x=t?t.cloneNode():d2.implementation.createDocumentType('html',null,null);
						if(t=d2.doctype){
							d2.replaceChild(t,x)
						}else{
							d2.insertBefore(x,d2.childNodes[0])
						};
						while(t=x.nextSibling){t.remove()};
						d2.appendChild(frag);
						//return;
						ready(d2.defaultView,d2=>{
							console.info('d2-ready');
						})
					})
				}
			}
		})
	})(window);
