These tests are designed to only run on the lesson3 schema

Run the migrations first (if you haven't already - it's safe to rerun this command if you're not sure)

```bash
yarn typeorm:migration:run
```

Just pet_owner and pet tables present

See [lesson 3](https://www.darraghoriordan.com/2022/06/11/persistence-3-typeorm-postgres-single-table-data/) for the lesson details.

You must use `yarn test:named theTestName` to specify a test to run e.g. `yarn test:named l3-insertingData`.
