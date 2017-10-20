# CleverDate
A javascript module to show an intelligent date refreshing at regular intervals.


## List of possible results :
- A l'instant
- Il y a 2 minutes
- Il y a 2 heures
- Hier à 11h46
- Avant-hier à 12h36

## Install

- Import js file in your page
- wherever you want to display intelligent date, you have to add a data attribute in your html code with a formated date like this : data-cleverdate="2017-10-31 18:01:10"

It works !

### Using options
If you want to set some settings, you have to intanciate yourself the cleverDate class after the script is loaded.

Options : 
- refreshInterval (default : 10 seconds)

Example :
<pre>
new CleverDate({
  refreshInterval : 10
});
</pre>


## Demonstration :
```
/* Transform in "Il y a 2 minutes" */
<span data-cleverdate="2017-08-29 08:02:27">29/08/2017 - 08h02</span>
```
