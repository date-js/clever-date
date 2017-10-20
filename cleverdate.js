
// To preven multiple executions
var instance_cleverdate = null;



var CleverDate = function(opts){

    

    var instance_current = this;


   


    // LAUNCH THE FIRST START
    var init = function(){
        start();
    }
    
    // METHOD CALLED AT REGULAR INTERVALS IF DATE ELEMENTS EXIST ON THE PAGE
    var start = function(){
        
        // to prevent multiple executions
        if(instance_cleverdate == instance_current && $(selector).length > 0) {
            
            setTimeout(function(ref){                
                if(ref){                         
                    start();                    
                }
            },refreshInterval*1000, this);           
            analyse();
        }

    }

    // METHOD IF YOU WANT TO STOP PROCESS (uncommon)
    stop = function(){
        instance_current = null;
    }

    // GIVES A "S" FOR PLURIAL
    var plural_s = function(val){
        return (val > 1) ? 's' : '';
    }

    // METHOD GIVES DIFFERENCE BETWEEN 2 DATES
    var dateDiff = function(date1, date2){
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;
    
        tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes
    
        tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes
    
        tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures
        
        tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        diff.day = tmp;
        
        return diff;
    }

    // FOR EACH DATE, ANALYSE AND TRANSFORM IF THAT'S POSSIBLE
    analyse = function (){  

         /* ----
        Calucations
        ----- */
        var date_current = new Date();
        
        // yesterday
        var date_yesterday = new Date(); date_yesterday.setDate(date_current.getDate()-1); 
        // Before yesterday
        var date_before_yesterday = new Date(); date_before_yesterday.setDate(date_current.getDate()-2); 
        
        var domSelector = document.querySelectorAll(selector);
        Array.prototype.forEach.call(domSelector, function(element, index) {
        //$(selector).each(function(){

       
            

            // Get date with utc format
            var date = new Date(  element.getAttribute('data-cleverdate')  );

            // If bad date given, stop the analyse
            if(!date){                
                return false;
            }
            
            // Checks
            var isToday = ""+date.getFullYear()+date.getMonth()+date.getDate()+"" == ""+date_current.getFullYear()+date_current.getMonth()+date_current.getDate()+"";
            var isYesterday = ""+date.getFullYear()+date.getMonth()+date.getDate()+"" == ""+date_yesterday.getFullYear()+date_yesterday.getMonth()+date_yesterday.getDate()+"";
            var isBeforeYesterday = ""+date.getFullYear()+date.getMonth()+date.getDate()+"" == ""+date_before_yesterday.getFullYear()+date_before_yesterday.getMonth()+date_before_yesterday.getDate()+"";

            var txt = "";

            // Saving inital date written si we have to do a come back
            if(! element.getAttribute('date-cleverdate-initial')){
                element.setAttribute('date-cleverdate-initial', element.innerHTML);
                //element.setAttribute('('date-cleverdate-initial',$(this).html());
            }
            
            diff = dateDiff(date, date_current);
            
            if(diff.day == 0 && diff.hour == 0 && diff.min == 0  && diff.sec <= 30){
                txt = "À l'instant";
            }
            else if(diff.day == 0 && diff.hour == 0 && diff.min == 0){
                txt = 'Il y a '+diff.sec+' secondes';				
            }
            else if(diff.day == 0 && diff.hour == 0 ){
                txt = 'Il y a '+diff.min+' minute'+plural_s(diff.min);
            }
            else if(diff.day == 0 && diff.hour <= 3){                
                txt = 'Il y a '+diff.hour+' heure'+plural_s(diff.hour)+'' ;
            }
            else if(isToday){
                txt= "Aujourd'hui à "+date.getHours()+":"+date.getMinutes();
            }
            else if(isYesterday){
                txt= "Hier à "+date.getHours()+":"+date.getMinutes();
            }  
            else if(isBeforeYesterday){
                txt= "Avant-hier à "+date.getHours()+":"+date.getMinutes();
            }
            
            
            
            
            // A clever date is possible, we show it
            if(txt!=""){                   
               element.innerHTML = txt;                
            }
            // If we can't show a clever date, put default date
            else if($(this).data('date-cleverdate-initial')){
                element.innerHTML = element.getAttribute('date-cleverdate-initial');
            }

            
        });      

    }


    /*
    ---------------
    CONSTRUCTOR
    ---------------
    */

    // If there is a new instance, we delete previous
    instance_cleverdate = null; 
    instance_cleverdate = this;

    var selector = (opts.selector) ? opts.selector : '[data-cleverdate]';
    var refreshInterval = (opts.refreshInterval) ? opts.refreshInterval : 10;

   
    // Call a firt start
    init();

}


// Launch
new CleverDate({});