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
		matrix=[],tags=w1.Object.create(null);
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
				//
				console.dir(frag);
				//console.dir(matrix);
				//console.dir(tags);
				for(let x,a,b,p,n,ids=[],
				fragQuery=x=>{
					let r;
					try{
						r=frag.querySelectorAll(x)
					}catch(err){
						r=[]
					};
					return r
				},
				fix=(n,a,b)=>{
					const c1=a.classList,l=c1.length;
					if(1===l){
						let x=c1[0];
						if(0===fragQuery('#'+x).length){
							b.id=ids[ids.length]=x
						}
					}else if(1<l){
						let m=[n];
						for(const c of a.classList){m[m.length]=c};

						console.log(m.join('.'),frag.querySelectorAll('div.center.clear'))
					};



/*						const i=fragQuery(m.join('.')).length;
						m=m.filter((c,i,m)=>{
							const q=fragQuery(m.join('.'));
						});

						let s=m.join('.'),q=fragQuery(s);
						const l=q.length;
						console.log(s,q)

						let s='';
						for(const c of c1){
						};
,m=fragQuery(s);
						b.className=a.className;
						const c2=b.classList;
						console.log(b.tagName+c2.toString())

						for(const x of c1){
							if(fragQuery('*.'+x).length>1){
								o.remove(x);
								console.dir(o)
							}
						};

					const c1=a.classList;
					let n=b.tagName.toLowerCase();
					if(c1.length && tags[n].length>1){
						const c2=b.className;
						for(const x of c1){
							if(query('*.'+x).length>1){
								b.className=c2+' '+x
							}
						};
						n=n+b.className
					};
					return n
 w1.getComputedStyle(e)
*/
				},
				m=matrix,l=m.length,i=0;i<l;++i){
					x=m[i];
					p=x[1];
					n=x[2];//tag
					a=x[4][0];
					b=x[5][0];
					if(x=a.id){
						if(-1!==ids.indexOf(x)){
							fix(n,a,b)
						}else{
							x='#'+(b.id=ids[ids.length]=x)
						};
					}else{
						fix(n,a,b)
					};
					//p[1]=x
				};



				ready(w1.open(),d2=>{
					let x=d1,t=x.doctype;
					x=t?t.cloneNode():d2.implementation.createDocumentType('html',null,null);
					if(t=d2.doctype){
						d2.replaceChild(t,x)
					}else{
						d2.insertBefore(x,d2.childNodes[0])
					};
					if(x=frag.firstElementChild){
						const w2=d2.defaultView;
						//
return;
						d2.documentElement.replaceWith(x);
						ready(w2,d2=>{
							const w2=d2.defaultView;
							for(let x,depth,path,nth,original,cloned,ids=[],i=0,m=matrix,l=m.length;i<l;++i){
								depth=m[0];
								path=m[1];//ancestors,node (d1)
								nth=m[2];
								x=m[4];original={node:x[0],computedStyle:x[1]};
								x=m[5];cloned={node:x[0],computedStyle:x[1]};
								//...
							}
						})
					}
				})
			}
		})
	})(window);
