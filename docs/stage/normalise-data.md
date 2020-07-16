# Normalise Data

The tool will normalise raw data by passing it through a series of pipes.

Pipes are called in the order defined in `src/lib/pipes/index.js` and are called once for each bit of raw data.

Before the first pipe is called, there is an array of normalised data which is empty.
Each pipe has access to the original data and the normalised data created so far.
Each pipe can delete, edit or create normalised data as it wants.
After all pipe are called, whatever normalised data is left is saved to the database.

The normalised data is stored in the `normalised_data` table.

Deletes are soft deletes, marked by the `data_deleted` column in the table.

To run this:

`$ node ./src/bin/normalise-data.js`
