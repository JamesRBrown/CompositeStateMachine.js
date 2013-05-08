/*
  Title: Composite State Machine
	Author: James R Brown
  Version: 1.0
  Requires: jQuery v1.2.3+
  License:
    The MIT License (MIT)
    Copyright (c) 2013 James R. Brown
  	
  	Permission is hereby granted, free of charge, to any person obtaining 
  	a copy of this software and associated documentation files (the "Software"), 
  	to deal in the Software without restriction, including without limitation 
  	the rights to use, copy, modify, merge, publish, distribute, sublicense, 
  	and/or sell copies of the Software, and to permit persons to whom the Software 
  	is furnished to do so, subject to the following conditions:
  	
  	The above copyright notice and this permission notice shall be included in 
  	all copies or substantial portions of the Software.
  	
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
  	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
  	PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
  	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
  	CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
  	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.	
*/



function CompositeStateMachine (StateMachine) {
	//StateMachine is the 'instance' of a tracking application
	//eg: 'hidden' or 'submit' or 'validated', etc...
	this.StateMachine = StateMachine;
}

CompositeStateMachine.prototype.add = function(operateOver, state){
	//adds state in question to the element(s) provided
	//operateOver: either an element or an array of elements
	
	if(operateOver instanceof jQuery || operateOver instanceof Array){
		for (var i = 0; i < operateOver.length; i++) {
			if (typeof $(operateOver[i]).data(this.StateMachine) == "undefined") {
				$(operateOver[i]).data(this.StateMachine, new Object());
			}
			$(operateOver[i]).data(this.StateMachine)[state] = 'set';
		}
	}else{
		if (typeof $(operateOver).data(this.StateMachine) == "undefined") {
			$(operateOver).data(this.StateMachine, new Object());
		}
		$(operateOver).data(this.StateMachine)[state] = 'set';
	}
	
	return operateOver;
}

CompositeStateMachine.prototype.remove = function(operateOver, state){
	//removes the state in question from the element(s) provided
	//operateOver: either an element or an array of elements
	var simpleState = (typeof state != "undefined"); // composite/simple state selector
	
	if(operateOver instanceof jQuery || operateOver instanceof Array){
		for (var i = 0; i < operateOver.length; i++) {
			if(simpleState){
				if (typeof $(operateOver[i]).data(this.StateMachine) != "undefined") {
					delete $(operateOver[i]).data(this.StateMachine)[state];
				}
			}else{
				$(operateOver[i]).removeData(this.StateMachine);
			}
		}
	}else{
		if(simpleState){
			if (typeof $(operateOver).data(this.StateMachine) != "undefined") {
				delete $(operateOver).data(this.StateMachine)[state];
			}
		}else{
			$(operateOver).removeData(this.StateMachine);
		}
	}
	
	return operateOver;
}

CompositeStateMachine.prototype.present = function(operateOver, state){
	//returns element(s) which have the state in question
	//operateOver: either an element or an array of elements
	var simpleState = (typeof state != "undefined"); // composite/simple state selector
	
	if(operateOver instanceof jQuery || operateOver instanceof Array){
		var returnElms = new Array();
		for (var i = 0; i < operateOver.length; i++) {
			if (typeof $(operateOver[i]).data(this.StateMachine) != "undefined") {
				if(simpleState){
					if (typeof $(operateOver[i]).data(this.StateMachine)[state] != "undefined"){
						returnElms.push(operateOver[i]);
					}
				}else{
					for (var j in $(operateOver[i]).data(this.StateMachine)) {
						returnElms.push(operateOver[i]);
						break;
					}
				}
			}
		}
		return returnElms;
	}else{
		if (typeof $(operateOver).data(this.StateMachine) != "undefined") {
			if(simpleState){
				if (typeof $(operateOver).data(this.StateMachine)[state] != "undefined"){
					return operateOver;
				}
			}else{
				for (var j in $(operateOver).data(this.StateMachine)) {
					return operateOver;
				}
			}
		}
	}
}

CompositeStateMachine.prototype.absent = function(operateOver, state){
	//returns elements(s) which do not have the state in question
	//operateOver: either an element or an array of elements
	var simpleState = (typeof state != "undefined"); // composite/simple state selector
	
	var absent = true;
	
	if(operateOver instanceof jQuery || operateOver instanceof Array){
		var returnElms = new Array();
		for (var i = 0; i < operateOver.length; i++) {
			if (typeof $(operateOver[i]).data(this.StateMachine) != "undefined") {
				if(simpleState){
					if (typeof $(operateOver[i]).data(this.StateMachine)[state] == "undefined"){
						returnElms.push(operateOver[i]);
					}
				}else{
					absent = true;
					for (var j in $(operateOver[i]).data(this.StateMachine)) {
						absent = false;
						break;
					}
					if(absent){
						returnElms.push(operateOver[i]);
					}
				}
			}else{
				returnElms.push(operateOver[i]);
			}
		}
		return returnElms;
	}else{
		if (typeof $(operateOver).data(this.StateMachine) != "undefined") {
			if(simpleState){
				if (typeof $(operateOver).data(this.StateMachine)[state] == "undefined"){
					return operateOver;
				}else{
					return;
				}
			}else{
				absent = true;
				for (var j in $(operateOver).data(this.StateMachine)) {
					absent = false;
					break;
				}
				if(absent){
					return operateOver;
				}else{
					return;
				}
			}
		}else{
			return operateOver;
		}
	}
}

