# Clever Date

A javascript module to show an intelligent date refreshing at regular intervals.
Light and zero dependency.

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
- Just now
- 2 minutes ago
- 2 hours ago
- Today at 11:46
- Yesterday at 11:46

## Install it

### ES6

``` bash
npm install clever-date
```

``` javascript
import CleverDate from 'clever-date';
```

### Otherwise

``` html
<script src="..."></script>
```

## Customize it

You have the full possibility to customize your dates by passing your configuration.

``` javascript
var configuration = {
    refresh: 10, // The refreshing time
    rules: {
        en: [
            {d_day=0, d_hour=0, d_minute="<60", text: "There are [%dm] minute(s) and [%ds] second(s)."}
        ]
    }
}

```

