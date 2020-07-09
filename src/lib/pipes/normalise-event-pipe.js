import Pipe from './pipe.js';
import NormalisedEvent from '../normalised-event.js';

// Normalises an object with a type of Event
class NormaliseEventPipe extends Pipe {
  run(){
    return new Promise(async resolve => {

        this.doCleanup();
        let type = this.rawData.type;

        console.log(`Running ${this.rawData.id} (${this.rawData.type}) through ${this.constructor.name}`);

        if (type == 'Event' || type == 'OnDemandEvent'){
            // The top level event is the Event

            let processedEvent = this.parseEvent(this.rawData);
            let normalisedEvent = new NormalisedEvent(processedEvent, "Event");

            this.normalisedEvents.push(normalisedEvent);

            // TODO: in theory regular Events might have subEvent or superEvent

        }else{
            // The top level event is something else, but it has subEvents
            // so we're converting them into flat Events
        }

        resolve(this.normalisedEvents);
    });
  }

  parseEvent(eventData, parentEvent){
    // TODO
    return eventData;
  }
}

export default NormaliseEventPipe;