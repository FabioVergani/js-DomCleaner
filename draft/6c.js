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
		};
		//
		ready(w1,d1=>{
			let e=d1.body;
			if(null!==e && 0!==e.childNodes.length){
				const matrix=[],
				tags=new w1.Map(),
				walk=(branch,e,nth,ancestors)=>{
					if(0!==e.offsetHeight){
						let path=ancestors;
						switch(e.nodeType){
							case 3:
								branch.appendChild(d1.createTextNode(e.nodeValue));//todo:skip blank
								break
							case 1:
								const n=e.tagName;
								let m=matrix,i=m.length;
								i=m[i]=[
									[null,e],
									[null,(branch=branch.appendChild(d1.createElement(n)))],
									(path=[ancestors,branch,nth])
								];
								m=tags;
								if(m.has(n)){
									(m=m.get(n))[m.length]=i
								}else{
									m.set(n,[i])
								};
								break
						};
						e=e.firstChild;
						while(null!==e){
							walk(branch,e,1!==e.nodeType?null:++nth,path);
							e=e.nextSibling
						}
					}
				};
				//
				walk(e=d1.createDocumentFragment(),d1.documentElement,1,null);
				//
				for(let x,p,i=0,m=matrix,l=matrix.length;i<l;++i){
					x=m[i][2];
					p=x[1];
					console.dir(x)
				};
				//console.dir(matrix);
				//console.dir(tags);
				//
				if(e=e.firstElementChild){
					ready(d1.defaultView.open(),d2=>{
						let t=d1.doctype,x=t?t.cloneNode():d2.implementation.createDocumentType('html',null,null);
						if(t=d2.doctype){d2.replaceChild(t,x)}else{d2.insertBefore(x,d2.childNodes[0])};
						while(t=x.nextSibling){t.remove()};
						d2.appendChild(e);
						ready(d2.defaultView,d2=>{
							console.info('d2-ready')
						})
					})
				}
			}
		})
	})(window);
