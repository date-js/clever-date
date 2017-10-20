# CleverDate
A javascript module to show an intelligent date.


Install

- Import js file in your page
- wherever you want to display intelligent date, you have to add a data attribute in your html code with a formated date like this : data-cleverdate="2017-10-31 18:01:10"


It works !

If you want to set some settings, you have to intanciate yourself the cleverDate class.

Options : 
- refreshInterval (default : 10 seconds)

Example :
<pre>
new CleverDate({
  refreshInterval : 10
});
</pre>
