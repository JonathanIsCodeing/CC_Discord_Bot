const _dayInMillis = 86400000;
const _minInMillis = 60000;
const _triggerRange = 15000/2;

const _eventDurationInMillis = 5 * _dayInMillis;
const _eventCooldownInMillis = 7 * _dayInMillis;
const _countdownTriggers = [60*_minInMillis, 15*_minInMillis, 5*_minInMillis];

class Narcia{
    startDate;

    constructor(){
        if(! Narcia.instance){
            let date = new Date(2020, 7, 9, 19, 0, 0, 0);
            this.startDate = date.valueOf();
            Narcia.instance = this;
        }
     
        return Narcia.instance;
    }

    get hasStarted(){
        //console.log(this.startDate + ' - ' + Date.now())
        return (this.startDate - Date.now()) <= 0;
    }

    get triggerMessage(){
        if(this.startDate == null){
            return null;
        }

        let countdown = this.millisUntilStart();
        if(! this.hasStarted){
            //console.log('Event has not started yet');
            for(let i in _countdownTriggers){
                let trigger = _countdownTriggers[i];
                if(this.isInRangeOf(trigger, countdown)){
                    var minUntilStart = trigger / _minInMillis;
                    if(minUntilStart > 5){
                        return `@everyone Narcia starts in ${minUntilStart} minutes`;
                    } else {
                        return `@everyone A new season begins! Log on and capture tiles.\n
                                Only capture tiles which are on the way to towns or lvl4+ !!`;
                    }
                }
            }
        } else {
            let eventTime = this.millisAfterStart();
           // console.log('Event time in h: ' + eventTime/1000/3600);
            // Day one of Narcia, small towns countdown
            if(eventTime < _dayInMillis){
                countdown += _dayInMillis;
                for(let i in _countdownTriggers){
                    let trigger = _countdownTriggers[i];
                    if(this.isInRangeOf(trigger, countdown)){
                        var minUntilStart = trigger / _minInMillis;
                        if(minUntilStart > 5){
                            return `@everyone Small towns open in ${minUntilStart} minutes.`;
                        } else {
                            return `@everyone Log on now!\n
                                    The next hours decide if we can fight for Imperial this season`;
                        }
                    }
                }
            }
            // Day two of Narcia, large towns countdowns
            else if(eventTime >= _dayInMillis && eventTime < 2*_dayInMillis){
                countdown += 2*_dayInMillis;
                for(let i in _countdownTriggers){
                    let trigger = _countdownTriggers[i];
                    if(this.isInRangeOf(trigger, countdown)){
                        var minUntilStart = trigger / _minInMillis;
                        if(minUntilStart > 5){
                            return `@everyone Large towns open in ${minUntilStart} minutes.`;
                        } else {
                            return `@everyone Log on now!\n Let's capture some large towns`;
                        }
                    }
                }
            }
            // Day three of Narcia, Imperial countdowns
            else if(eventTime >= _dayInMillis && eventTime < 2*_dayInMillis){
                countdown += 3*_dayInMillis;
                for(let i in _countdownTriggers){
                    let trigger = _countdownTriggers[i];
                    if(this.isInRangeOf(trigger, countdown)){
                        var minUntilStart = trigger / _minInMillis;
                        return `Be prepared, Imperial opens in ${minUntilStart} minutes`;
                    }
                }
            }
            // Day 
            else {
                if(this.eventIsOver){
                    this.startDate +=  _eventDurationInMillis + _eventCooldownInMillis;
                    return 'Narcia is over! Upgrade your heros to be prepared for the next one.';
                }
            }
        }
        return null; //no trigger captured
    }

    get eventIsOver(){
        return Date.now() >= this.startDate + _eventDurationInMillis;
    }

    millisUntilStart(){
        return this.startDate - Date.now();
    }

    millisAfterStart(){
        return Date.now() - this.startDate;
    }

    isInRangeOf(triggerTime, checkTime){
        var upperLimit = triggerTime+_triggerRange;
        var lowerLimit = triggerTime-_triggerRange;

        //console.log(lowerLimit +' - '+ checkTime +' - '+ upperLimit);

        if (checkTime - lowerLimit > 0 && upperLimit - checkTime > 0){
            console.log('in range!');
            return true;
        } else {
            return false;
        }
    }


}

const instance = new Narcia();
Object.freeze(instance);

exports.instance = instance;