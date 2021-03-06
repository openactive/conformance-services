import assert from 'assert';
import { migrate_database, delete_database  }  from '../src/lib/database.js';
import { database_pool } from '../src/lib/database.js';
import { normalise_data_publisher_feed } from '../src/lib/normalise-data.js';
import TestPipe from '../src/lib/pipes/test-pipe.js';


describe('normalise data', function() {
    it('basic test', async function() {

        let client;
        await delete_database();
        await migrate_database();

        //--------------------------------------------------- Insert Some Raw Data
        client = await database_pool.connect();
        let publisher_feed;
        try {
            /* Reset the database state in case of stale data from other tests */
            await client.query('DELETE FROM raw_data');
            await client.query('DELETE FROM publisher_feed');
            await client.query('DELETE FROM publisher');
            // Publisher

            const res_add_publisher = await client.query('INSERT INTO publisher (name, url) VALUES ($1, $2) RETURNING id', ["Test", "http://test.com"]);
            const publisher_id = res_add_publisher.rows[0].id;
            // Publisher Feed
            const res_add_feed = await client.query('INSERT INTO publisher_feed (publisher_id, name, url) VALUES ($1, $2, $3) RETURNING id', [publisher_id, "Things","http://test.com/things"]);
            const publisher_feed_id = res_add_feed.rows[0].id;
            const res_select_publisher_feed = await client.query('SELECT * FROM publisher_feed');
            publisher_feed = res_select_publisher_feed.rows[0];
            // Raw data
            await client.query('INSERT INTO raw_data (publisher_feed_id, rpde_id, data_id, data_deleted, data_kind, data_modified, data) VALUES ($1, $2, $3, $4, $5, $6, $7)', [publisher_feed_id, "D1","https://example.org/test/1",false, "CATS", "1", {test:true}]);

        } catch(error) {
            console.error("ERROR setting up for test");
            console.error(error);
            console.error(error.stack);

        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            await client.release()
        }

        //--------------------------------------------------- Process!
        console.log(publisher_feed)
        assert(publisher_feed)
        await normalise_data_publisher_feed(publisher_feed, [TestPipe]);

        //--------------------------------------------------- Check Results
        client = await database_pool.connect();
        let results;
        try {
            const res_select_publisher_feed = await client.query('SELECT * FROM normalised_data ORDER BY id ASC');
            results = res_select_publisher_feed.rows;
        } catch(error) {
            console.error("ERROR in test");
            console.error(error);
            console.error(error.stack);
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            await client.release()
        }
        assert.equal(results.length,2);
        assert.equal(results[0].data_kind, "TestKind");
        assert.deepEqual(results[0].data,{ type: "TestEvent", extra: "a test", test: true } );
        assert.deepEqual(results[1].data,{ type: "TestEvent", extra: "b test", test: true });
        assert.deepEqual(results[0].normalisation_errors,undefined);
        assert.deepEqual(results[1].normalisation_errors,{'errors':[{'error':'BOO!'}]});

        // Raw data - is normalised flag set?
        client = await database_pool.connect();
        let results_raw_data;
        try {
            const res_select_raw_data = await client.query('SELECT * FROM raw_data');
            results_raw_data = res_select_raw_data.rows;
        } catch(error) {
            console.error("ERROR in test");
            console.error(error);
            console.error(error.stack);
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            await client.release()
        }

        assert.equal(results_raw_data.length,1);
        assert.deepEqual(results_raw_data[0].normalised,true);
        assert.deepEqual(results_raw_data[0].normalisation_errors,undefined);

    });
});