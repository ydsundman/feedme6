# feedme6
shopping list app!

## Dump and import the Mongo DB

### Generate temporary DB URL.

```
$ meteor mongo feedme6.meteor.com --url
mongodb://client-15a5bf5d:789eb058-81c0-d38b-adca-7d0582ff3a32@production-db-a1.meteor.io:27017/feedme6_meteor_com
```

### Dump the DB.

```
mongodump -h production-db-a1.meteor.io --port 27017 --username client-15a5bf5d --password 789eb058-81c0-d38b-adca-7d0582ff3a32 -d feedme6_meteor_com
```

### Import the DB locally to verify backup

#### Find out local Meteor mongo instance credentials
```
$ meteor mongo --url
mongodb://127.0.0.1:3001/meteor
```

#### Drop existing `meteor` database
```
$ meteor mongo
MongoDB shell version: 2.6.7
connecting to: 127.0.0.1:3001/meteor
meteor:PRIMARY> use meteor
switched to db meteor
meteor:PRIMARY> db.dropDatabase()
{ "dropped" : "meteor", "ok" : 1 }
meteor:PRIMARY>
bye
daniel at yds-daniel in ~/projects/feedme6 on master [!?$]
$
```

#### Restore the dump to your local 
```
mongorestore --port 3001 -d meteor dump/feedme6_meteor_com
```
