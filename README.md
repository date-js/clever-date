# Clever Date

A javascript module to show an intelligent date refreshing at regular intervals.
Light and zero dependency.

## Languages supported
Languages defined bellow are fully supported but you can add your own rules with other languages.
- English
- Français

You can also contribute and suggest translations with a pull request.

## Example 

Add an attribute to your date with the corresponding timestamp.
``` html
<div data-clever-date="1579950627">26/01/2020 12h12</div>
<div data-clever-date="1580037027">26/01/2020 12h12</div>
```

Start the script:
``` javascript
CleverDate.start();
```

Let's see the result:
``` html
<div>2 minutes ago</div>
<div>Yesterday at 12:12</div>
```

### Some possible results:
- Just now / A l'instant
- 2 minutes ago / Il y a 2 minutes
- 2 hours ago / Il y a 2 heures
- Today at 11:46 / Aujourd'hui à 11h46
- Yesterday at 11:46 / Hier à 11h46

## Install and use it

### ES6

``` bash
npm install clever-date
```

``` javascript
import CleverDate from 'clever-date';

CleverDate.start();
```

### Otherwise

``` html
<script src="https://cdn.jsdelivr.net/npm/clever-date@1.0/dist/clever-date.js"></script>
```

``` javascript
CleverDate.start();
```

## Customize it

You have the full possibility to customize your rules by passing your configuration.

``` javascript
var configuration = {
    refresh: 5, // The minimal refreshing time
    selector: 'data-clever-date', // Elements with this attribute will be parsed
    rules: [
        {
             condition: function(dateIntervalItem) { return dateIntervalItem.day >= 365*10; }, text: {
                 fr: "Il y a %dd jour{%dd||s} (année %Y)",
                 en: "%dd day{%dd||s} ago (year %Y)"
             }
        }
    ]
}

CleverDate.start(configuration);
```
