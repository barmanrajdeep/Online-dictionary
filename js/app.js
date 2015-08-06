var myDataRef = new Firebase('https://db-dictionary.firebaseio.com/');
			window.onload = function(){
				var dictionary = {};
				var a =  myDataRef.child("dictionary");
				myDataRef.on("value", function(data){
					if ( data.val() ) {
						var data = data.val();
						dictionary = data.dictionary;
					} 
				});
				var x = document.getElementById("s");
				x.addEventListener("keyup", show);

				function show() {
					var printMeaning = document.getElementById("meaning");
					var word = this.value;
					printMeaning.textContent = dictionary[this.value] ?
						dictionary[this.value] : "Not found in dictionary";
					if ( this.value === "" ) {
						printMeaning.textContent = "";
					}
					if ( this.value != "" && !dictionary[this.value] ) {
						var but = document.createElement("button");
						but.setAttribute("id", "addB");
						but.textContent = "Add a meaning";
						printMeaning.appendChild(but);
						var butt = document.getElementsByTagName("button");
						butt[0].addEventListener("click", means);
						function means(){
							var newM = prompt("enter meaning");
							if ( newM !== null ) {
								dictionary[word] = newM;
								var newKey = myDataRef.child("dictionary/"+word);
								newKey.set(newM);
								myDataRef.on("value", function(data){
									var data = data.val();
									document.getElementById("meaning").textContent = data["dictionary"][word];
								});
							}
						}

					}

				}
			};