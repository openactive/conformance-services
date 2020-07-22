import assert from 'assert';
import path from 'path';
import Utils from '../src/lib/utils.js';
import NormaliseSchedulePipe from '../src/lib/pipes/normalise-schedule-pipe.js';


describe('course-schedule', function() {
    it('should generate two events from a Course with eventSchedule', async function() {

        const input = await Utils.readJson(path.resolve(path.resolve(), './test/fixtures/course-with-schedule.json'));
        let pipe = new NormaliseSchedulePipe(input, []);
        let results = await pipe.run();

        assert.equal(results.length,2);

    });

    it('should generate the correct kind and type for subevents from a Course with eventSchedule', async function(){
        const input = await Utils.readJson(path.resolve(path.resolve(), './test/fixtures/course-with-schedule.json'));
        input.data_kind = input.kind;
        let pipe = new NormaliseSchedulePipe(input, []);
        let results = await pipe.run();
        assert.equal(results[0].kind, "CourseInstanceSubEvent");
        assert.equal(results[0].data["@type"], "Event");
    });

    it('should generate two correct Normalised Events from a Course with eventSchedule', async function(){
        const input = await Utils.readJson(path.resolve(path.resolve(), './test/fixtures/course-with-schedule.json'));
        const output = await Utils.readJson(path.resolve(path.resolve(), './test/fixtures/course-with-schedule-normalised.json'));
        input.data_kind = input.kind;
        let pipe = new NormaliseSchedulePipe(input, []);

        // Mock eventsFrom and eventsUntil in pipe so it always returns a fixed date, since the dates are hardcoded in 'output' json
        pipe.eventsFrom = function(){
            return new Date("2020-04-30T00:00:00.000Z");
        }
        pipe.eventsUntil = function(){
            return new Date("2020-05-14T00:00:00.000Z");
        }

        let results = await pipe.run();
        assert.deepEqual(results[0].data, output[0].data);
        assert.deepEqual(results[1].data, output[1].data);
    });

});