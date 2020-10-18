# Clever Date

![npm](https://img.shields.io/npm/v/@date-js/clever-date?style=flat-square)
![npm](https://img.shields.io/npm/dt/@date-js/clever-date?style=flat-square)
![starts](https://img.shields.io/github/stars/date-js/clever-date?style=flat-square)

A javascript library (<10kB) to show an intelligent date refreshing at regular intervals.

## Demo
A demo is available [here](https://date-js.github.io/clever-date/).

## Supported languages
Languages defined bellow are fully supported but you can add your own rules with other languages.
- English
- Français

You can also contribute and suggest translations with a pull request.

## Example

Add an attribute to your date with the corresponding timestamp.
``` html
<div data-clever-date="1579950627">26/01/2020 12h12</div>
<div data-clever-date="1580037027">25/01/2020 12h12</div>
```

Start the script:
``` javascript
CleverDate.start();
```

Let's see the result:
``` html
<div title="26/01/2020 12h12">2 minutes ago</div>
<div title="25/01/2020 12h12">Yesterday at 12:12</div>
```

### Some possible results:
- Just now / A l'instant
- 2 minutes ago / Il y a 2 minutes
- 2 hours ago / Il y a 2 heures
- Today at 11:46 / Aujourd'hui à 11h46
- Yesterday at 11:46 / Hier à 11h46

## Install

### ES6

``` bash
npm install clever-date
```

``` javascript
import CleverDate from '@date-js/clever-date';
```

### Otherwise

``` html
<script src="https://cdn.jsdelivr.net/npm/@date-js/clever-date@2.0"></script>
```

## Usage
Start the process :
``` javascript
CleverDate.start();
```

Stop the process:
``` javascript
CleverDate.stop();
```

If you add element dynamically.
``` javascript
window.dispatch(new Event('clever-date.update'));
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

## How create rules ?

You can see examples in [default rules file](src/defaultRules.ts).

A rule is composed of some elements:

##### condition
A callback which returns true if the rule matches.\
DateInterval is injected in the callback: see [DateInterval.ts](src/DateInterval/DateInterval.ts) for more information.

##### refresh
For improving performances, it's not necessary to analyse and parse your rule each time.
- null: never analysed again
- undefined: use default refreshing time
- number: seconds between analyses

##### text
An object with the text for each language that you want to target.
