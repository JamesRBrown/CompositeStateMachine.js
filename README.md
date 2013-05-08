CompositeStateMachine
=====================

Track HTML element composite states
<pre>
  Requires: jQuery v1.2.3+

  Purpose:
	As the name implies the purpose of this code is to track object states (specifically HTML elements).
	Often times the state of an element, whether it should be shown, or submitted, or pass validation,
	etc, is not a simple condition, but rather a list of conditions that all have to be met.  In order
	to allow for modulized designs, you have to be able to track these conditions and make sure any
	new code doesn't step on the toes of any other code. One appoach to this is the composite state
	machine, where the state of the element is tracked as a composite of all the conditions that have
	been applied against it.
	
	Usage:
	Instantiate with variable = new CompositeStateMachine('Application'), where "variable" is the name
	of the instance, and "Application" is the name of the application you will use the state machine for.
	For instance let's say we wanted to hide elements for various reasons, such as a filter search, we 
	ultimately want to know if the state of the element is hidden.  So we would:
	
	hiddenElements = new CompositeStateMachine('hidden');
	
	hiddenElements.add($('.foo'), 'bar'); 		//add the state 'bar' to all elements provided within the 'hidden' context.
	
	hiddenElements.present($('.foo'), 'bar'); 	//return all elements that have the simple state 'bar' within the 'hidden' context.
	
	hiddenElements.absent($('.foo'), 'bar'); 	//return all elements that do not have the simple state 'bar' within the 'hidden' context.
	
	hiddenElements.present($('.foo')); 			//return all elements that have the composite state 'hidden'.
	
	hiddenElements.absent($('.foo')); 			//return all elements that do not have the composite state 'hidden'.
	
	hiddenElements.remove($('.foo'), 'bar');	//remove the state 'bar' from all elements provided within the 'hidden' context.
	
	hiddenElements.remove($('.foo'));			//removes all sub states from all elements provided within the 'hidden' context.
	
	NOTE: You can pass in single elements, arrays of elements, or jQuery objects.
</pre>
